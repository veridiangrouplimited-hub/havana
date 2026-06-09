import type { Metadata } from "next";
import { Suspense } from "react";
import PageHeader from "@/components/PageHeader";
import SearchResults from "@/components/SearchResults";

export const metadata: Metadata = {
  title: "Search",
  description: "Search consular services, public notices, news and pages on this website.",
};

export default function SearchPage() {
  return (
    <>
      <PageHeader
        title="Search"
        lead="Find consular services, public notices, news and information across this website."
        crumbs={[{ label: "Search" }]}
      />
      <div className="mx-auto max-w-4xl px-4 py-12">
        <Suspense fallback={<p className="text-sm text-ink/70">Loading search…</p>}>
          <SearchResults />
        </Suspense>
      </div>
    </>
  );
}
