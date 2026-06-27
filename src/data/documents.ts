import { wpQuery, isWpConfigured } from "@/lib/wp";

export type DocCategory = "visa" | "passport" | "authentication" | "general";

export interface ConsularDocument {
  id: string;
  title: string;
  description: string;
  category: DocCategory;
  filename: string; // relative to /docs/
  sizeKb: number;
  rev: string;
}

export const docCategories: { value: DocCategory | "all"; label: string }[] = [
  { value: "all", label: "All Documents" },
  { value: "visa", label: "Visa" },
  { value: "passport", label: "Passport & Travel" },
  { value: "authentication", label: "Authentication" },
  { value: "general", label: "General" },
];

// Static fallback — used when WORDPRESS_URL is not set or WP is unreachable.
export const documents: ConsularDocument[] = [
  {
    id: "visa-application-form",
    title: "Visa Application Form (Form 16)",
    description:
      "Standard application form for tourist, business, and transit visa categories.",
    category: "visa",
    filename: "visa-application-form.pdf",
    sizeKb: 156,
    rev: "Jan 2026",
  },
  {
    id: "consular-fee-schedule",
    title: "Consular Fee Schedule 2026",
    description:
      "Current fee schedule for all consular services including visa, passport, and notarisation.",
    category: "general",
    filename: "consular-fee-schedule.pdf",
    sizeKb: 88,
    rev: "Feb 2026",
  },
  {
    id: "passport-renewal-form",
    title: "Passport Renewal Application",
    description:
      "Form for Nigerian citizens renewing a standard or official passport abroad.",
    category: "passport",
    filename: "passport-renewal-form.pdf",
    sizeKb: 120,
    rev: "Mar 2026",
  },
  {
    id: "emergency-travel-cert",
    title: "Emergency Travel Certificate Application",
    description:
      "Application for an Emergency Travel Certificate (ETC) for citizens who have lost their passport.",
    category: "passport",
    filename: "emergency-travel-cert.pdf",
    sizeKb: 74,
    rev: "Nov 2025",
  },
  {
    id: "document-auth-form",
    title: "Document Authentication / Legalisation Request",
    description:
      "Request form for authentication of Nigerian-issued documents for use in Japan.",
    category: "authentication",
    filename: "document-authentication-form.pdf",
    sizeKb: 64,
    rev: "Sep 2025",
  },
  {
    id: "citizen-registration-form",
    title: "Nigerian Citizen Registration Form",
    description:
      "Form for Nigerians resident in Japan to register with the Mission for consular assistance.",
    category: "general",
    filename: "citizen-registration-form.pdf",
    sizeKb: 52,
    rev: "Jan 2026",
  },
];

// ── WordPress ────────────────────────────────────────────────────────────────

type WPDocument = {
  slug: string;
  title: string;
  documentFields: {
    description: string;
    category: string;
    filename: string;
    sizeKb: number;
    rev: string;
  };
};

const DOCUMENTS_QUERY = /* GraphQL */ `
  query GetDocuments {
    consularDocuments(
      first: 100
      where: { status: PUBLISH, orderby: { field: MENU_ORDER, order: ASC } }
    ) {
      nodes {
        slug
        title
        documentFields {
          description
          category
          filename
          sizeKb
          rev
        }
      }
    }
  }
`;

function mapDocument(wp: WPDocument): ConsularDocument {
  return {
    id: wp.slug,
    title: wp.title,
    description: wp.documentFields.description,
    category: wp.documentFields.category as DocCategory,
    filename: wp.documentFields.filename,
    sizeKb: wp.documentFields.sizeKb,
    rev: wp.documentFields.rev,
  };
}

export async function getDocuments(): Promise<ConsularDocument[]> {
  if (!isWpConfigured()) return documents;
  try {
    const data = await wpQuery<{ consularDocuments: { nodes: WPDocument[] } }>(DOCUMENTS_QUERY);
    return data.consularDocuments.nodes.map(mapDocument);
  } catch {
    return documents;
  }
}

