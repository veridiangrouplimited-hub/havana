import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import NewsList from "@/components/NewsList";
import { getNews } from "@/data/news";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "News",
  description: `Latest news, mission activities and updates from the ${site.missionName}.`,
};

export default async function NewsPage() {
  const news = await getNews();
  return (
    <>
      <PageHeader
        title="News"
        lead="Latest news and mission activities from the Embassy of Nigeria in Tokyo. Use the filters below to browse by category."
        crumbs={[{ label: "News & Press", href: "/news" }, { label: "News" }]}
      />
      <div className="mx-auto max-w-7xl px-4 py-16">
        <NewsList items={news} />
      </div>
    </>
  );
}
