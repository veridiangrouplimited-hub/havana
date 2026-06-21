import { wpQuery, isWpConfigured, parseAcfDate } from "@/lib/wp";

export type NoticePriority =
  | "Urgent"
  | "Important"
  | "Advisory"
  | "Service Update"
  | "Holiday Notice";

export interface Notice {
  id: string;
  title: string;
  priority: NoticePriority;
  date: string; // ISO date
  body: string[];
}

export const noticePriorities: NoticePriority[] = [
  "Urgent",
  "Important",
  "Advisory",
  "Service Update",
  "Holiday Notice",
];

// Static fallback — used when WORDPRESS_URL is not set or WP is unreachable.
export const notices: Notice[] = [
  {
    id: "biometric-system-maintenance",
    title: "Scheduled Maintenance of Passport Biometric Capture System",
    priority: "Service Update",
    date: "2026-06-02",
    body: [
      "The passport biometric capture system will be unavailable on Monday 15 June 2026 due to scheduled maintenance by the Nigeria Immigration Service.",
      "Affected applicants will be contacted to reschedule their appointments at no additional cost. All other consular services will operate normally.",
    ],
  },
  {
    id: "eid-holiday-closure",
    title: "Public Holiday Closure — Eid-el-Kabir",
    priority: "Holiday Notice",
    date: "2026-05-26",
    body: [
      "The Mission will be closed on Wednesday 27 May 2026 in observance of Eid-el-Kabir. Normal services resume on Thursday 28 May 2026.",
      "For emergencies involving Nigerian citizens during the closure, please call the 24-hour emergency line: +53 5 280 9012.",
    ],
  },
  {
    id: "beware-of-fraudulent-agents",
    title: "Beware of Fraudulent Visa and Passport Agents",
    priority: "Important",
    date: "2026-05-12",
    body: [
      "The Mission is aware of individuals and websites falsely claiming to offer expedited Nigerian visa and passport services for a fee.",
      "All applications are made only through the official Nigeria Immigration Service portals. The Mission does not use agents and no third party can influence processing times. Report any solicitation to info.havana@foreignaffairs.gov.ng.",
    ],
  },
  {
    id: "travel-advisory-documentation",
    title: "Consular Advisory — Carry Valid Identification at All Times",
    priority: "Advisory",
    date: "2026-04-30",
    body: [
      "Nigerian citizens in Cuba are advised to carry valid identification at all times and to keep their residence documentation current, in line with host-country regulations.",
      "Citizens are also encouraged to register with the Mission so they can be reached quickly in an emergency.",
    ],
  },
  {
    id: "passport-collection-deadline",
    title: "Uncollected Passports — Collection Deadline",
    priority: "Important",
    date: "2026-04-18",
    body: [
      "Applicants whose passports were captured before 1 March 2026 and remain uncollected are requested to collect them on or before 31 July 2026.",
      "Bring your collection slip and valid identification. Passports uncollected after this date will be returned to the Nigeria Immigration Service in line with regulations.",
    ],
  },
  {
    id: "appointment-system-launch",
    title: "New Online Appointment System for Consular Services",
    priority: "Service Update",
    date: "2026-03-30",
    body: [
      "The Mission has introduced an online appointment system for all consular services to reduce waiting times.",
      "From 1 April 2026, walk-in submissions will be accepted only for emergencies. Book your appointment through the Contact page or at info.havana@foreignaffairs.gov.ng.",
    ],
  },
];

// ── WordPress ────────────────────────────────────────────────────────────────

type WPNotice = {
  slug: string;
  title: string;
  noticeFields: {
    priority: NoticePriority;
    noticeDate: string;
    body: { text: string }[];
  };
};

const NOTICES_QUERY = /* GraphQL */ `
  query GetNotices {
    notices(first: 100, where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }) {
      nodes {
        slug
        title
        noticeFields {
          priority
          noticeDate
          body { text }
        }
      }
    }
  }
`;

function mapNotice(wp: WPNotice): Notice {
  return {
    id: wp.slug,
    title: wp.title,
    priority: wp.noticeFields.priority,
    date: parseAcfDate(wp.noticeFields.noticeDate),
    body: wp.noticeFields.body.map((b) => b.text),
  };
}

export async function getNotices(): Promise<Notice[]> {
  if (!isWpConfigured()) return notices;
  try {
    const data = await wpQuery<{ notices: { nodes: WPNotice[] } }>(NOTICES_QUERY);
    return data.notices.nodes.map(mapNotice);
  } catch {
    return notices;
  }
}
