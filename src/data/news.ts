import { wpQuery, isWpConfigured, parseAcfDate } from "@/lib/wp";

export type NewsCategory =
  | "News"
  | "Press Release"
  | "Speech"
  | "Official Statement"
  | "Mission Activity";

export interface NewsImage {
  src: string;
  alt: string;
  credit: string;
}

export interface NewsItem {
  slug: string;
  title: string;
  category: NewsCategory;
  date: string; // ISO date
  department: string;
  excerpt: string;
  body: string[];
  image: NewsImage;
}

export const newsCategories: NewsCategory[] = [
  "News",
  "Press Release",
  "Speech",
  "Official Statement",
  "Mission Activity",
];

const unsplash = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

// Static fallback — used when WORDPRESS_URL is not set or WP is unreachable.
export const news: NewsItem[] = [
  {
    slug: "presentation-of-letters-of-credence",
    title: "H.E. (Dr) Adaeze N. Okonkwo Presents Letters of Credence",
    category: "News",
    date: "2026-05-28",
    department: "Office of the Head of Mission",
    excerpt:
      "The Head of Mission formally presented Letters of Credence to the Head of State of Japan, reaffirming Nigeria's commitment to strengthening bilateral relations.",
    body: [
      "H.E. (Dr) Adaeze N. Okonkwo on 26 May 2026 presented Letters of Credence to His Excellency the Head of State of Japan at a formal ceremony in Tokyo.",
      "Speaking after the ceremony, the Head of Mission conveyed the warm greetings of the President of the Federal Republic of Nigeria and reaffirmed Nigeria's commitment to deepening the longstanding ties of friendship and cooperation between the two countries.",
      "Discussions covered trade and investment, educational exchange and the welfare of the Nigerian community in Japan. Both sides agreed to convene the next session of the bilateral joint commission at an early date.",
    ],
    image: {
      src: unsplash("1521791136064-7986c2920216"),
      alt: "Two officials exchanging a formal handshake at a ceremony",
      credit: "Photo: Unsplash — placeholder, replace with official ceremony photography",
    },
  },
  {
    slug: "consular-outreach-programme-announced",
    title: "Embassy Announces Quarterly Consular Outreach Programme",
    category: "Press Release",
    date: "2026-05-15",
    department: "Consular Section",
    excerpt:
      "Nigerians resident outside Tokyo will be able to access passport biometric capture and NIN enrolment at regional outreach centres each quarter.",
    body: [
      "The Embassy of Nigeria in Tokyo is pleased to announce a quarterly consular outreach programme to bring passport biometric capture, NIN enrolment and general consular services closer to Nigerians living outside Tokyo.",
      "The first outreach will hold on Saturday 18 July 2026 at the Casa de la Amistad, Osaka. Eligible applicants must complete their applications online before attending and should bring all supporting documents listed on the Embassy's website.",
      "Dates and venues for subsequent outreach sessions will be published on this website and on the Embassy's official social media channels.",
    ],
    image: {
      src: unsplash("1529156069898-49953e39b3ac"),
      alt: "Members of a community gathered together outdoors",
      credit: "Photo: Unsplash — placeholder, replace with Mission outreach photography",
    },
  },
  {
    slug: "national-day-address",
    title: "Address by the Head of Mission on Nigeria's Independence Anniversary",
    category: "Speech",
    date: "2026-05-02",
    department: "Office of the Head of Mission",
    excerpt:
      "Full text of the Head of Mission's address at the celebration of Nigeria's Independence Anniversary in Tokyo.",
    body: [
      "Distinguished guests, members of the Nigerian community, ladies and gentlemen — it is my honour to welcome you to this celebration of the independence of the Federal Republic of Nigeria.",
      "Today we celebrate not only the history of our great nation, but the achievements of Nigerians here in Japan — in business, in academia, in healthcare and in the arts — who represent the very best of our country.",
      "The Embassy remains committed to serving every Nigerian in Japan with dignity and efficiency, and to building a partnership with Japan that delivers prosperity for both our peoples. Long live the Federal Republic of Nigeria.",
    ],
    image: {
      src: unsplash("1475721027785-f74eccf877e2"),
      alt: "A speaker addressing an audience from a podium with a microphone",
      credit: "Photo: Unsplash — placeholder, replace with event photography",
    },
  },
  {
    slug: "statement-on-travel-documentation",
    title: "Official Statement on the Use of Valid Travel Documentation",
    category: "Official Statement",
    date: "2026-04-20",
    department: "Consular Section",
    excerpt:
      "The Embassy reminds all Nigerian citizens of the requirement to travel on valid Nigerian passports and warns against the use of intermediaries.",
    body: [
      "The Embassy of Nigeria in Tokyo reminds all Nigerian citizens in Japan that travel to and from Nigeria requires a valid Nigerian passport or, in emergencies, an Emergency Travel Certificate issued by the Embassy.",
      "The Embassy has received reports of unaccredited intermediaries offering passport and visa 'fast-track' services for a fee. Members of the public are advised that all applications are made directly through official online portals, and that no third party can influence processing times.",
      "Any person who encounters such solicitation is encouraged to report it to the Embassy at info.Tokyo@foreignaffairs.gov.ng.",
    ],
    image: {
      src: unsplash("1488646953014-85cb44e25828"),
      alt: "A traveller's documents and map laid out before a journey",
      credit: "Photo: Unsplash — placeholder",
    },
  },
  {
    slug: "trade-mission-roundtable",
    title: "Embassy Hosts Nigeria–Japan Trade and Investment Roundtable",
    category: "Mission Activity",
    date: "2026-04-08",
    department: "Trade and Investment Section",
    excerpt:
      "Business leaders from both countries met at the Embassy to explore opportunities in agriculture, energy, technology and the creative economy.",
    body: [
      "The Embassy on 6 April 2026 hosted a trade and investment roundtable bringing together over 60 business leaders, investors and trade officials from Nigeria and Japan.",
      "Sessions focused on opportunities in agriculture and agro-processing, renewable energy, digital technology and Nigeria's fast-growing creative economy, alongside practical guidance on market entry and investment protection.",
      "The Embassy's Trade and Investment Section provides year-round support to investors. Interested companies may contact the Embassy at info.Tokyo@foreignaffairs.gov.ng.",
    ],
    image: {
      src: unsplash("1556761175-5973dc0f32e7"),
      alt: "Business delegates in discussion around a meeting table",
      credit: "Photo: Unsplash — placeholder, replace with Mission event photography",
    },
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
      "H.E. (Dr) Adaeze N. Okonkwo hosted a town hall meeting with members of the Nigerian community in Tokyo, attended by community association leaders, professionals and students.",
      "Topics included improvements to passport processing, the Embassy's new appointment system, voter registration for eligible Nigerians abroad and opportunities for diaspora investment in Nigeria.",
      "The Head of Mission thanked the community for its continued good conduct and contribution to Japan, and pledged regular engagement through quarterly town hall meetings.",
    ],
    image: {
      src: unsplash("1540575467063-178a50c2df87"),
      alt: "An audience seated at a community town hall meeting",
      credit: "Photo: Unsplash — placeholder, replace with Mission event photography",
    },
  },
];

