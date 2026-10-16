#!/usr/bin/env node

// Builds _data/extensions.json from the extensions enabled across Brave profiles.
//
// Usage:
//   ./generate-extensions.js                      # every Brave profile
//   ./generate-extensions.js Personal RedSeam     # only these profiles (by name)
//   ./generate-extensions.js "Personal,Profile 2"  # comma-separated also works
//   ./generate-extensions.js --list               # show profiles and exit
//
// BRAVE_DIR overrides the Brave user-data directory.

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import axios from 'axios';
import { JSDOM } from 'jsdom';
import sharp from 'sharp';

const BRAVE_DIR =
  process.env.BRAVE_DIR || path.join(os.homedir(), 'Library', 'Application Support', 'BraveSoftware', 'Brave-Browser');

const IGNORE_EXTENSIONS = ['Adblock for Youtube™', 'Foxified', 'The Pirate Bay torrent Search'];

// Chromium's "internal" install location, which is where Web Store installs land.
const LOCATION_INTERNAL = 1;

const OUTPUT_FILE = path.join(import.meta.dirname, '_data', 'extensions.json');

// Icons are saved locally because Google rate-limits hotlinked store images.
const ICON_DIR = path.join(import.meta.dirname, 'extension-icons');

// A missing optional file reads as {}; any other failure throws so a partial
// read never overwrites the published list.
function readJson(file, { optional = false } = {}) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf-8'));
  } catch (error) {
    if (optional && error.code === 'ENOENT') return {};
    throw new Error(`Could not read ${file}: ${error.message}`);
  }
}

// Returns [{ dir, name }] for each profile Brave knows about.
function getProfiles() {
  const localState = readJson(path.join(BRAVE_DIR, 'Local State'));
  const infoCache = localState.profile?.info_cache || {};
  return Object.entries(infoCache).map(([dir, info]) => ({ dir, name: info.name || dir }));
}

// Extension settings are split between Preferences and Secure Preferences.
function getProfileExtensions(profileDir) {
  const settings = {};
  for (const file of ['Preferences', 'Secure Preferences']) {
    const prefs = readJson(path.join(BRAVE_DIR, profileDir, file), { optional: file === 'Secure Preferences' });
    for (const [id, value] of Object.entries(prefs.extensions?.settings || {})) {
      settings[id] = { ...settings[id], ...value };
    }
  }

  return Object.entries(settings)
    .filter(([, ext]) => {
      const enabled = !ext.disable_reasons?.length && ext.state !== 0;
      const isTheme = Boolean(ext.manifest?.theme);
      return ext.from_webstore && ext.location === LOCATION_INTERNAL && enabled && !isTheme;
    })
    .map(([id, ext]) => ({ id, profileDir, manifest: ext.manifest || {} }));
}

// Some store redirects contain raw non-ASCII characters (e.g. "—") that axios
// can't follow, so follow them by hand and encode each hop.
async function fetchFollowingRedirects(url, hops = 5) {
  const response = await axios.get(url, { maxRedirects: 0, validateStatus: s => s < 400 });
  const location = response.headers.location;
  if (!location || hops === 0) return response;
  // Node decodes header bytes as latin1; restore the UTF-8 before re-encoding.
  const decoded = Buffer.from(location, 'latin1').toString('utf8');
  return fetchFollowingRedirects(new URL(decoded, url).href, hops - 1);
}

// Pulls the public name, description and icon from the Chrome Web Store listing.
async function getStoreDetails(id) {
  const url = `https://chromewebstore.google.com/detail/${id}`;
  try {
    const response = await fetchFollowingRedirects(url);
    const document = new JSDOM(response.data).window.document;
    const meta = property => document.querySelector(`meta[property="${property}"]`)?.getAttribute('content');
    const icon = document.querySelector('img[alt^="Item logo image"]');
    const name = meta('og:title')?.replace(/ - Chrome Web Store$/, '');

    // A 200 without listing metadata (consent wall, error page) counts as a failure.
    if (!name) {
      console.error(`  ! Store page for ${id} had no listing details`);
      return null;
    }

    return {
      name,
      description: meta('og:description'),
      url: meta('og:url') || url,
      iconUrl: icon?.getAttribute('src') || '',
    };
  } catch (error) {
    console.error(`  ! Could not fetch store page for ${id}: ${error.message}`);
    return null;
  }
}

// Write to a sibling temp file and rename, so readers never see a partial file.
async function writeFileAtomic(file, data) {
  const temp = `${file}.${process.pid}.tmp`;
  try {
    await fs.promises.writeFile(temp, data);
    await fs.promises.rename(temp, file);
  } catch (error) {
    await fs.promises.rm(temp, { force: true });
    throw error;
  }
}

