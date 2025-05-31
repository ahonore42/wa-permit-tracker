import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Thurston County Permit Tracker",
  description:
    "Track building permits and deadlines across Thurston County and all 6 cities. Never miss a permit deadline again with automated alerts and SB5290 compliance checking.",
  keywords: [
    "Thurston County",
    "building permits",
    "deadline tracking",
    "SB5290",
    "permit compliance",
  ],
  authors: [{ name: "Thurston County Permit Tracker" }],
  openGraph: {
    title: "Thurston County Permit Tracker",
    description:
      "Never miss a permit deadline again. Track permits across Thurston County with automated alerts.",
    type: "website",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
