/**
 * Static film grain, rendered as an inline SVG data URI.
 * The old build fetched this from an external domain on every page load,
 * which meant the whole page texture depended on a third-party host.
 */
const NOISE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'>
       <filter id='n'>
         <feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/>
         <feColorMatrix type='saturate' values='0'/>
       </filter>
       <rect width='140' height='140' filter='url(#n)' opacity='0.55'/>
     </svg>`
  );

export default function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[200] opacity-[0.055] mix-blend-multiply"
      style={{ backgroundImage: `url("${NOISE}")` }}
    />
  );
}
