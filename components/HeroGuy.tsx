"use client";

/* Flat, blocky cartoon character in the Instagram-reels style — a friendly
   man holding the gold key ("your key to Dubai"). Original art, built to
   match the brand's reel figures (blocky head, pixel hair, dot eyes, orange
   shirt, navy jeans). Sits on the navy hero badge. Keeps the hero-figure
   class so it gets the brand's gentle "breathe" animation. */

export default function HeroGuy() {
  return (
    <div className="hero-art">
      <svg
        viewBox="0 0 200 210"
        className="hero-figure"
        role="img"
        aria-label="A friendly cartoon person holding a gold key to a Dubai home"
      >
        {/* soft ground shadow */}
        <ellipse cx="100" cy="196" rx="52" ry="9" fill="#000" opacity="0.18" />

        {/* ---- legs + shoes (navy jeans) ---- */}
        <rect x="80" y="150" width="17" height="42" fill="#2B4E8C" />
        <rect x="103" y="150" width="17" height="42" fill="#2B4E8C" />
        <rect x="75" y="186" width="24" height="12" rx="2" fill="#1B2435" />
        <rect x="101" y="186" width="24" height="12" rx="2" fill="#1B2435" />

        {/* ---- arms (skin) ---- */}
        {/* left arm down */}
        <rect x="58" y="110" width="14" height="42" rx="6" fill="#CC8E5B" />
        {/* right upper + forearm raised, holding the key */}
        <rect x="128" y="112" width="14" height="26" rx="6" fill="#CC8E5B" />
        <rect x="134" y="70" width="14" height="48" rx="6" fill="#CC8E5B" transform="rotate(14 141 94)" />

        {/* ---- torso (orange shirt) ---- */}
        <rect x="68" y="106" width="64" height="52" rx="10" fill="#E8763A" />
        <rect x="68" y="106" width="64" height="12" rx="6" fill="#F2A06A" opacity="0.6" />

        {/* ---- neck ---- */}
        <rect x="91" y="96" width="18" height="14" fill="#B97C4C" />

        {/* ---- head ---- */}
        <rect x="70" y="48" width="60" height="54" rx="14" fill="#CC8E5B" />
        {/* ears */}
        <rect x="65" y="70" width="8" height="14" rx="3" fill="#CC8E5B" />
        <rect x="127" y="70" width="8" height="14" rx="3" fill="#CC8E5B" />

        {/* ---- hair (blocky, pixel-stepped) ---- */}
        <g fill="#2A211C">
          <rect x="68" y="42" width="64" height="20" rx="6" />
          <rect x="68" y="56" width="10" height="20" />
          <rect x="122" y="56" width="10" height="20" />
          <rect x="78" y="38" width="44" height="8" rx="4" />
        </g>

        {/* ---- face ---- */}
        {/* eyes */}
        <rect x="86" y="72" width="8" height="10" rx="3" fill="#1C1B18" />
        <rect x="106" y="72" width="8" height="10" rx="3" fill="#1C1B18" />
        {/* smile */}
        <path d="M90 90 Q100 98 110 90" fill="none" stroke="#7A4A28" strokeWidth="3.4" strokeLinecap="round" />

        {/* ---- the gold key in the raised hand ---- */}
        <g transform="translate(150 44) rotate(24)">
          <circle cx="0" cy="0" r="12" fill="none" stroke="#E7C24A" strokeWidth="5" />
          <rect x="-2.5" y="10" width="5" height="34" rx="2" fill="#E7C24A" />
          <rect x="2.5" y="30" width="9" height="5" rx="1" fill="#E7C24A" />
          <rect x="2.5" y="39" width="7" height="5" rx="1" fill="#E7C24A" />
          {/* a tiny house in the key bow */}
          <path d="M-5 1 L0 -4 L5 1 Z" fill="#FBF8F2" />
          <rect x="-3.5" y="1" width="7" height="6" fill="#FBF8F2" />
        </g>
      </svg>
    </div>
  );
}
