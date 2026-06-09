import type { Metadata } from "next";
import { Public_Sans, Source_Serif_4 } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { site } from "@/lib/site";
import "./globals.css";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.missionName} — ${site.city}, ${site.hostCountry}`,
    template: `%s | ${site.missionName}`,
  },
  description: `Official website of the ${site.missionName} in ${site.city}, ${site.hostCountry}. Visa and passport services, consular assistance, public notices and Nigeria–${site.hostCountry} relations.`,
  openGraph: {
    type: "website",
    siteName: site.missionName,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GovernmentOrganization",
  name: site.missionName,
  url: site.url,
  email: site.email,
  telephone: site.phones[0],
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address,
    addressLocality: site.city,
    addressCountry: site.hostCountry,
  },
  parentOrganization: {
    "@type": "GovernmentOrganization",
    name: "Ministry of Foreign Affairs, Federal Republic of Nigeria",
    url: "https://foreignaffairs.gov.ng",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${publicSans.variable} ${sourceSerif.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <BackToTop />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