export function formatDate(iso: string): string {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ── WordPress ────────────────────────────────────────────────────────────────

type WPNewsItem = {
  slug: string;
  title: string;
  newsArticleFields: {
    category: NewsCategory;
    newsDate: string;
    department: string;
    excerpt: string;
    body: { text: string }[];
    image: { node: { sourceUrl: string; altText: string } } | null;
    imageCredit: string;
  };
};

const NEWS_QUERY = /* GraphQL */ `
  query GetNews {
    newsArticles(
      first: 100
      where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }
    ) {
      nodes {
        slug
        title
        newsArticleFields {
          category
          newsDate
          department
          excerpt
          body { text }
          image { node { sourceUrl altText } }
          imageCredit
        }
      }
    }
  }
`;

function mapNewsItem(wp: WPNewsItem): NewsItem {
  const f = wp.newsArticleFields;
  return {
    slug: wp.slug,
    title: wp.title,
    category: f.category,
    date: parseAcfDate(f.newsDate),
    department: f.department,
    excerpt: f.excerpt,
    body: f.body.map((b) => b.text),
    image: {
      src: f.image?.node.sourceUrl ?? "",
      alt: f.image?.node.altText ?? "",
      credit: f.imageCredit,
    },
  };
}

export async function getNews(): Promise<NewsItem[]> {
  if (!isWpConfigured()) return news;
  try {
    const data = await wpQuery<{ newsArticles: { nodes: WPNewsItem[] } }>(NEWS_QUERY);
    return data.newsArticles.nodes.map(mapNewsItem);
  } catch {
    return news;
  }
}

export async function getNewsItem(slug: string): Promise<NewsItem | undefined> {
  const all = await getNews();
  return all.find((n) => n.slug === slug);
}

