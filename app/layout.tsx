import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GeoGrid SL",
  description: "A visual representation of the SriLanka district map",
  icons: {
    icon: [
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/logo.png', url: '/logo.png' }
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
