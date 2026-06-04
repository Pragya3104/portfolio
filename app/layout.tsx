import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://pragyajha.dev"),
  title: "Pragya Jha — AI & Full Stack Developer",
  description: "Building intelligent systems at the intersection of AI and software engineering.",
  openGraph: {
    title: "Pragya Jha — AI & Full Stack Developer",
    description: "Building intelligent systems at the intersection of AI and software engineering.",
    url: "https://pragyajha.dev",
    siteName: "Pragya Jha",
    images: [{ url: "/profile.jpg", width: 800, height: 800, alt: "Pragya Jha" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pragya Jha — AI & Full Stack Developer",
    description: "Building intelligent systems at the intersection of AI and software engineering.",
    images: ["/profile.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Syne:wght@400;700;800&family=Instrument+Serif:ital@0;1&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
