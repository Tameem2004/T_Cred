import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import '@rainbow-me/rainbowkit/styles.css';
import "./globals.css";
import Provider from "@/providers";
import NavBar from "@/components/NavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "T_Cred",
  description: "BNPL Platform",
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
        <Provider>
        <NavBar />
        {children}
        </Provider>
      </body>
    </html>
  );
}
