# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## Repository Overview

Personal blog site for Dustin Davis built with Eleventy (11ty) static site
generator. Originally migrated from Gatsby to simplify the build process.

## Common Development Commands

### Running the Development Server

```bash
pnpm start  # Runs eleventy with live reload server
```

### Building the Site

```bash
pnpm build  # Builds static site to _site directory
```

### Linting and Formatting

```bash
npx biome check .  # Check for linting issues
npx biome format --write .  # Format code according to biome.json rules
```

### Creating a New Blog Post

```bash
./newpost.sh  # Interactive script that creates a new blog post with proper structure
```

### Updating the Uses Page Data

```bash
./get-applications.sh  # Updates applications list
./get-cli-tools.sh  # Updates CLI tools list
./generate-extensions.js <path-to-exported-extensions.html>  # Updates browser extensions
```

## Architecture & Key Files

### Core Configuration

- `.eleventy.js`: Main Eleventy configuration defining collections, filters, and
  image processing
- `biome.json`: Code formatting and linting rules (2 spaces, single quotes,
  kebab-case files)
- `netlify.toml`: Deployment configuration for Netlify

### Content Structure

- `blog/`: Blog posts in format `YYYY-MM-DD-slug/index.md` with images in
  `images/` subdirectory
- `_data/`: JSON data files for dynamic content (applications, CLI tools,
  extensions)
- `_includes/`: Nunjucks templates for layout (base.njk, blog_single.njk,
  footer.njk)

### Key Features

- **Image Processing**: Automatic responsive image generation with WebP/JPEG
  formats and SVG placeholders
- **Blog Collections**: Automatic categorization and RSS feed generation
- **Dynamic Data**: Uses page data pulled from system tools and browser
  extensions

## Important Implementation Details

- Blog posts automatically use `blog_single.njk` layout based on file path
- Images are processed with lazy loading and multiple formats for performance
- Meta images are generated at 1200x630px for social sharing
- The site uses Biome for linting/formatting instead of ESLint/Prettier
- All blog post images should be placed in the post's `images/` directory
