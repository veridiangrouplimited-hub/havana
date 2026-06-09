/**
 * Central site configuration for the Nigerian Mission website template.
 *
 * Every Mission-specific value is a [Placeholder]. When a Mission adopts
 * this template, this is the single file to update (or to map to CMS
 * global settings) — no page content needs to be edited for the basics.
 */

export const site = {
  /** Brand name of the Mission as displayed across the website. */
  missionName: "Embassy of Nigeria in Havana",
  missionShortName: "Nigerian Embassy, Havana",
  hostCountry: "Cuba",
  city: "Havana",
  address: "5ta Avenida No. 1402, Miramar, Playa",
  /** Placeholder — replace with the Embassy's official mailbox. */
  email: "info@nigeriahavana.gov.ng",
  phones: ["[+53 7 XXX XXXX]", "[+53 7 XXX XXXX]"],
  emergencyPhone: "[+53 5 XXX XXXX]",
  headOfMission: "[Head of Mission Name]",
  headOfMissionTitle:
    "Ambassador Extraordinary and Plenipotentiary of the Federal Republic of Nigeria to the Republic of Cuba",
  officeHours: [
    { days: "Monday – Friday", hours: "9:00 am – 4:00 pm" },
    { days: "Consular submissions", hours: "9:30 am – 12:30 pm" },
    { days: "Collections", hours: "2:00 pm – 4:00 pm" },
  ],
  /** Placeholder — replace with the Embassy's production domain. */
  url: "https://nigeriahavana.gov.ng",
  social: [
    { label: "Facebook", href: "[Facebook URL]" },
    { label: "X (Twitter)", href: "[X URL]" },
    { label: "Instagram", href: "[Instagram URL]" },
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
      { label: "Overview", href: "/about#overview" },
      { label: "Head of Mission", href: "/about#head-of-mission" },
      { label: "Mission History", href: "/about#history" },
      { label: "Departments", href: "/about#departments" },
      { label: "Diplomatic Mandate", href: "/about#mandate" },
    ],
  },
  {
    label: "Consular Services",
    href: "/consular-services",
    children: [
      { label: "All Services", href: "/consular-services" },
      { label: "Visa Services", href: "/consular-services/visa-services" },
      { label: "Passport Services", href: "/consular-services/passport-services" },
      {
        label: "Emergency Travel Certificate",
        href: "/consular-services/emergency-travel-certificate",
      },
      {
        label: "Document Authentication",
        href: "/consular-services/document-authentication",
      },
      { label: "Notarial Services", href: "/consular-services/notarial-services" },
      { label: "Consular Assistance", href: "/consular-services/consular-assistance" },
    ],
  },
  { label: "Bilateral Relations", href: "/relations" },
  { label: "Nigerians in Diaspora", href: "/diaspora" },
  { label: "News & Press", href: "/news" },
  { label: "Public Notices", href: "/public-notices" },
  { label: "Contact Us", href: "/contact" },
];
