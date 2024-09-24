import fs from 'node:fs';
import { glob } from 'glob';

// Directory where your blog posts are stored
const blogDirectory = './blog/**/index.md';

// Updated regex pattern to match the Markdown image syntax correctly
// - `altText`: Captures the alt text inside the `![ ]`
// - `imagePath`: Captures the image path inside `( )`
// - `titleText`: Captures the optional title (in single or double quotes) after the image path
// - `caption`: Captures an optional caption wrapped in underscores after the image
const markdownImageRegex = /!\[([^\]]*)\]\(([^'")\s]+)(?:\s+['"]([^'"]*)['"])?\)(\s*_(.*?)_)?/gm;

// Function to process a single file and replace image markdown with the shortcode
function processFile(filePath) {
  // Read the contents of the file
  const content = fs.readFileSync(filePath, 'utf-8');

  // Replace markdown image syntax with the responsiveImage shortcode
  const updatedContent = content.replace(
    markdownImageRegex,
    (match, altTextParam, imagePath, titleTextParam, _, captionParam) => {
      // Set defaults if altText, titleText, or caption are missing
      const altText = altTextParam || '';
      const titleText = titleTextParam || '';
      const caption = captionParam || '';
      const width = 720; // Hardcoded width

      // Use titleText as the image description if it exists, otherwise use the caption
      const imageDescription = titleText || caption;

      // Return the shortcode with the appropriate values
      return `{% responsiveImage "${imagePath.trim()}", "${altText.trim()}", "", ${width}, "${imageDescription.trim()}" %}`;
    }
  );
  // Write the updated content back to the file
  fs.writeFileSync(filePath, updatedContent, 'utf-8');
  console.log(`Updated file: ${filePath}`);
}

// Function to find and process all Markdown files in the blog directory
async function processAllMarkdownFiles() {
  try {
    // Find all markdown files in the blog directory
    const files = await glob(blogDirectory);

    // Process each file
    for (const filePath of files) {
      processFile(filePath);
    }
  } catch (err) {
    console.error('Error finding files:', err);
  }
}

// Run the script
processAllMarkdownFiles();
