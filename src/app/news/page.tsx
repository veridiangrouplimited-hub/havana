import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import NewsList from "@/components/NewsList";
import { getNews } from "@/data/news";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "News & Press Releases",
  description: `News, press releases, speeches, official statements and activities of the ${site.missionName}.`,
};

export default async function NewsPage() {
  const news = await getNews();
  return (
    <>
      <PageHeader
        title="News & Press Releases"
        lead="Official news, press releases, speeches, statements and activities of the Mission. Use the filters to find what you need."
        crumbs={[{ label: "News & Press" }]}
      />
      <div className="mx-auto max-w-7xl px-4 py-16">
        <NewsList items={news} />
      </div>
    </>
  );
}
