// ====================================================================
//  EDIT YOUR BUSINESS DETAILS HERE — change these and the whole site updates.
// ====================================================================
export const site = {
  name: "Simple Real Estate",
  tagline: "UAE real estate in simple words & real numbers.",

  // --- Contact (from Quadrant Properties) ---
  phone: "+971 52 768 2266", // shown for calls
  phoneTel: "971527682266", // used in tel: link
  whatsapp: "971509195194", // used in WhatsApp link (digits only, with country code)
  email: "info@quadrant.ae",
  office: "Office 805, Concord Tower, Dubai Media City, Dubai",
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Office%20805%2C%20Concord%20Tower%2C%20Dubai%20Media%20City%2C%20Dubai",

  // --- Social ---
  instagram: "https://instagram.com/simple.real_estate",
  instagramHandle: "@simple.real_estate",
  linkedin: "https://www.linkedin.com/company/quadrantproperties/",
  facebook: "https://www.facebook.com/quadrantproperties",
};

export const waLink = (text?: string) =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

// ====================================================================
//  FEATURED PROJECTS — real off-plan launches. Add / edit freely.
// ====================================================================
export type Project = {
  name: string;
  developer: string;
  area: string;
  priceFrom: string;
  beds: string;
  handover: string;
  tag: string;
  image: string;
};

export const projects: Project[] = [
  {
    name: "Palm Springs",
    developer: "Nakheel",
    area: "Palm Jebel Ali",
    priceFrom: "AED 3,800,000",
    beds: "3, 4 & 5 bed",
    handover: "2030",
    tag: "NEW LAUNCH",
    image:
      "https://cdn.sanity.io/images/60y5olnp/production/df23fc7542d0345bf731c947b4a2eb6882d00e27-2000x1125.jpg",
  },
  {
    name: "ELLE Residences",
    developer: "Anax Development",
    area: "Dubai Islands",
    priceFrom: "AED 2,821,777",
    beds: "1 & 2 bed",
    handover: "2027",
    tag: "NEW LAUNCH",
    image:
      "https://quadrant.ae/public/uploads/developments/1783950129_28f5dfc6_d924_42b8_9f56_95cfe62f7f04_2704c75b99.webp",
  },
  {
    name: "Creek Bay",
    developer: "Emaar",
    area: "Dubai Creek Harbour",
    priceFrom: "AED 1,800,000",
    beds: "1, 2 & 3 bed",
    handover: "2030",
    tag: "NEW LAUNCH",
    image:
      "https://quadrant.ae/public/uploads/developments/1783944367_Banner_e7b96c7596_8f3a725866.webp",
  },
  {
    name: "Aria Heights",
    developer: "SRG",
    area: "JVC",
    priceFrom: "AED 820,887",
    beds: "Studio, 1 & 2 bed",
    handover: "2027",
    tag: "NEW LAUNCH",
    image:
      "https://quadrant.ae/public/uploads/developments/1783894853_675c10506f96d_sw_aria1_e39d8819fb.jpg",
  },
  {
    name: "KORE",
    developer: "Imtiaz Developments",
    area: "Dubai Land",
    priceFrom: "AED 679,000",
    beds: "Studio, 1 & 2 bed",
    handover: "2028",
    tag: "NEW LAUNCH",
    image: "",
  },
  {
    name: "South Lofts",
    developer: "ABRA",
    area: "Dubai South",
    priceFrom: "AED 475,000",
    beds: "Studio, 1 & 2 bed",
    handover: "2028",
    tag: "BEST VALUE",
    image:
      "https://quadrant.ae/public/uploads/developments/1783892284_Picture1_cd3a0cacdf.png",
  },
];

