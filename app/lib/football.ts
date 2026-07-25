"use client";

/**
 * Live football data — TheSportsDB, fetched from the browser.
 *
 * The API sends `Access-Control-Allow-Origin: *` and `Cache-Control: max-age=14400`,
 * so browser calls are permitted and the HTTP cache does most of the work for us.
 * On top of that we add:
 *   - an in-flight promise map, so ten components asking for "Brazil" at once
 *     produce exactly one network request;
 *   - a sessionStorage layer, so navigating back doesn't refetch;
 *   - null-on-failure, never throw. The page is designed to be complete without
 *     this data — crests and venue facts are enrichment, not scaffolding.
 */

const KEY = process.env.NEXT_PUBLIC_TSDB_KEY || "3";
const BASE = `https://www.thesportsdb.com/api/v1/json/${KEY}`;
const TTL = 1000 * 60 * 60 * 6; // 6h
const STORE = "tbg:football:";

export type TeamInfo = {
  name: string;
  short: string;
  badge: string | null;
  stadium: string | null;
  capacity: number | null;
  location: string | null;
  country: string | null;
  formed: number | null;
  description: string | null;
};

export type PlayerInfo = {
  name: string;
  cutout: string | null;
  thumb: string | null;
  nationality: string | null;
  position: string | null;
  born: string | null;
};

const inflight = new Map<string, Promise<unknown>>();

function readCache<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORE + key);
    if (!raw) return null;
    const { t, v } = JSON.parse(raw);
    if (Date.now() - t > TTL) {
      sessionStorage.removeItem(STORE + key);
      return null;
    }
    return v as T;
  } catch {
    return null;
  }
}

function writeCache(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STORE + key, JSON.stringify({ t: Date.now(), v: value }));
  } catch {
    /* quota or private mode — cache is optional */
  }
}

async function once<T>(key: string, run: () => Promise<T | null>): Promise<T | null> {
  const hit = readCache<T>(key);
  if (hit !== null) return hit;

  const pending = inflight.get(key) as Promise<T | null> | undefined;
  if (pending) return pending;

  const p = run()
    .then((v) => {
      if (v !== null) writeCache(key, v);
      return v;
    })
    .catch(() => null)
    .finally(() => inflight.delete(key));

  inflight.set(key, p);
  return p;
}

async function getJSON(url: string): Promise<Record<string, unknown> | null> {
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), 8000);
  try {
    const res = await fetch(url, { signal: ctl.signal });
    if (!res.ok) return null;
    return (await res.json()) as Record<string, unknown>;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

const num = (v: unknown) => {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : null;
};

export function fetchTeam(query: string): Promise<TeamInfo | null> {
  return once<TeamInfo>(`team:${query}`, async () => {
    const json = await getJSON(`${BASE}/searchteams.php?t=${encodeURIComponent(query)}`);
    const list = (json?.teams as Record<string, string>[] | null) ?? null;
    if (!list?.length) return null;

    // the endpoint is fuzzy and returns other sports — take the first football hit
    const t = list.find((x) => x.strSport === "Soccer") ?? list[0];
    if (!t) return null;

    return {
      name: t.strTeam,
      short: t.strTeamShort || t.strTeam.slice(0, 3).toUpperCase(),
      badge: t.strBadge || null,
      stadium: t.strStadium || null,
      capacity: num(t.intStadiumCapacity),
      location: t.strLocation || null,
      country: t.strCountry || null,
      formed: num(t.intFormedYear),
      description: t.strDescriptionEN || null,
    };
  });
}

export function fetchPlayer(name: string): Promise<PlayerInfo | null> {
  return once<PlayerInfo>(`player:${name}`, async () => {
    const json = await getJSON(`${BASE}/searchplayers.php?p=${encodeURIComponent(name)}`);
    const list = (json?.player as Record<string, string>[] | null) ?? null;
    const p = list?.[0];
    if (!p) return null;

    return {
      name: p.strPlayer,
      cutout: p.strCutout || null,
      thumb: p.strThumb || null,
      nationality: p.strNationality || null,
      position: p.strPosition || null,
      born: p.dateBorn || null,
    };
  });
}
