import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Icon from "@/components/Icon";
import NoticesList from "@/components/NoticesList";
import DocumentsList from "@/components/DocumentsList";
import { getNotices } from "@/data/notices";
import { getDocuments } from "@/data/documents";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Public Notices",
  description: `Official announcements, consular advisories, holiday notices and service updates from the ${site.missionName}.`,
};

export default async function PublicNoticesPage() {
  const [notices, documents] = await Promise.all([getNotices(), getDocuments()]);
  const sorted = [...notices].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <PageHeader
        title="Public Notices"
        lead="Official announcements, consular advisories, holiday notices and service updates. Filter by category or browse all notices below."
        crumbs={[{ label: "Public Notices" }]}
      />
      <div className="mx-auto max-w-4xl px-4 py-16">
        <NoticesList notices={sorted} />

        <div className="mt-10 rounded border-l-4 border-gold bg-mist p-6 text-sm leading-relaxed">
          <h2 className="mb-2 flex items-center gap-2 font-serif text-lg font-bold text-brand-deep">
            <Icon name="bell" className="h-5 w-5" />
            About these notices
          </h2>
          <p>
            Public notices are the Mission's official channel for time-sensitive announcements.
            For enquiries about any notice, contact the Mission at{" "}
            <a href={`mailto:${site.email}`} className="font-semibold text-brand underline">
              {site.email}
            </a>{" "}
            or call {site.phones[0]} during office hours.
          </p>
        </div>

        {/* Consular forms and documents */}
        <section aria-labelledby="docs-heading" className="mt-16">
          <h2
            id="docs-heading"
            className="mb-1 font-serif text-2xl font-bold text-brand-deep"
          >
            Consular Forms &amp; Documents
          </h2>
          <p className="mb-6 text-sm text-ink/65">
            Download official forms and fee schedules. Use the{" "}
            <strong className="font-semibold text-brand">View</strong> button to preview any
            document in your browser before downloading.
          </p>
          <DocumentsList documents={documents} />
          <p className="mt-5 text-xs text-ink/45">
            Documents are provided in PDF format. Ensure your documents are signed and dated
            before submission. Contact the Mission if you require assistance completing any form.
          </p>
        </section>
      </div>
    </>
  );
}
