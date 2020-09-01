module.exports = {
  siteTitle: 'Dustin Davis', // Navigation and Site Title
  siteTitleAlt: 'The personal website of Dustin Davis', // Alternative Site title for SEO
  siteTitleShort: 'kentcdodds', // short_name for manifest
  siteUrl: process.env.ROOT_URL || 'https://dustindavis.me', // Domain of your site. No trailing slash!
  lang: 'en', // Language Tag on <html> element
  pathPrefix: '/',
  siteLogo: 'images/logo.png', // Used for SEO and manifest, path to your image you placed in the 'static' folder
  siteDescription:
    'Come check out how Dustin Davis can help you level-up your life and home.',
  minibio: `
    <strong>Dustin Davis</strong> is a software engineer, people manager, hacker, and
    entreprenuer. He loves to develop systems and automation. 
    He lives with his wife and five kids in Utah.
  `,
  author: 'Dustin Davis', // Author for schemaORGJSONLD
  organization: 'Red Seam, Inc.',

  // siteFBAppID: '123456789', // Facebook App ID - Optional
  userTwitter: '@DustinDavis', // Twitter Username
  ogSiteName: 'Dustin Davis', // Facebook Site Name
  ogLanguage: 'en_US',

  // Manifest and Progress color
  themeColor: '#4147DC',
  backgroundColor: '#1c4230',

  // Social component
  twitter: 'https://twitter.com/dustindavis/',
  twitterHandle: '@DustinDavis',
  github: 'https://github.com/djedi/',
  linkedin: 'https://www.linkedin.com/in/dustindavis/',
  youtube: 'https://www.youtube.com/channel/UC_Y8OgLvLukLsPtsrTg7ugA',
  facebook: 'https://www.facebook.com/dustin.davis',
  rss: 'https://dustindavis.me/blog/rss.xml',
}
