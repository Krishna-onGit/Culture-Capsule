"use client";

import type { Moment } from "../../lib/data";

/** Pitch is drawn in a 100 x 64 viewBox. Moment paths are 0-100 / 0-100. */
export function pathD(points: Moment["path"]) {
  return points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${(p.y * 0.64).toFixed(1)}`)
    .join(" ");
}

export default function PlayDiagram({ moment }: { moment: Moment }) {
  const d = pathD(moment.path);
  const last = moment.path[moment.path.length - 1];

  return (
    <svg
      viewBox="0 0 100 64"
      className="h-auto w-full"
      role="img"
      aria-label={`Diagram of the move: ${moment.title}`}
    >
      {/* pitch markings — hairline, never the focus */}
      <g fill="none" stroke="var(--ink)" strokeOpacity="0.18" strokeWidth="0.25">
        <rect x="0.5" y="0.5" width="99" height="63" />
        <line x1="50" y1="0.5" x2="50" y2="63.5" />
        <circle cx="50" cy="32" r="8" />
        <rect x="0.5" y="19" width="12" height="26" />
        <rect x="87.5" y="19" width="12" height="26" />
      </g>

      {/* the move */}
      <path
        className="play-path"
        d={d}
        fill="none"
        stroke="var(--ink)"
        strokeWidth="0.7"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />

      {/* touch points */}
      {moment.path.map((p, i) => (
        <circle
          key={i}
          className="play-node"
          cx={p.x}
          cy={p.y * 0.64}
          r="0.85"
          fill="var(--ink)"
        />
      ))}

      {/* where it ended */}
      <circle
        className="play-end"
        cx={last.x}
        cy={last.y * 0.64}
        r="2.6"
        fill="var(--signal)"
        stroke="var(--ink)"
        strokeWidth="0.4"
      />
    </svg>
  );
}
