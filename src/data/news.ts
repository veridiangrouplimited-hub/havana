/**
 * News, press releases, speeches and official statements.
 * Maps to a CMS "News" collection with category + date metadata.
 */

export type NewsCategory =
  | "News"
  | "Press Release"
  | "Speech"
  | "Official Statement"
  | "Mission Activity";

export interface NewsItem {
  slug: string;
  title: string;
  category: NewsCategory;
  date: string; // ISO date
  department: string;
  excerpt: string;
  body: string[];
}

export const newsCategories: NewsCategory[] = [
  "News",
  "Press Release",
  "Speech",
  "Official Statement",
  "Mission Activity",
];

export const news: NewsItem[] = [
  {
    slug: "presentation-of-letters-of-credence",
    title: "[Head of Mission Name] Presents Letters of Credence",
    category: "News",
    date: "2026-05-28",
    department: "Office of the Head of Mission",
    excerpt:
      "The Head of Mission formally presented Letters of Credence to the Head of State of [Host Country], reaffirming Nigeria's commitment to strengthening bilateral relations.",
    body: [
      "[Head of Mission Name] on [Date] presented Letters of Credence to His Excellency the Head of State of [Host Country] at a formal ceremony in [City].",
      "Speaking after the ceremony, the Head of Mission conveyed the warm greetings of the President of the Federal Republic of Nigeria and reaffirmed Nigeria's commitment to deepening the longstanding ties of friendship and cooperation between the two countries.",
      "Discussions covered trade and investment, educational exchange and the welfare of the Nigerian community in [Host Country]. Both sides agreed to convene the next session of the bilateral joint commission at an early date.",
    ],
  },
  {
    slug: "consular-outreach-programme-announced",
    title: "Mission Announces Quarterly Consular Outreach Programme",
    category: "Press Release",
    date: "2026-05-15",
    department: "Consular Section",
    excerpt:
      "Nigerians resident outside [City] will be able to access passport biometric capture and NIN enrolment at regional outreach centres each quarter.",
    body: [
      "The [Mission Name] is pleased to announce a quarterly consular outreach programme to bring passport biometric capture, NIN enrolment and general consular services closer to Nigerians living outside [City].",
      "The first outreach will hold on [Date] at [Venue]. Eligible applicants must complete their applications online before attending and should bring all supporting documents listed on the Mission's website.",
      "Dates and venues for subsequent outreach sessions will be published on this website and on the Mission's official social media channels.",
    ],
  },
  {
    slug: "national-day-address",
    title: "Address by the Head of Mission on Nigeria's Independence Anniversary",
    category: "Speech",
    date: "2026-05-02",
    department: "Office of the Head of Mission",
    excerpt:
      "Full text of the Head of Mission's address at the celebration of Nigeria's Independence Anniversary in [City].",
    body: [
      "Distinguished guests, members of the Nigerian community, ladies and gentlemen — it is my honour to welcome you to this celebration of the independence of the Federal Republic of Nigeria.",
      "Today we celebrate not only the history of our great nation, but the achievements of Nigerians here in [Host Country] — in business, in academia, in healthcare and in the arts — who represent the very best of our country.",
      "The Mission remains committed to serving every Nigerian in [Host Country] with dignity and efficiency, and to building a partnership with [Host Country] that delivers prosperity for both our peoples. Long live the Federal Republic of Nigeria.",
    ],
  },
  {
    slug: "statement-on-travel-documentation",
    title: "Official Statement on the Use of Valid Travel Documentation",
    category: "Official Statement",
    date: "2026-04-20",
    department: "Consular Section",
    excerpt:
      "The Mission reminds all Nigerian citizens of the requirement to travel on valid Nigerian passports and warns against the use of intermediaries.",
    body: [
      "The [Mission Name] reminds all Nigerian citizens in [Host Country] that travel to and from Nigeria requires a valid Nigerian passport or, in emergencies, an Emergency Travel Certificate issued by the Mission.",
      "The Mission has received reports of unaccredited intermediaries offering passport and visa 'fast-track' services for a fee. Members of the public are advised that all applications are made directly through official online portals, and that no third party can influence processing times.",
      "Any person who encounters such solicitation is encouraged to report it to the Mission at [Official Email].",
    ],
  },
  {
    slug: "trade-mission-roundtable",
    title: "Mission Hosts Nigeria–[Host Country] Trade and Investment Roundtable",
    category: "Mission Activity",
    date: "2026-04-08",
    department: "Trade and Investment Section",
    excerpt:
      "Business leaders from both countries met at the Mission to explore opportunities in agriculture, energy, technology and the creative economy.",
    body: [
      "The Mission on [Date] hosted a trade and investment roundtable bringing together over [Number] business leaders, investors and trade officials from Nigeria and [Host Country].",
      "Sessions focused on opportunities in agriculture and agro-processing, renewable energy, digital technology and Nigeria's fast-growing creative economy, alongside practical guidance on market entry and investment protection.",
      "The Mission's Trade and Investment Section provides year-round support to investors. Interested companies may contact the Mission at [Official Email].",
    ],
  },
  {
    slug: "diaspora-town-hall",
    title: "Head of Mission Holds Town Hall with the Nigerian Community",
    category: "Mission Activity",
    date: "2026-03-22",
    department: "Diaspora Engagement Unit",
    excerpt:
      "Community leaders and residents discussed consular service delivery, community welfare and diaspora participation in national development.",
    body: [
      "[Head of Mission Name] hosted a town hall meeting with members of the Nigerian community in [City], attended by community association leaders, professionals and students.",
      "Topics included improvements to passport processing, the Mission's new appointment system, voter registration for eligible Nigerians abroad and opportunities for diaspora investment in Nigeria.",
      "The Head of Mission thanked the community for its continued good conduct and contribution to [Host Country], and pledged regular engagement through quarterly town hall meetings.",
    ],
  },
];

export function getNewsItem(slug: string): NewsItem | undefined {
  return news.find((n) => n.slug === slug);
}

export function formatDate(iso: string): string {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
