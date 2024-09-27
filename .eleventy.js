const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { DateTime } = require('luxon');
const eleventyImage = require('@11ty/eleventy-img');
const potrace = require('potrace');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const markdownIt = require('markdown-it');
const sharp = require('sharp');

module.exports = eleventyConfig => {
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addPassthroughCopy('images');
  eleventyConfig.addPassthroughCopy('manifest.webmanifest');
  eleventyConfig.addPassthroughCopy('static');
  eleventyConfig.addPassthroughCopy('app-icons');
  eleventyConfig.addPassthroughCopy('favicon.ico');

  eleventyConfig.addFilter('dateToRfc822', dateObj => {
    return DateTime.fromJSDate(dateObj).toRFC2822();
  });

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
      return data.permalink;
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
    return `https://github.com/djedi/dustindavis.me/edit/master/${filePath.substring(1)}`;
  });

  /**
   * Generates a meta image for a given source image.
   *
   * This shortcode generates a meta image with a size of 1200x630 pixels and a quality of 80% in the JPEG format. The generated image is saved in the `dist/img/meta` directory with a filename based on the source image filename.
   *
   * @param {string} src - The path to the source image.
   * @returns {string} The URL of the generated meta image.
   */
  eleventyConfig.addShortcode('metaImage', async src => {
    const normalizedSrc = path.normalize(src);
    const outputDir = './_site/img/meta';
    // generate a hash from the normalized source path
    const hash = crypto.createHash('sha256').update(normalizedSrc).digest('hex').substring(0, 8);
    const outputFilename = `${path.basename(normalizedSrc, path.extname(normalizedSrc))}-${hash}${path.extname(normalizedSrc)}`;
    const outputPath = path.join(outputDir, outputFilename);

    // return if the image already exists
    if (fs.existsSync(outputPath)) {
      return `/img/meta/${outputFilename}`;
    }

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    console.log('Generating meta image:', outputPath);
    await sharp(src).resize(1200, 630, { fit: 'cover' }).toFormat('jpeg', { quality: 80 }).toFile(outputPath);

    return `/img/meta/${outputFilename}`;
  });

  eleventyConfig.addShortcode(
    'responsiveImage',
    async function (src, alt, className, width = 720, imageDescription = '') {
      const imageSrc = path.normalize(src);
      const srcHash = crypto.createHash('sha256').update(imageSrc).digest('hex').substring(0, 8);
      const inputDir = this.page?.inputPath.split('/').slice(0, -1).join('/');
      let imagePath = imageSrc;
      if (!fs.existsSync(imagePath)) {
        imagePath = path.join(process.cwd(), inputDir, imageSrc);
      }

      console.log(`🏞️ Processing image: ${imagePath}`);

      const outputFolder = './_site/img/';

      const stats = await eleventyImage(imagePath, {
        widths: [width],
        formats: ['webp', 'jpeg'],
        outputDir: outputFolder,
        filenameFormat: (id, src, width, format) => {
          const extension = path.extname(src);
          const name = path.basename(src, extension);
          const filename = `${name}-${width}w.${format}-${srcHash}.${format}`;
          console.log(`📸 Generated: ${filename}`);
          return filename;
        },
      });

      const smallestImage = stats.webp[0];
      const srcSet = stats.webp.map(image => `${image.url} ${image.width}w`).join(', ');

      const placeholderSVG = await generateSvgTrace(stats.jpeg[0].outputPath);

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
