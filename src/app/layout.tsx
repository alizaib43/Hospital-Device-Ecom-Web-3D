import React from "react";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CartProvider } from "@/context/CartContext";
import { UIProvider } from "@/context/UIContext";
import Chatbot from "@/components/Chatbot";
import Hero3D from "@/components/Hero3D";
import MobileNav from "@/components/MobileNav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "MediTech Pro | Premium Hospital Devices",
  description: "Advanced hospital devices and medical equipment including MRI, X-Ray, and Ultrasound machines.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body 
        className={`${geistSans.variable} ${geistMono.variable} min-h-full flex flex-col text-foreground overflow-x-hidden selection:bg-blue-500/30 antialiased`}
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
            <UIProvider>
              <Hero3D />
              {children}
              <Chatbot />
              <MobileNav />
            </UIProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
