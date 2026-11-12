// Pings IndexNow (Bing, Yandex, etc.) with every URL in the sitemap after a production deploy, plus any URL
// that was in the previous deploy's sitemap but is gone now (deleted/renamed pages), using Netlify's build cache.
// Failures are logged but never fail the build.
import fs from 'node:fs';
import path from 'node:path';

const HOST = 'dustindavis.me';
const KEY = 'fd957a71c47df840c6c0b97973ab870d';

const CACHE_FILE = '.indexnow-urls.json';

export const onSuccess = async ({ constants, utils }) => {
  if (process.env.CONTEXT !== 'production') {
    console.log('IndexNow: skipping non-production deploy');
    return;
  }
  try {
    const sitemap = fs.readFileSync(path.join(constants.PUBLISH_DIR, 'sitemap.xml'), 'utf8');
    const current = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);

    let previous = [];
    if (await utils.cache.restore(CACHE_FILE)) {
      previous = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
    }
    const removed = previous.filter(url => !current.includes(url));
    const urlList = [...current, ...removed];
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
    });
    console.log(`IndexNow: submitted ${urlList.length} URLs (${removed.length} removed), status ${res.status}`);

    if (res.ok) {
      fs.writeFileSync(CACHE_FILE, JSON.stringify(current));
      await utils.cache.save(CACHE_FILE);
    }
  } catch (err) {
    console.log(`IndexNow: submission failed: ${err.message}`);
  }
};