// ====================================================================
//  ESCROW — how UAE law protects off-plan money (real Dubai law).
// ====================================================================
export const escrowSteps: {
  n: string;
  title: string;
  body: string;
  cite: string;
}[] = [
  {
    n: "01",
    title: "You pay into escrow, not the developer",
    body: "Every instalment goes into the project's own escrow account at a bank approved by the regulator — and it is reported to the Land Department. The developer never touches it directly.",
    cite: "Law No. 8 of 2007 · Art. 7",
  },
  {
    n: "02",
    title: "One project, one account",
    body: "A developer building five towers needs five escrow accounts. Your money can only ever be spent building your project — never another tower, never the company's bills.",
    cite: "Art. 9",
  },
  {
    n: "03",
    title: "Creditors can't touch it",
    body: "If the developer owes money elsewhere, their creditors cannot seize the payments sitting in your project's escrow account. The law ring-fences it for buyers.",
    cite: "Art. 9(1)",
  },
  {
    n: "04",
    title: "Released only as the building rises",
    body: "Money is paid out in stages against real construction progress, verified by independent engineers before each release. No building, no money.",
    cite: "Approved by RERA",
  },
  {
    n: "05",
    title: "5% held back for a year",
    body: "Even after the completion certificate, the bank keeps 5% of the account, released only a year after the units are registered to buyers — your cushion against defects.",
    cite: "Art. 14",
  },
  {
    n: "06",
    title: "If it stalls: finished or refunded",
    body: "If a project isn't completed, the escrow agent and the Land Department step in to finish it or refund buyers. Misusing the funds means jail and/or a fine of at least AED 100,000.",
    cite: "Art. 15 · Art. 16",
  },
];

// ====================================================================
//  SAFETY CHECKLIST — tick-box list with a live score.
// ====================================================================
export const safetyChecks: { label: string; hint: string }[] = [
  { label: "The developer is registered with RERA", hint: "Look them up by name in the Dubai REST app." },
  { label: "The project has its own escrow account", hint: "Check status, developer and escrow details in the app." },
  { label: "My payment details match that escrow account exactly", hint: "Same bank, same account number — never cash or a personal account." },
  { label: "The escrow account is written into my contract (SPA)", hint: "Your Sale & Purchase Agreement should name it." },
  { label: "My purchase is registered with DLD (Oqood)", hint: "The interim register for off-plan sales. Ask for the certificate." },
  { label: "My broker is RERA-registered", hint: "Check their Broker Registration Number (BRN)." },
  { label: "Instalments are linked to construction progress", hint: "Compare the completion % with each milestone before paying." },
  { label: "I've read the handover date and delay clauses", hint: "Know what happens if completion slips." },
  { label: "I know the developer's track record", hint: "Past handovers — on time, and quality today." },
  { label: "Every receipt is in the project's name", hint: "Keep them all for registration and any dispute." },
];

// ====================================================================
//  INVESTOR MATCH — 5-question quiz → a profile.
// ====================================================================
export type QuizOption = { icon: string; label: string; sub: string; key: string };
export const quiz: { q: string; options: QuizOption[] }[] = [
  {
    q: "What do you want the property to do?",
    options: [
      { icon: "💸", label: "Monthly rental income", sub: "cash flow first", key: "income" },
      { icon: "📈", label: "Grow in value", sub: "buy early, sell later", key: "growth" },
      { icon: "🛂", label: "Golden Visa", sub: "residency for my family", key: "visa" },
      { icon: "🏠", label: "Live in it, later invest", sub: "home first", key: "home" },
    ],
  },
  {
    q: "What's your budget?",
    options: [
      { icon: "🪙", label: "Under AED 1M", sub: "entry level", key: "u1" },
      { icon: "💰", label: "AED 1M – 2M", sub: "mid market", key: "1to2" },
      { icon: "💎", label: "AED 2M – 5M", sub: "visa + upside", key: "2to5" },
      { icon: "🏛️", label: "AED 5M+", sub: "prime & trophy", key: "5plus" },
    ],
  },
  {
    q: "When do you want to buy?",
    options: [
      { icon: "⚡", label: "Next 3 months", sub: "ready to move", key: "now" },
      { icon: "📅", label: "3 – 6 months", sub: "lining it up", key: "soon" },
      { icon: "🧭", label: "6 – 12 months", sub: "planning ahead", key: "later" },
      { icon: "🔎", label: "Just researching", sub: "no rush", key: "research" },
    ],
  },
  {
    q: "How hands-on do you want to be?",
    options: [
      { icon: "🛋️", label: "Fully passive", sub: "manage it for me", key: "passive" },
      { icon: "🤝", label: "A bit involved", sub: "I'll approve the big calls", key: "mixed" },
      { icon: "🛠️", label: "Hands-on", sub: "I'll run it myself", key: "active" },
    ],
  },
  {
    q: "Are you buying in cash or with a mortgage?",
    options: [
      { icon: "💵", label: "Cash", sub: "no bank needed", key: "cash" },
      { icon: "🏦", label: "Mortgage", sub: "finance part of it", key: "mortgage" },
      { icon: "❓", label: "Not sure yet", sub: "show me both", key: "unsure" },
    ],
  },
];

