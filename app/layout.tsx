import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lumix (LMX) Token",
  description:
    "Interact with the Lumix (LMX) ERC-20 token: mint, burn, transfer, approve, manage allowances, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} relative text-base font-normal antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