// Saves the icon to extension-icons/<id>.png and returns its site path. Prefers a
// 128px store image, falling back to the largest icon in the installed extension.
async function saveIcon(id, iconUrl, profileDir, manifest) {
  const file = path.join(ICON_DIR, `${id}.png`);
  const sitePath = `/extension-icons/${id}.png`;

  if (iconUrl) {
    try {
      const largeUrl = iconUrl.replace(/=s\d+[^/]*$/, '=s128');
      const response = await axios.get(largeUrl, { responseType: 'arraybuffer' });
      // Re-encode to PNG; sharp throws on HTML or corrupt bytes, which leaves the
      // cached icon alone and drops through to the installed-icon fallback.
      const png = await sharp(Buffer.from(response.data)).png().toBuffer();
      await writeFileAtomic(file, png);
      return sitePath;
    } catch (error) {
      console.error(`  ! Could not download icon for ${id}: ${error.message}`);
    }
  }

  const icons = Object.entries(manifest.icons || {}).sort(([a], [b]) => Number(b) - Number(a));
  const versionDir = path.join(BRAVE_DIR, profileDir, 'Extensions', id, manifest.version || '');
  for (const [, icon] of icons) {
    for (const dir of [versionDir, `${versionDir}_0`]) {
      const source = path.join(dir, icon);
      if (!fs.existsSync(source)) continue;
      try {
        await writeFileAtomic(file, await sharp(source).png().toBuffer());
        return sitePath;
      } catch (error) {
        console.error(`  ! Could not use installed icon ${source}: ${error.message}`);
      }
    }
  }

  // Keep the icon from a previous run rather than dropping it.
  return fs.existsSync(file) ? sitePath : '';
}

// Manifest strings like "__MSG_appName__" are localized; they're only a fallback.
function manifestString(value) {
  return value && !value.startsWith('__MSG_') ? value : undefined;
}

async function generateExtensionsJson(requestedProfiles) {
  const allProfiles = getProfiles();
  if (!allProfiles.length) {
    console.error(`No Brave profiles found in ${BRAVE_DIR}`);
    process.exit(1);
  }

  const profiles = requestedProfiles.length
    ? allProfiles.filter(p => requestedProfiles.includes(p.name) || requestedProfiles.includes(p.dir))
    : allProfiles;

  const unknown = requestedProfiles.filter(r => !allProfiles.some(p => p.name === r || p.dir === r));
  if (unknown.length) {
    console.error(`Unknown profile(s): ${unknown.join(', ')}. Run with --list to see them.`);
    process.exit(1);
  }

  // Collect unique extensions across profiles.
  const found = new Map();
  for (const profile of profiles) {
    const extensions = getProfileExtensions(profile.dir);
    console.log(`${profile.name}: ${extensions.length} enabled extension(s)`);
    for (const ext of extensions) {
      if (!found.has(ext.id)) found.set(ext.id, ext);
    }
  }

  if (!found.size) {
    throw new Error('No enabled extensions found; leaving the existing list unchanged.');
  }

  // Previously published entries, keyed by extension ID (the last URL segment),
  // are reused when the store can't be reached.
  const existing = new Map();
  if (fs.existsSync(OUTPUT_FILE)) {
    for (const ext of readJson(OUTPUT_FILE).extensions || []) {
      existing.set(ext.url.split('/').pop(), ext);
    }
  }

  fs.mkdirSync(ICON_DIR, { recursive: true });

  const extensions = [];
  for (const { id, profileDir, manifest } of found.values()) {
    const details = await getStoreDetails(id);
    const previous = existing.get(id);

    if (!details && previous) {
      if (IGNORE_EXTENSIONS.includes(previous.name)) continue;
      console.log(`  ✓ ${previous.name} (kept previous details)`);
      extensions.push(previous);
      continue;
    }

    const name = details?.name || manifestString(manifest.name) || id;
    if (IGNORE_EXTENSIONS.includes(name)) continue;

    console.log(`  ✓ ${name}`);
    const iconUrl = details?.iconUrl || '';
    extensions.push({
      name,
      description: details?.description || manifestString(manifest.description) || '',
      url: details?.url || `https://chromewebstore.google.com/detail/${id}`,
      iconUrl,
      iconPath: await saveIcon(id, iconUrl, profileDir, manifest),
    });
  }

  extensions.sort((a, b) => a.name.localeCompare(b.name));

  const result = {
    lastUpdated: new Date().toISOString().split('T')[0],
    extensions,
  };

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  await writeFileAtomic(OUTPUT_FILE, `${JSON.stringify(result, null, 2)}\n`);
  console.log(`\nWrote ${extensions.length} extensions to ${OUTPUT_FILE}`);

  // Only after the new list is saved, remove icons it no longer references.
  const keep = new Set(extensions.map(ext => path.basename(ext.iconPath || '')));
  for (const file of fs.readdirSync(ICON_DIR)) {
    if (file.endsWith('.png') && !keep.has(file)) fs.rmSync(path.join(ICON_DIR, file));
  }
}

// Profiles may be given as separate arguments or comma-separated, so names with
// spaces (e.g. "Profile 2") survive `make update-extensions PROFILES=...`.
const args = process.argv
  .slice(2)
  .flatMap(arg => arg.split(','))
  .map(arg => arg.trim())
  .filter(Boolean);

try {
  if (args.includes('--list')) {
    for (const { dir, name } of getProfiles()) console.log(`${name} (${dir})`);
  } else {
    await generateExtensionsJson(args);
  }
} catch (error) {
  console.error(`❌ ${error.message}`);
  process.exit(1);
}
