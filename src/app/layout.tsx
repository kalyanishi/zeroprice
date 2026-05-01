import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Zero Prize - For a Pollution-Free India",
  description: "A ₹5 Crore national innovation challenge rewarding real, independently verified solutions that make India's air, water, and land measurably cleaner for future generations.",
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    title: "Zero Prize - For a Pollution-Free India",
    description: "A ₹5 Crore national innovation challenge rewarding real, independently verified solutions that make India's air, water, and land measurably cleaner for future generations.",
    url: "https://www.zeroprize.org",
    siteName: "Zero Prize",
    images: [
      {
        url: "https://i.ibb.co/tMRCx27B/zeroprize-logo.png",
        width: 1200,
        height: 630,
        alt: "Zero Prize Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zero Prize - For a Pollution-Free India",
    description: "A ₹5 Crore national innovation challenge rewarding real, independently verified solutions that make India's air, water, and land measurably cleaner for future generations.",
    images: ["https://i.ibb.co/tMRCx27B/zeroprize-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${dmSans.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

