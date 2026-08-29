import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vicky Aditia | Data Scientist & Data Analyst Portfolio",
  description:
    "Portofolio profesional Vicky Aditia — Data Scientist & Data Analyst berpengalaman dalam optimasi energi industri, pemodelan Machine Learning, dan otomatisasi data.",
  openGraph: {
    title: "Vicky Aditia | Data Scientist & Data Analyst Portfolio",
    description:
      "Portofolio profesional Vicky Aditia — Data Scientist & Data Analyst berpengalaman dalam optimasi energi industri, pemodelan Machine Learning, dan otomatisasi data.",
    url: "https://vickyaditia.vercel.app",
    siteName: "Vicky Aditia Portfolio",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vicky Aditia Portfolio",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} ${spaceGrotesk.variable} scroll-smooth`}>
      <body className="bg-slate-950 text-slate-100 font-sans antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
