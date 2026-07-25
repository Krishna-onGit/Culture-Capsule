"use client";

import { useEffect, useState } from "react";
import { fetchTeam, fetchPlayer, type TeamInfo, type PlayerInfo } from "./football";

type Resolved<T> = { query: string | null; data: T | null };
type State<T> = { data: T | null; loading: boolean };

/**
 * Shared shape for the two lookups.
 *
 * `loading` is derived rather than stored: state is written only from the async
 * callback, never synchronously in the effect body, so there is no cascading
 * render on mount. A failed lookup resolves to `{ data: null }` for that query,
 * which reads as "done, nothing found" instead of spinning forever.
 */
function useLookup<T>(
  key: string | null,
  active: boolean,
  load: (k: string) => Promise<T | null>
): State<T> {
  const [resolved, setResolved] = useState<Resolved<T>>({ query: null, data: null });

  useEffect(() => {
    if (!key || !active) return;
    let alive = true;

    load(key).then((data) => {
      if (alive) setResolved({ query: key, data });
    });

    return () => {
      alive = false;
    };
  }, [key, active, load]);

  const settled = resolved.query === key;
  return {
    data: settled ? resolved.data : null,
    loading: !!key && active && !settled,
  };
}

/**
 * Pass `active: false` to hold the request until the section is near the
 * viewport — the free API tier is rate-limited, so we do not fire twenty
 * lookups on first paint.
 */
export function useTeam(query: string | null, active = true): State<TeamInfo> {
  return useLookup(query, active, fetchTeam);
}

export function usePlayer(name: string | null, active = true): State<PlayerInfo> {
  return useLookup(name, active, fetchPlayer);
}

/**
 * True once the element has been within `rootMargin` of the viewport.
 * Used to defer API calls until a section is actually approaching.
 */
export function useNearViewport(ref: React.RefObject<Element | null>, rootMargin = "600px") {
  // Environments without IntersectionObserver skip the gate entirely.
  const [near, setNear] = useState(
    () => typeof IntersectionObserver === "undefined" && typeof window !== "undefined"
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || near || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin, near]);

  return near;
}
