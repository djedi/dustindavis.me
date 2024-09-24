const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { DateTime } = require('luxon');
const eleventyImage = require('@11ty/eleventy-img');
const potrace = require('potrace');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const markdownIt = require('markdown-it');

module.exports = eleventyConfig => {
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addPassthroughCopy('images');
  eleventyConfig.addPassthroughCopy('manifest.webmanifest');
  eleventyConfig.addPassthroughCopy('static');
  eleventyConfig.addPassthroughCopy('app-icons');

  // Configure the Markdown-it library
  const markdownItOptions = {
    html: true,
  };

  const markdownLib = markdownIt(markdownItOptions);

  eleventyConfig.addGlobalData('eleventyComputed', {
    permalink: data => {
      if (data.slug) {
        return `/blog/${data.slug}/`;
      }
      return data.url;
    },
    layout: data => {
      // If frontmatter layout is set to false, don't use a layout
      if (data.layout === false) {
        return false;
      }
      // Check if data.page exists before accessing inputPath
      if (data.page?.inputPath?.includes('/blog/')) {
        return 'blog_single.njk';
      }
      // Use the default layout for other pages
      return 'base.njk';
    },
  });

  eleventyConfig.addCollection('categories', collectionApi => {
    const categoriesMap = new Map();

    for (const item of collectionApi.getAll()) {
      if ('categories' in item.data) {
        for (const category of item.data.categories) {
          const lowerCaseCategory = category.toLowerCase();
          categoriesMap.set(lowerCaseCategory, category);
        }
      }
    }

    // Convert Map values to Array, sort, and return
    return Array.from(categoriesMap.values()).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  });

  eleventyConfig.addCollection('blog', collectionApi => {
    const posts = collectionApi.getFilteredByGlob('blog/**/*.md').reverse();
    console.log('Number of blog posts:', posts.length);
    return posts;
  });

  eleventyConfig.addFilter('dateToRfc822', dateObj => {
    return DateTime.fromJSDate(dateObj).toRFC2822();
  });

  eleventyConfig.addFilter('dateFilter', date => DateTime.fromJSDate(date).toFormat('dd LLLL yyyy'));

  eleventyConfig.addFilter('date', (date, format = 'dd LLLL yyyy') =>
    DateTime.fromJSDate(date).toUTC().toFormat(format)
  );

  eleventyConfig.addFilter('limit', (array, limit) => {
    return array.slice(0, limit);
  });

  eleventyConfig.addFilter('githubPath', filePath => {
    return `https://github.com/djedi/dustindavis.me/edit/master/content${filePath.substring(1)}`;
  });

  eleventyConfig.addShortcode(
    'responsiveImage',
    async function (src, alt, className, width = 720, imageDescription = '') {
      // If src does not exist, try looking at the relative path
      const inputDir = this.page?.inputPath.split('/').slice(0, -1).join('/');
      let imagePath = src;
      if (!fs.existsSync(imagePath)) {
        imagePath = path.join(process.cwd(), inputDir, src);
      }

      // Output folder for images
      const outputFolder = './_site/img/';

      // Generate a unique filename based on the source image and desired width
      const uniqueFilename = `${path.basename(imagePath, path.extname(imagePath))}-${width}.jpeg`;
      const outputPath = path.join(outputFolder, uniqueFilename);

      let stats;
      let smallestImage;
      let srcSet;

      // Check if the optimized image already exists
      if (fs.existsSync(outputPath)) {
        console.log(`Skipping optimization for ${imagePath}, file already exists.`);
        stats = {
          jpeg: [
            {
              url: `/img/${uniqueFilename}`,
              width: width,
              height: width, // You might want to store and retrieve the actual height
            },
          ],
        };
        smallestImage = stats.jpeg[0];
        srcSet = `${smallestImage.url} ${smallestImage.width}w`;
      } else {
        // If the image doesn't exist, generate it
        console.log('🏞️ Optimizing: ', src);
        stats = await eleventyImage(imagePath, {
          widths: [width], // Use the width parameter
          formats: ['webp', 'jpeg'],
          outputDir: outputFolder,
        });
        smallestImage = stats.webp[0]; // Choose the smallest image as the base
        srcSet = stats.webp.map(image => `${image.url} ${image.width}w`).join(', ');
      }

      // Generate or retrieve the placeholder SVG
      const placeholderSVG = await generateSvgTrace(fs.existsSync(outputPath) ? outputPath : stats.jpeg[0].outputPath);

      return `
        <figure class="${className}">
          <img src="data:image/svg+xml;base64,${placeholderSVG}" alt="${alt}" style="width:${smallestImage.width}px;height:auto;position:absolute;" />
          <img data-src="${smallestImage.url}" alt="${alt}" width="${smallestImage.width}" height="${smallestImage.height}"
            srcset="${srcSet}" sizes="(max-width: 600px) 100vw, 600px" class="lazyload" style="width:100%;height:auto;" />
        </figure>
        <div class="caption" style="width:${smallestImage.width}px">${imageDescription}</div>
      `;
    }
  );

  // Custom filter to get the directory path from a page's input path
  eleventyConfig.addFilter('directoryPath', inputPath => path.dirname(inputPath));

  // Add a 'markdown' filter to Nunjucks
  eleventyConfig.addFilter('markdown', content => {
    return markdownLib.render(content);
  });

  // Modified generateSvgTrace function with caching
  async function generateSvgTrace(imagePath) {
    const cacheDir = path.join(process.cwd(), '_cache');
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, { recursive: true });
    }

    const hash = crypto.createHash('md5').update(imagePath).digest('hex');
    const cachedSvgPath = path.join(cacheDir, `${hash}.svg`);

    if (fs.existsSync(cachedSvgPath)) {
      return fs.promises.readFile(cachedSvgPath, 'utf-8').then(svg => Buffer.from(svg).toString('base64'));
    }

    return new Promise((resolve, reject) => {
      potrace.trace(imagePath, { color: '#1c4230' }, (err, svg) => {
        if (err) return reject(err);
        fs.promises
          .writeFile(cachedSvgPath, svg)
          .then(() => resolve(Buffer.from(svg).toString('base64')))
          .catch(reject);
      });
    });
  }
};
