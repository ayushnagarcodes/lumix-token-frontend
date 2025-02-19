import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Providers } from "./_components/Providers";
import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";
import { config } from "./_lib/wagmiConfig";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lumix (LMX) Token",
  description:
    "Interact with the Lumix (LMX) ERC-20 token: mint, burn, transfer, approve, manage allowances, and more.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(
    config,
    (await headers()).get("cookie")
  );

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} relative text-base font-normal antialiased`}
      >
        <Providers initialState={initialState}>{children}</Providers>
      </body>
    </html>
  );
}
