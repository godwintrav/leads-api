import Interceptor from "@/components/provider/interceptor";
import AppProvider from "@/components/provider/Provider";
import { images } from "@/constants/image";
import { siteConfig } from "@/constants/site-config";
import { ServerCookies } from "@/lib/cookies.server";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.css";
import "./styles/nprogress.css";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter-sans",
});

export const metadata: Metadata = {
  title: {
    template: `%s - ${siteConfig.title}`,
    default: siteConfig.title,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: siteConfig.author,
      url: siteConfig.url,
    },
  ],
  creator: siteConfig.author,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    // images: [
    //   {
    //     // url: siteConfig.ogImage,
    //     width: 1200,
    //     height: 630,
    //     alt: siteConfig.name,
    //   },
    // ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    // images: [siteConfig.ogImage],
    creator: `@${siteConfig.title.toLocaleLowerCase()}`,
  },
  icons: {
    icon: images.logo.src,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = await ServerCookies.get("token");

  return (
    <html lang="en">
      <body className={` bg-[#FAF9F5] ${inter.variable} antialiased`}>
        <Interceptor token={token!}>
          <AppProvider>{children}</AppProvider>
        </Interceptor>
      </body>
    </html>
  );
}
