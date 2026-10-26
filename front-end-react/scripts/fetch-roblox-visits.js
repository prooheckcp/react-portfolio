/* Total Roblox visits across every project whose `projectLink` points at a
   Roblox game, written to src/constants/robloxVisits.json for the home hero.

   This runs at build time because Roblox's APIs send no CORS headers, so the
   browser cannot ask them directly. The JSON is committed: if Roblox or Sanity
   is unreachable the build keeps the last good number instead of failing or
   showing zero. */

const fs = require('fs');
const path = require('path');

const keys = require('../src/keys.json');

const OUTPUT = path.join(__dirname, '../src/constants/robloxVisits.json');
const SANITY_QUERY = '*[_type == "works" && projectLink match "*roblox.com/games*"].projectLink';

const getJson = async (url) => {
  const response = await fetch(url);

  if(!response.ok)
    throw new Error(`${response.status} from ${url}`);

  return response.json();
};

const main = async () => {
  const sanityUrl = `https://${keys.REACT_APP_SANITY_PROJECT_ID}.apicdn.sanity.io/v2022-02-01/data/query/production?query=${encodeURIComponent(SANITY_QUERY)}`;
  const {result: links} = await getJson(sanityUrl);

  const placeIds = [...new Set(
    links.map((link) => /roblox\.com\/games\/(\d+)/.exec(link)?.[1]).filter(Boolean)
  )];

  /* Visits are reported per universe, but the public links carry place ids. */
  const universeIds = await Promise.all(placeIds.map(async (placeId) => {
    const {universeId} = await getJson(`https://apis.roblox.com/universes/v1/places/${placeId}/universe`);
    return universeId;
  }));

  const {data: games} = await getJson(`https://games.roblox.com/v1/games?universeIds=${universeIds.filter(Boolean).join(',')}`);
  const visits = games.reduce((total, game) => total + (game.visits || 0), 0);

  if(visits <= 0)
    throw new Error('Roblox reported zero visits; refusing to overwrite the last good value.');

  fs.writeFileSync(OUTPUT, JSON.stringify({visits, games: games.length, fetchedAt: new Date().toISOString()}, null, 2) + '\n');
  console.log(`Roblox visits: ${visits.toLocaleString('en-US')} across ${games.length} games`);
};

main().catch((error) => {
  console.warn(`Could not refresh Roblox visits, keeping the previous value. (${error.message})`);
});
