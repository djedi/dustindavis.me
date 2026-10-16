import crypto from 'node:crypto';
import path from 'node:path';
import Image from '@11ty/eleventy-img';
import syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';
import fs from 'fs-extra';
import { DateTime } from 'luxon';
import MarkdownIt from 'markdown-it';
import potrace from 'potrace';
import sharp from 'sharp';

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);

  // Design sources (e.g. meta/og-default.html) are rendered to images, not pages
  eleventyConfig.ignores.add('meta/og-default.html');

  // Standalone static HTML (e.g. the Asteroids demo) is copied verbatim, not templated
  eleventyConfig.ignores.add('static/asteroids.html');

  eleventyConfig.addPassthroughCopy('images');
  eleventyConfig.addPassthroughCopy('manifest.webmanifest');
  eleventyConfig.addPassthroughCopy('static');
  eleventyConfig.addPassthroughCopy('app-icons');
  eleventyConfig.addPassthroughCopy('extension-icons');
  eleventyConfig.addPassthroughCopy('favicon.ico');
  eleventyConfig.addPassthroughCopy('icon-192x192.png');

  eleventyConfig.addFilter('dateToRfc822', dateObj => {
    return DateTime.fromJSDate(dateObj).toRFC2822();
  });

  // Markdown images in post bodies are below the banner, so load them lazily
  eleventyConfig.amendLibrary('md', md => {
    const defaultImage = md.renderer.rules.image;
    md.renderer.rules.image = (tokens, idx, options, env, self) => {
      tokens[idx].attrSet('loading', 'lazy');
      tokens[idx].attrSet('decoding', 'async');
      return defaultImage(tokens, idx, options, env, self);
    };
  });

  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`);

  // Configure the Markdown-it library
  const markdownItOptions = {
    html: true,
  };

  const markdownLib = MarkdownIt(markdownItOptions);

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

  // Copies relative images and files in blog posts to the output directory
  eleventyConfig.addPlugin(eleventyConfig => {
    eleventyConfig.addTransform('copy-associated-files', function (content, outputPath) {
      if (outputPath?.endsWith('.html') && this.inputPath.includes('/blog/')) {
        const inputDir = this.inputPath.split('/').slice(0, -1).join('/');
        const outputDir = outputPath.split('/').slice(0, -1).join('/');

        fs.copySync(inputDir, outputDir, {
          filter: src => !src.endsWith('index.md'),
        });
      }
      return content;
    });
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

  eleventyConfig.addFilter('dateFilter', date => DateTime.fromJSDate(date).toFormat('dd LLLL yyyy'));

  eleventyConfig.addFilter('date', (date, format = 'dd LLLL yyyy') =>
    DateTime.fromJSDate(date).toUTC().toFormat(format)
  );

  eleventyConfig.addFilter('limit', (array, limit) => {
    return array.slice(0, limit);
  });

  // Content hash for cache busting: '/static/site.css' | assetVersion -> 'a1b2c3d4'.
  // A directory hashes all of its files, so one version covers e.g. static/themes/.
  eleventyConfig.addFilter('assetVersion', urlPath => {
    const target = path.join('.', urlPath);
    const files = fs.statSync(target).isDirectory()
      ? fs
          .readdirSync(target)
          .sort()
          .map(f => path.join(target, f))
      : [target];
    const hash = crypto.createHash('md5');
    for (const f of files) hash.update(fs.readFileSync(f));
    return hash.digest('hex').slice(0, 8);
  });

  // Inline a CSS file into the page (no render-blocking request). Comments and
  // extra whitespace are stripped; nothing else is rewritten.
  eleventyConfig.addFilter('inlineCss', urlPath =>
    fs
      .readFileSync(path.join('.', urlPath), 'utf8')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\s+/g, ' ')
      .replace(/\s*([{};,])\s*/g, '$1')
      .trim()
  );

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
    // `sizes` is optional; when given, a half-width variant is generated too so
    // browsers can pick the smaller file for small slots.
    // `loading`: '' (default) = traced SVG placeholder + lazysizes; 'lazy' = native
    // lazy loading, no placeholder; 'eager' = high-priority load for above-the-fold
    // images. The traced placeholders are large, so skip them where they don't help.
    async function (src, alt, className, width = 720, imageDescription = '', sizes = '', loading = '') {
      const imageSrc = path.normalize(src);
      const srcHash = crypto.createHash('sha256').update(imageSrc).digest('hex').substring(0, 8);
      const inputDir = this.page?.inputPath.split('/').slice(0, -1).join('/');
      let imagePath = imageSrc;
      if (!fs.existsSync(imagePath)) {
        imagePath = path.join(process.cwd(), inputDir, imageSrc);
      }

      console.log(`🏞️ Processing image: ${imagePath}`);

      const outputFolder = './_site/img/';

      const stats = await Image(imagePath, {
        widths: sizes ? [Math.round(width / 2), width] : [width],
        formats: ['webp', 'jpeg'],
        outputDir: outputFolder,
        filenameFormat: (_id, src, width, format) => {
          const extension = path.extname(src);
          const name = path.basename(src, extension);
          const filename = `${name}-${width}w.${format}-${srcHash}.${format}`;
          console.log(`📸 Generated: ${filename}`);
          return filename;
        },
      });

      const largestImage = stats.webp[stats.webp.length - 1];
      const srcSet = stats.webp.map(image => `${image.url} ${image.width}w`).join(', ');

      const sizesAttr = sizes || '(max-width: 600px) 100vw, 600px';
      if (loading) {
        const priority = loading === 'eager' ? 'fetchpriority="high"' : 'loading="lazy" decoding="async"';
        return `
        <figure class="${className}">
          <img src="${largestImage.url}" alt="${alt}" width="${largestImage.width}" height="${largestImage.height}"
            srcset="${srcSet}" sizes="${sizesAttr}" ${priority} style="width:100%;height:auto;" />
        </figure>
        <div class="caption" style="width:${largestImage.width}px">${imageDescription}</div>
      `;
      }

      const placeholderSVG = await generateSvgTrace(stats.jpeg[0].outputPath);

      return `
        <figure class="${className}">
          <img src="data:image/svg+xml;base64,${placeholderSVG}" alt="${alt}" style="width:${largestImage.width}px;height:auto;position:absolute;" />
          <img data-src="${largestImage.url}" alt="${alt}" width="${largestImage.width}" height="${largestImage.height}"
            srcset="${srcSet}" sizes="${sizesAttr}" class="lazyload" style="width:100%;height:auto;" />
        </figure>
        <div class="caption" style="width:${largestImage.width}px">${imageDescription}</div>
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
      return Buffer.from(await fs.promises.readFile(cachedSvgPath, 'utf-8')).toString('base64');
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
}
