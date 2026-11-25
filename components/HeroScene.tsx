/* Flat reel-style backdrop for the hero — bright green grass, blocky trees and
   simple flat towers, in the same cartoon world as the Instagram reels. One
   inline SVG spanning the hero's base; trees sway via CSS (.tree groups). */

/* a simple blocky tree, drawn with its base at (0,0) going up */
function Tree() {
  return (
    <>
      <rect x="-8" y="-38" width="16" height="40" rx="4" fill="#7A4A28" />
      <rect x="-38" y="-104" width="76" height="76" rx="26" fill="#4E9C3A" />
      <rect x="-38" y="-104" width="76" height="22" rx="14" fill="#64B64A" opacity="0.7" />
      <circle cx="-16" cy="-70" r="5" fill="#3C7E2D" opacity="0.6" />
      <circle cx="14" cy="-58" r="4" fill="#3C7E2D" opacity="0.6" />
    </>
  );
}

/* a flat tower with a small lit-window grid */
function Tower({ w, h, fill, lit }: { w: number; h: number; fill: string; lit?: boolean }) {
  const cols = Math.max(2, Math.round(w / 20));
  const rows = Math.max(3, Math.round(h / 26));
  const win: React.ReactNode[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const on = lit && (r + c) % 3 === 0;
      win.push(
        <rect
          key={`${r}-${c}`}
          className={on ? "win-lit" : undefined}
          x={10 + c * ((w - 16) / cols)}
          y={14 + r * ((h - 20) / rows)}
          width={(w - 16) / cols - 6}
          height={(h - 20) / rows - 7}
          rx="1.5"
          fill={on ? "#F7C21C" : "#CFE2FF"}
          opacity={on ? 0.95 : 0.65}
        />
      );
    }
  }
  return (
    <>
      <rect x="0" y="0" width={w} height={h} rx="4" fill={fill} />
      {win}
    </>
  );
}

export default function HeroScene() {
  return (
    <svg
      className="hero-scene-svg"
      viewBox="0 0 1440 230"
      preserveAspectRatio="xMidYEnd slice"
      aria-hidden="true"
    >
      {/* flat towers along the back, flanking the content */}
      <g opacity="0.92">
        <g transform="translate(70 70)"><Tower w={62} h={118} fill="#2C4A74" lit /></g>
        <g transform="translate(145 40)"><Tower w={74} h={148} fill="#223B5E" lit /></g>
        <g transform="translate(1235 55)"><Tower w={70} h={133} fill="#223B5E" lit /></g>
        <g transform="translate(1320 78)"><Tower w={60} h={110} fill="#2C4A74" lit /></g>
      </g>

      {/* bright green grass ground */}
      <rect x="0" y="188" width="1440" height="42" fill="#6FAE44" />
      <rect x="0" y="188" width="1440" height="7" fill="#86C457" />

      {/* blocky trees in front, each wrapped so CSS can sway the inner group */}
      <g transform="translate(300 190)"><g className="tree t1"><Tree /></g></g>
      <g transform="translate(1150 190)"><g className="tree t2"><Tree /></g></g>
    </svg>
  );
}
