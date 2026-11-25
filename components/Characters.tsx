/* Flat, blocky cartoon characters in the Instagram-reels style — original art
   (not copied from the reels), reused as section accents. Each is a self-
   contained inline SVG with no scene background, so it drops onto any section. */

/* shared blocky body pieces (legs, torso, head) centred on x≈100 */
function Body() {
  return (
    <>
      <ellipse cx="100" cy="208" rx="50" ry="9" fill="#000" opacity="0.16" />
      {/* legs + shoes */}
      <rect x="82" y="162" width="17" height="42" fill="#2B4E8C" />
      <rect x="101" y="162" width="17" height="42" fill="#2B4E8C" />
      <rect x="77" y="198" width="24" height="12" rx="2" fill="#1B2435" />
      <rect x="99" y="198" width="24" height="12" rx="2" fill="#1B2435" />
      {/* torso */}
      <rect x="70" y="118" width="60" height="52" rx="10" fill="#E8763A" />
      <rect x="70" y="118" width="60" height="12" rx="6" fill="#F2A06A" opacity="0.6" />
      {/* neck + head */}
      <rect x="91" y="108" width="18" height="14" fill="#B97C4C" />
      <rect x="71" y="60" width="58" height="54" rx="14" fill="#CC8E5B" />
      <rect x="66" y="82" width="8" height="14" rx="3" fill="#CC8E5B" />
      <rect x="126" y="82" width="8" height="14" rx="3" fill="#CC8E5B" />
      {/* hair */}
      <g fill="#2A211C">
        <rect x="69" y="54" width="62" height="20" rx="6" />
        <rect x="69" y="68" width="10" height="20" />
        <rect x="121" y="68" width="10" height="20" />
        <rect x="79" y="50" width="42" height="8" rx="4" />
      </g>
      {/* face */}
      <rect x="86" y="84" width="8" height="10" rx="3" fill="#1C1B18" />
      <rect x="106" y="84" width="8" height="10" rx="3" fill="#1C1B18" />
      <path d="M90 102 Q100 110 110 102" fill="none" stroke="#7A4A28" strokeWidth="3.4" strokeLinecap="round" />
    </>
  );
}

/* little yellow sticker price tag */
function Tag({ x, y, w, label }: { x: number; y: number; w: number; label: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="0" y="0" width={w} height="20" rx="5" fill="#F7C21C" stroke="#14110A" strokeWidth="2.2" />
      <text x={w / 2} y="14" textAnchor="middle" fontFamily="Archivo, sans-serif" fontSize="10" fontWeight="800" fill="#14110A">{label}</text>
    </g>
  );
}

/* Man holding a phone up, price tags fanning out — for the market/prices section */
export function ManPhone() {
  return (
    <svg viewBox="0 0 230 230" role="img" aria-label="A person holding a phone that shows listing asking prices" className="char-svg">
      {/* connector lines from the phone to each tag */}
      <g stroke="#14110A" strokeWidth="2" opacity="0.5">
        <line x1="168" y1="56" x2="52" y2="30" />
        <line x1="168" y1="56" x2="190" y2="26" />
        <line x1="168" y1="56" x2="40" y2="78" />
        <line x1="168" y1="56" x2="196" y2="80" />
      </g>

      <Body />

      {/* left arm down */}
      <rect x="58" y="122" width="14" height="42" rx="6" fill="#CC8E5B" />
      {/* right arm raised holding the phone */}
      <rect x="128" y="120" width="14" height="24" rx="6" fill="#CC8E5B" />
      <rect x="150" y="74" width="14" height="46" rx="6" fill="#CC8E5B" transform="rotate(18 157 97)" />
      {/* phone */}
      <g transform="rotate(10 168 56)">
        <rect x="156" y="38" width="24" height="40" rx="5" fill="#1B2435" stroke="#14110A" strokeWidth="2" />
        <rect x="160" y="44" width="16" height="26" rx="2" fill="#CFE2FF" />
      </g>

      {/* fanning price tags */}
      <Tag x={18} y={20} w={40} label="AED" />
      <Tag x={176} y={14} w={44} label="ASKING" />
      <Tag x={8} y={70} w={52} label="FOR SALE" />
      <Tag x={182} y={70} w={40} label="AED" />
    </svg>
  );
}

/* Man beside a stack of gold coins — for the cost / "real numbers" section */
export function ManCoins() {
  return (
    <svg viewBox="0 0 230 230" role="img" aria-label="A person next to a stack of gold coins" className="char-svg">
      <Body />
      {/* left arm down */}
      <rect x="58" y="122" width="14" height="42" rx="6" fill="#CC8E5B" />
      {/* right arm resting on the coin stack */}
      <rect x="128" y="130" width="34" height="14" rx="6" fill="#CC8E5B" />
      {/* coin stack */}
      <g stroke="#14110A" strokeWidth="2.2">
        <ellipse cx="172" cy="196" rx="30" ry="9" fill="#D9A93A" />
        <rect x="142" y="170" width="60" height="26" fill="#E7C24A" />
        <ellipse cx="172" cy="170" rx="30" ry="9" fill="#F3D873" />
        <rect x="150" y="150" width="44" height="22" fill="#E7C24A" />
        <ellipse cx="172" cy="150" rx="22" ry="7" fill="#F3D873" />
        <rect x="156" y="134" width="32" height="18" fill="#E7C24A" />
        <ellipse cx="172" cy="134" rx="16" ry="6" fill="#F3D873" />
      </g>
      <text x="172" y="176" textAnchor="middle" fontFamily="Archivo, sans-serif" fontSize="13" fontWeight="800" fill="#14110A">AED</text>
    </svg>
  );
}

/* Man with both arms up, celebrating — for the Golden Visa / pay-cash section */
export function ManCheer() {
  return (
    <svg viewBox="0 0 230 230" role="img" aria-label="A happy person celebrating with both arms up" className="char-svg">
      <Body />
      {/* both arms up */}
      <rect x="54" y="74" width="14" height="48" rx="6" fill="#CC8E5B" transform="rotate(-20 61 98)" />
      <rect x="132" y="74" width="14" height="48" rx="6" fill="#CC8E5B" transform="rotate(20 139 98)" />
      {/* little celebration sparks */}
      <g fill="#F7C21C">
        <rect x="40" y="52" width="6" height="6" transform="rotate(45 43 55)" />
        <rect x="182" y="52" width="6" height="6" transform="rotate(45 185 55)" />
        <circle cx="30" cy="80" r="3" />
        <circle cx="198" cy="80" r="3" />
      </g>
    </svg>
  );
}

/* Man waving — for the "talk to a human" / contact section */
export function ManWave() {
  return (
    <svg viewBox="0 0 230 230" role="img" aria-label="A friendly person waving hello" className="char-svg">
      <Body />
      <rect x="58" y="122" width="14" height="42" rx="6" fill="#CC8E5B" />
      {/* raised waving arm */}
      <rect x="132" y="78" width="14" height="46" rx="6" fill="#CC8E5B" transform="rotate(24 139 100)" />
      <circle cx="160" cy="70" r="9" fill="#CC8E5B" />
    </svg>
  );
}