// ====================================================================
//  REELS — the real reels from our Instagram (@simple.real_estate).
//  `img` is the actual cover saved in /public/reels; `href` links to the
//  real reel. To refresh: replace the cover image and update the href.
// ====================================================================
export const reels: { img: string; title: string; sub: string; keyword: string; href: string }[] = [
  { img: "/reels/reel0.jpg", title: "Pay cash or borrow?", sub: "A mortgage isn't good or bad — it's a magnifier. Test it against your numbers.", keyword: "CASH", href: "https://www.instagram.com/reel/Df60TvMwuY2/" },
  { img: "/reels/reel1.jpg", title: "The view or the school run?", sub: "A sea view or the school run — be honest about your priorities first.", keyword: "LIVE", href: "https://www.instagram.com/reel/Df5UKBcFRrl/" },
  { img: "/reels/reel2.jpg", title: "Sell before the keys?", sub: "Planning to flip before handover? Have a plan for the slow year too.", keyword: "FLIP", href: "https://www.instagram.com/reel/Df4kEnyBxyI/" },
  { img: "/reels/reel3.jpg", title: "Same money. Two paths.", sub: "Off-plan or ready isn't better or worse — it's which fits your money.", keyword: "PATHS", href: "https://www.instagram.com/reel/Df4Bs89lLDQ/" },
  { img: "/reels/reel4.jpg", title: "Same market. Who wins?", sub: "The winners aren't the smartest — they saw what others missed.", keyword: "WINS", href: "https://www.instagram.com/reel/Df2hjO2nKJF/" },
  { img: "/reels/reel5.jpg", title: "27% of all sales on one island", sub: "Want to know where an area's heading? Follow where the money goes.", keyword: "ISLAND", href: "https://www.instagram.com/reel/Df1c8HPBxV5/" },
];

// ====================================================================
//  FREE GUIDES — lead magnets.
// ====================================================================
export const guides: { kicker: string; title: string; desc: string; pages: string; keyword: string }[] = [
  {
    kicker: "Buyer's guide · 2026",
    title: "The real cost of buying in Dubai",
    desc: "Every fee from offer to keys, what you pay each year after, and a worksheet for your own numbers.",
    pages: "8 pages",
    keyword: "COSTS",
  },
  {
    kicker: "Investor's guide · 2026",
    title: "Is your off-plan money safe?",
    desc: "How escrow protects you, what happens if a project stalls, and the 10 checks before you pay a dirham.",
    pages: "6 pages",
    keyword: "SAFE",
  },
  {
    kicker: "Visa guide · 2026",
    title: "Property → Golden Visa, step by step",
    desc: "What value counts, how mortgaged and off-plan homes qualify, and the documents you'll need.",
    pages: "5 pages",
    keyword: "VISA",
  },
];

