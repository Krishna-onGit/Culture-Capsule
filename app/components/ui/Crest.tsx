"use client";

import { useState } from "react";
import { useTeam } from "../../lib/useFootball";

type Props = {
  /** TheSportsDB search term, e.g. "Manchester United" */
  query: string;
  /** Shown while loading and if the lookup fails — the page never depends on the API */
  code: string;
  size?: "sm" | "md" | "lg";
  active?: boolean;
  showName?: boolean;
};

const SIZE = {
  sm: "h-7 w-7",
  md: "h-12 w-12",
  lg: "h-20 w-20",
} as const;

/**
 * Crests carry their real colours — they are the one place colour is allowed
 * into an otherwise concrete/ink/signal palette, and a club badge that isn't
 * its own colour stops reading as that club.
 *
 * Images come from r2.thesportsdb.com, which sends no CORS headers, so any
 * treatment here has to be a CSS filter rather than a canvas operation.
 */
export default function Crest({ query, code, size = "md", active = true, showName = false }: Props) {
  const { data, loading } = useTeam(query, active);
  const [loaded, setLoaded] = useState(false);

  const box = SIZE[size];

  return (
    <span className="group/crest inline-flex flex-col items-center gap-1.5 text-center align-middle">
      <span className={`relative ${box} shrink-0`}>
        {/* skeleton / fallback plate — always present, so there is no layout shift */}
        <span
          aria-hidden
          className={`absolute inset-0 grid place-items-center border border-[var(--line)] transition-opacity duration-500 ${
            loaded ? "opacity-0" : "opacity-100"
          } ${loading ? "animate-pulse bg-[var(--concrete-dim)]" : "bg-transparent"}`}
        >
          {!loading && (
            <span className="data text-[9px] leading-none text-[var(--grey)]">{code}</span>
          )}
        </span>

        {data?.badge && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={data.badge}
            alt={`${data.name} crest`}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            className={`absolute inset-0 h-full w-full object-contain transition-[opacity,transform] duration-500 ease-[var(--ease-out-expo)] group-hover/crest:scale-110 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </span>

      {showName && (
        <span className="data whitespace-nowrap text-[10px] leading-none text-[var(--grey)] transition-colors duration-200 group-hover/crest:text-[var(--ink)]">
          {data?.short ?? code}
        </span>
      )}
    </span>
  );
}
