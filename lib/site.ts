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