// ====================================================================
//  GLOSSARY — speak Dubai property.
// ====================================================================
export const glossary: { term: string; cat: string; def: string }[] = [
  { term: "DLD", cat: "regulator", def: "Dubai Land Department — registers property, ownership and transactions, and collects the 4% transfer fee." },
  { term: "RERA", cat: "regulator", def: "Real Estate Regulatory Agency, part of DLD. Regulates developers, brokers, escrow accounts and off-plan projects." },
  { term: "Escrow account", cat: "off-plan", def: "A project-specific bank account where off-plan buyers' payments are held and released to the developer only for construction." },
  { term: "Oqood", cat: "off-plan", def: "The DLD's interim register for off-plan sales. Your purchase is recorded here before the building is complete." },
  { term: "SPA", cat: "contract", def: "Sale & Purchase Agreement — the main contract with the developer or seller, setting price, plan and handover terms." },
  { term: "Title deed", cat: "ownership", def: "The official record of ownership issued by DLD once the property is transferred into your name." },
  { term: "Transfer fee", cat: "cost", def: "The DLD fee on a purchase: 4% of the price, paid by the buyer by market convention." },
  { term: "Handover", cat: "off-plan", def: "When the developer completes the building and gives you the keys. A large instalment is often due here." },
  { term: "Post-handover plan", cat: "off-plan", def: "A payment plan where part of the price is paid in instalments after you already have the keys." },
  { term: "Service charge", cat: "cost", def: "The yearly fee to maintain the building and community, charged per square foot of your unit." },
  { term: "NOC", cat: "resale", def: "No-Objection Certificate from the developer, needed to transfer a resale property." },
  { term: "BRN", cat: "broker", def: "Broker Registration Number. Every licensed broker has one — check it before you deal with them." },
  { term: "Freehold", cat: "ownership", def: "Full ownership of the property. Foreigners can buy freehold in designated areas of Dubai." },
  { term: "Snagging", cat: "handover", def: "Inspecting a new unit for defects before or at handover so the developer fixes them first." },
  { term: "Dubai REST", cat: "tool", def: "The DLD's official app: look up projects, developers, brokers and your property services in minutes." },
  { term: "Golden Visa", cat: "residency", def: "A 10-year renewable UAE residency. Property worth AED 2M+ can make you eligible, with conditions." },
];

// --- Trust stats (shown as count-up band) ---
export const trustStats: { value: string; label: string }[] = [
  { value: "AED 500M+", label: "property value advised on" },
  { value: "7", label: "free calculators & tools" },
  { value: "40+", label: "off-plan launches tracked" },
  { value: "0", label: "fees charged to buyers" },
];

// ====================================================================
//  LIVE DUBAI MARKET DATA — real figures (Dubai Land Department,
//  trailing 12 months). Refresh these from the market when they move.
// ====================================================================
export const marketHeadline: { value: string; label: string; sub: string }[] = [
  { value: "AED 1,720", label: "median price / sq ft", sub: "across Dubai" },
  { value: "7%", label: "typical gross yield", sub: "Dubai average" },
  { value: "132,867", label: "sales transactions", sub: "last 12 months" },
  { value: "AED 1,419,000", label: "median property price", sub: "all of Dubai" },
];

// Median price per sq ft by area (AED) — for the animated bar chart.
export const areaPrices: { area: string; sqft: number; yield: string }[] = [
  { area: "Al Wasl", sqft: 3157, yield: "5.2%" },
  { area: "Downtown Dubai", sqft: 2989, yield: "4.7%" },
  { area: "Dubai Creek Harbour", sqft: 2564, yield: "5.1%" },
  { area: "Business Bay", sqft: 2437, yield: "6.6%" },
  { area: "Al Satwa", sqft: 2294, yield: "5.3%" },
  { area: "Al Jaddaf", sqft: 2025, yield: "5.6%" },
  { area: "Dubai — median", sqft: 1720, yield: "7.0%" },
];
