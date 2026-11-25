/* Original cartoon city backdrop for the hero: flat blocky towers, lit windows,
   cranes and sand, in the same language as the Instagram reels. Decorative. */

type Tower = { x: number; w: number; h: number; fill: string; crane?: boolean };

const GROUND = 560;

const BACK: Tower[] = [
  { x: 30, w: 90, h: 250, fill: "#9CC7E8" },
  { x: 210, w: 80, h: 330, fill: "#9CC7E8" },
  { x: 420, w: 100, h: 220, fill: "#9CC7E8" },
  { x: 660, w: 76, h: 290, fill: "#9CC7E8" },
  { x: 900, w: 100, h: 240, fill: "#9CC7E8" },
  { x: 1120, w: 84, h: 340, fill: "#9CC7E8" },
  { x: 1300, w: 110, h: 270, fill: "#9CC7E8" },
];

const FRONT: Tower[] = [
  { x: -20, w: 110, h: 340, fill: "#F3DDB4" },
  { x: 104, w: 92, h: 440, fill: "#6FA3D0", crane: true },
  { x: 210, w: 110, h: 210, fill: "#FBF1DC" },
  { x: 1110, w: 104, h: 230, fill: "#FBF1DC" },
  { x: 1228, w: 96, h: 460, fill: "#6FA3D0" },
  { x: 1338, w: 120, h: 320, fill: "#F3DDB4", crane: true },
];

function Windows({ t }: { t: Tower }) {
  const cells = [];
  for (let y = GROUND - t.h + 24; y < GROUND - 24; y += 34)
    for (let x = t.x + 16, c = 0; x < t.x + t.w - 22; x += 25, c++)
      cells.push(
        <rect
          key={`${x}-${y}`}
          x={x}
          y={y}
          width="13"
          height="18"
          fill={(c + y) % 5 === 0 ? "#F7C21C" : "#355A82"}
          opacity=".75"
        />
      );
  return <>{cells}</>;
}

export default function HeroCity() {
  return (
    <svg
      className="hero-city"
      viewBox="0 0 1440 620"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      {BACK.map((t) => (
        <rect key={t.x} x={t.x} y={GROUND - t.h} width={t.w} height={t.h} fill={t.fill} opacity=".55" />
      ))}
      {FRONT.map((t) => (
        <g key={t.x}>
          {t.crane && (
            <path
              d={`M${t.x + t.w / 2} ${GROUND - t.h}v-70m-30 14h95m-12 0v26`}
              fill="none"
              stroke="#14110A"
              strokeWidth="4"
            />
          )}
          <rect
            x={t.x}
            y={GROUND - t.h}
            width={t.w}
            height={t.h}
            fill={t.fill}
            stroke="#14110A"
            strokeWidth="2.5"
          />
          <Windows t={t} />
        </g>
      ))}
      <rect x="-5" y={GROUND} width="1450" height="65" fill="#F3DDB4" stroke="#14110A" strokeWidth="2.5" />
    </svg>
  );
}
