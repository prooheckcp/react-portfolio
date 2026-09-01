/*
Star counts for the GitHub repos linked from a project's `codeLink`.

The unauthenticated GitHub API allows 60 requests per hour per IP and this site
links ~11 repos, so results are cached in localStorage: a visitor pays for one
round of requests and reads from the cache for the rest of the day. Every
failure path (rate limit, private repo, offline, storage disabled) resolves to
"no count", and the UI simply omits the badge - stars are decoration, never
something the page depends on.
*/

import {useEffect, useState} from 'react';

const CACHE_KEY : string = 'gh-stars-v1';
const CACHE_TTL : number = 6 * 60 * 60 * 1000; // 6 hours

/* `stars: null` records a repo that answered but has no public count - private,
   renamed or deleted. Caching that alongside the successes keeps a handful of
   guaranteed-404 requests (and their console noise) off every page load. */
type CacheEntry = {stars: number | null, ts: number};
type Cache = Record<string, CacheEntry>;

/* "https://github.com/prooheckcp/RoQuest" -> "prooheckcp/RoQuest".
   Anything that is not a repo root (gists, /tree/... deep links, non-GitHub
   hosts) returns null so the caller skips it. */
export function parseGithubRepo(url? : string) : string | null {
    if(!url)
        return null;

    try{
        const parsed = new URL(url.trim());

        if(!/(^|\.)github\.com$/i.test(parsed.hostname))
            return null;

        const segments = parsed.pathname.split('/').filter(Boolean);

        if(segments.length < 2)
            return null;

        return `${segments[0]}/${segments[1].replace(/\.git$/i, '')}`;
    }catch{
        return null;
    }
}

function readCache() : Cache {
    try{
        return JSON.parse(window.localStorage.getItem(CACHE_KEY) ?? '{}');
    }catch{
        return {};
    }
}

function writeCache(cache : Cache) : void {
    try{
        window.localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    }catch{
        /* Private browsing or a full quota - the counts just won't persist. */
    }
}

/* `answered` distinguishes "GitHub told us there is no count" (404 on a private
   or renamed repo - worth caching) from "we never got through" (rate limit,
   offline - worth retrying). */
async function fetchStars(repo : string) : Promise<{count: number | null, answered: boolean}> {
    try{
        const response = await fetch(`https://api.github.com/repos/${repo}`, {
            headers: {'Accept': 'application/vnd.github+json'}
        });

        if(response.status === 404)
            return {count: null, answered: true};

        if(!response.ok)
            return {count: null, answered: false};

        const data = await response.json();
        const count = typeof data?.stargazers_count === 'number' ? data.stargazers_count : null;

        return {count, answered: true};
    }catch{
        return {count: null, answered: false};
    }
}

/*
Given repo slugs, returns a map of slug -> star count. Only slugs with a known
count appear, so callers can render `stars.get(repo)` and let `undefined` mean
"don't show a badge".
*/
export function useGithubStars(repos : Array<string>) : Map<string, number> {
    const [stars, setStars] = useState<Map<string, number>>(new Map());

    // The caller rebuilds its array every render; the joined key is what
    // actually changes, so the effect keys off that instead.
    const key : string = [...new Set(repos)].sort().join(',');

    useEffect(()=>{
        const wanted = key ? key.split(',') : [];

        if(wanted.length === 0)
            return;

        let cancelled = false;
        const cache = readCache();
        const now = Date.now();
        const resolved = new Map<string, number>();
        const stale : Array<string> = [];

        wanted.forEach((repo)=>{
            const entry = cache[repo];

            if(!entry || now - entry.ts >= CACHE_TTL){
                stale.push(repo);
                return;
            }

            if(entry.stars !== null)
                resolved.set(repo, entry.stars);
        });

        // Paint whatever the cache already knows before any network work.
        if(resolved.size > 0)
            setStars(new Map(resolved));

        if(stale.length === 0)
            return;

        Promise.all(stale.map(async (repo)=>{
            const {count, answered} = await fetchStars(repo);

            if(count !== null)
                resolved.set(repo, count);

            // A rate-limited or offline request is not evidence about the repo,
            // so only a real answer is worth remembering.
            if(answered)
                cache[repo] = {stars: count, ts: now};
        })).then(()=>{
            if(cancelled)
                return;

            writeCache(cache);
            setStars(new Map(resolved));
        });

        return ()=>{ cancelled = true; };
    }, [key]);

    return stars;
}
