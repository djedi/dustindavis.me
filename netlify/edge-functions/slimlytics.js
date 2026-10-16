// First-party proxy for Slimlytics analytics. Serves the tracker script and
// forwards collection beacons to slimlytics.com from our own domain.
// Requires the SLIMLYTICS_PROXY_KEY environment variable in Netlify.
const UPSTREAM = 'https://slimlytics.com';
const SITE_KEY = '2a558087-4351-4ac3-9cdd-590a4b137923';
const SCRIPT_PATH = '/2874fffa84c5.js';
const BEACON_PATH = '/371d8aff6242';

export default async (request, context) => {
  const url = new URL(request.url);
  const headers = new Headers(request.headers);
  headers.delete('cookie');
  headers.delete('authorization');
  headers.delete('host');

  let target;
  if (url.pathname === SCRIPT_PATH) {
    target = `${UPSTREAM}/p/${SITE_KEY}${BEACON_PATH}`;
  } else {
    target = `${UPSTREAM}/api/collect/${SITE_KEY}`;
    headers.set('X-Slimlytics-Client-IP', context.ip);
    headers.set('X-Slimlytics-Proxy-Key', Netlify.env.get('SLIMLYTICS_PROXY_KEY') ?? '');
  }

  const upstream = await fetch(target + url.search, {
    method: request.method,
    headers,
    body: ['GET', 'HEAD'].includes(request.method) ? undefined : request.body,
  });

  const response = new Response(upstream.body, upstream);
  response.headers.delete('set-cookie');
  return response;
};

// Netlify parses this statically, so the paths must be literals.
export const config = { path: ['/2874fffa84c5.js', '/371d8aff6242'] };
