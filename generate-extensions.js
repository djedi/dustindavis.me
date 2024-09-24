#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');
const axios = require('axios');
const { JSDOM } = require('jsdom');

const IGNORE_EXTENSIONS = ['Adblock for Youtube™', 'Foxified', 'The Pirate Bay torrent Search'];

// Function to extract extension data from the file
async function parseExtensions(fileContent) {
  const dom = new JSDOM(fileContent);
  const document = dom.window.document;

  const extensions = [];
  const enabledExtensions = document.querySelectorAll('.enabled ol li');

  for (const li of enabledExtensions) {
    if (IGNORE_EXTENSIONS.includes(li.textContent.trim())) continue;
    const nameLink = li.querySelector('a[title]');
    const name = nameLink.textContent.match(/^(.*?) \d/)[1]; // Extract name before version
    const description = nameLink.getAttribute('title');
    const url = nameLink.getAttribute('href');

    // Await the getIcon call to ensure the icon is fetched before adding it to the object
    const iconUrl = await getIcon(url);

    extensions.push({
      name,
      description,
      url,
      iconUrl,
    });
  }

  return extensions;
}

// Function to fetch the icon from the Chrome Web Store page
async function getIcon(url) {
  try {
    const response = await axios.get(url);
    const dom = new JSDOM(response.data);
    const document = dom.window.document;

    // Find the <img> element that contains the icon; Chrome Web Store usually uses <img> with a specific class or alt text
    const imgElement = document.querySelector('img[alt^="Item logo image"]'); // This selector may need adjustment based on the actual HTML

    if (imgElement) {
      console.log(`Found icon for ${url}: ${imgElement.src}`);
      return imgElement.src;
    }
  } catch (error) {
    console.error(`Error fetching icon for ${url}: ${error.message}`);
  }

  return ''; // Return an empty string if the icon can't be fetched
}

// Function to merge new extensions with existing ones
function mergeExtensions(existingExtensions, newExtensions) {
  const existingUrls = new Set(existingExtensions.map(ext => ext.url));
  const mergedExtensions = [...existingExtensions];

  for (const extension of newExtensions) {
    if (!existingUrls.has(extension.url)) {
      mergedExtensions.push(extension);
    }
  }

  return mergedExtensions;
}

// Main function to read, parse, merge, and write the JSON file
async function generateExtensionsJson(filePath) {
  const outputFilePath = path.join(__dirname, '_data', 'extensions.json');

  // Read the new data from the provided file
  fs.readFile(filePath, 'utf-8', async (err, data) => {
    if (err) {
      console.error(`Error reading file: ${err}`);
      return;
    }

    // Await parseExtensions to ensure all icons are fetched before continuing
    const newExtensions = await parseExtensions(data);

    // Check if extensions.json already exists
    if (fs.existsSync(outputFilePath)) {
      fs.readFile(outputFilePath, 'utf-8', (err, existingData) => {
        if (err) {
          console.error(`Error reading existing JSON file: ${err}`);
          return;
        }

        // Parse the existing extensions
        const existingJson = JSON.parse(existingData);
        const existingExtensions = existingJson.extensions || [];

        // Merge the new extensions with the existing ones
        const mergedExtensions = mergeExtensions(existingExtensions, newExtensions);

        // Update the lastUpdated field
        const result = {
          lastUpdated: new Date().toISOString().split('T')[0], // Get current date
          extensions: mergedExtensions,
        };

        // Write the updated data back to the file
        fs.writeFile(outputFilePath, JSON.stringify(result, null, 2), err => {
          if (err) {
            console.error(`Error writing JSON file: ${err}`);
          } else {
            console.log(`Extensions data successfully updated at ${outputFilePath}`);
          }
        });
      });
    } else {
      // If the file doesn't exist, create it with the new extensions
      const result = {
        lastUpdated: new Date().toISOString().split('T')[0], // Get current date
        extensions: newExtensions,
      };

      // Create the output directory if it doesn't exist
      fs.mkdirSync(path.dirname(outputFilePath), { recursive: true });

      // Write the new data to the file
      fs.writeFile(outputFilePath, JSON.stringify(result, null, 2), err => {
        if (err) {
          console.error(`Error writing JSON file: ${err}`);
        } else {
          console.log(`Extensions data successfully written to ${outputFilePath}`);
        }
      });
    }
  });
}

// Check if the file is provided as an argument
if (process.argv.length < 3) {
  console.error('Usage: node generateExtensionsJson.js <path-to-html-file>');
  process.exit(1);
}

// Run the script with the provided file path
const filePath = process.argv[2];
generateExtensionsJson(filePath);
