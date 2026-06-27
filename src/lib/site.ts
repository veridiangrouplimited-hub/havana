/**
 * Central site configuration for the Nigerian Mission website template.
 *
 * Every Mission-specific value is a [Placeholder]. When a Mission adopts
 * this template, this is the single file to update (or to map to CMS
 * global settings) — no page content needs to be edited for the basics.
 */

export const site = {
  /** Brand name of the Mission as displayed across the website. */
  missionName: "Embassy of Nigeria in Tokyo",
  missionShortName: "Nigerian Embassy, Tokyo",
  hostCountry: "Japan",
  city: "Tokyo",
  address: "5-2-43 Shirokanedai, Minato-ku",
  /** Sample values — replace with the Embassy's official details before launch. */
  email: "info.tokyo@foreignaffairs.gov.ng",
  phones: ["+81 3 5789 4455", "+81 3 5789 4456"],
  emergencyPhone: "+81 80 9876 5432",
  headOfMission: "H.E. (Dr) Adaeze N. Okonkwo",
  headOfMissionTitle:
    "Ambassador Extraordinary and Plenipotentiary of the Federal Republic of Nigeria to Japan",
  headOfMissionPortrait: {
    src: "",
    alt: "Official portrait of the Ambassador of the Federal Republic of Nigeria to Japan",
    credit: "Official portrait pending — to be updated before launch",
  },
  officeHours: [
    { days: "Monday – Friday", hours: "9:00 am – 4:00 pm" },
    { days: "Consular submissions", hours: "9:30 am – 12:30 pm" },
    { days: "Collections", hours: "2:00 pm – 4:00 pm" },
  ],
  /** Placeholder — replace with the Embassy's production domain. */
  url: "https://nigeriajapan.gov.ng",
  social: [
    { label: "Facebook", href: "https://facebook.com/NigeriaEmbassyTokyo", icon: "facebook" },
    { label: "X (Twitter)", href: "https://x.com/NigeriaTokyo", icon: "x" },
    { label: "Instagram", href: "https://instagram.com/nigeriaembassytokyo", icon: "instagram" },
  ],
};

export const govLinks = [
  { label: "State House — The Presidency", href: "https://statehouse.gov.ng" },
  { label: "Ministry of Foreign Affairs", href: "https://foreignaffairs.gov.ng" },
  { label: "Nigeria Immigration Service", href: "https://immigration.gov.ng" },
  { label: "NiDCOM — Diaspora Commission", href: "https://nidcom.gov.ng" },
  { label: "NIPC — Investment Promotion", href: "https://nipc.gov.ng" },
];

export interface NavChild {
  label: string;
  href: string;
  icon?: string;
  desc?: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About the Mission",
    href: "/about",
    children: [
      { label: "Overview", href: "/about#overview", icon: "globe", desc: "Mission profile, structure and contact details" },
      { label: "Head of Mission", href: "/about#head-of-mission", icon: "users", desc: "Message and biography of the Ambassador" },
      { label: "Mission History", href: "/about#history", icon: "document", desc: "History of Nigeria–Japan diplomatic relations" },
      { label: "Departments", href: "/about#departments", icon: "shield", desc: "Chancery sections and their responsibilities" },
      { label: "Diplomatic Mandate", href: "/about#mandate", icon: "scale", desc: "Legal framework and mandate of the Mission" },
    ],
  },
  {
    label: "Consular Services",
    href: "/consular-services",
    children: [
      { label: "All Services", href: "/consular-services", icon: "passport", desc: "Browse the full catalogue of consular services" },
      { label: "Visa Services", href: "/consular-services/visa-services", icon: "visa", desc: "Entry visas for travel to Nigeria" },
      { label: "Passport Services", href: "/consular-services/passport-services", icon: "passport", desc: "Apply for or renew your Nigerian e-passport" },
      { label: "Emergency Travel Certificate", href: "/consular-services/emergency-travel-certificate", icon: "plane", desc: "One-way document for urgent return to Nigeria" },
      { label: "Document Authentication", href: "/consular-services/document-authentication", icon: "seal", desc: "Legalisation and attestation of documents" },
      { label: "Notarial Services", href: "/consular-services/notarial-services", icon: "document", desc: "Affidavits, powers of attorney and certified copies" },
      { label: "Consular Assistance", href: "/consular-services/consular-assistance", icon: "alert", desc: "Support for Nigerians in distress or emergency" },
    ],
  },
  { label: "Bilateral Relations", href: "/relations" },
  { label: "Nigerians in Diaspora", href: "/diaspora" },
  {
    label: "News & Press",
    href: "/news",
    children: [
      { label: "News", href: "/news", icon: "bell", desc: "Latest news and mission activities" },
      { label: "Press Releases", href: "/news/press-releases", icon: "document", desc: "Official press releases from the Mission" },
    ],
  },
  {
    label: "Public Notices",
    href: "/public-notices",
    children: [
      { label: "Official Statements", href: "/public-notices/official-statements", icon: "document", desc: "Formal statements issued by the Mission" },
      { label: "Speeches", href: "/public-notices/speeches", icon: "quote", desc: "Addresses delivered at official functions" },
    ],
  },
  { label: "Contact Us", href: "/contact" },
];
