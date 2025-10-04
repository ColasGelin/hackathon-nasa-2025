import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Urban Heat Monitor | NASA Space Apps Challenge",
  description: "Satellite intelligence to fight urban heat islands. AI solution for resilient cities using Landsat, Sentinel-2 and MODIS data.",
  keywords: ["urban heat islands", "NASA", "satellites", "urban planning", "artificial intelligence", "Landsat", "Sentinel-2"],
  authors: [{ name: "NASA Space Apps Challenge Team" }],
  openGraph: {
    title: "Urban Heat Monitor - Fighting Urban Heat Islands",
    description: "Satellite intelligence for resilient cities",
    type: "website",
  },
  robots: "index, follow",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
