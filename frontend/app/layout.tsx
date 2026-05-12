import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "TLAA – Thai Logistics Association of Academics",
  description:
    "สมาคมโลจิสติกส์และซัพพลายเชนแห่งประเทศไทย – ศูนย์กลางความรู้และเครือข่ายด้านโลจิสติกส์",
  keywords: [
    "TLAA",
    "logistics",
    "supply chain",
    "Thailand",
    "สมาคมโลจิสติกส์",
  ],
  openGraph: {
    title: "TLAA – Thai Logistics Association of Academics",
    description:
      "ศูนย์กลางความรู้และเครือข่ายด้านโลจิสติกส์และซัพพลายเชนแห่งประเทศไทย",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
