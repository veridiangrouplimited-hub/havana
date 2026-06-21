import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Icon from "@/components/Icon";
import NoticesList from "@/components/NoticesList";
import { notices } from "@/data/notices";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Public Notices",
  description: `Official announcements, consular advisories, holiday notices and service updates from the ${site.missionName}.`,
};

const sorted = [...notices].sort((a, b) => b.date.localeCompare(a.date));

export default function PublicNoticesPage() {
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
      </div>
    </>
  );
}
