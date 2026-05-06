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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#050b1a" },
  ],
};

const siteUrl = "https://alizaib43.github.io/Hospital-Device-Ecom-Web-3D";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MediTech Pro | Premium Hospital Devices & Medical Equipment",
    template: "%s | MediTech Pro",
  },
  description:
    "MediTech Pro is a leading provider of next-generation hospital devices including MRI scanners, portable X-Ray systems, ultrasound machines, surgical robotics, and AI-powered patient monitors. Trusted by 142+ hospitals worldwide.",
  keywords: [
    "medical equipment",
    "hospital devices",
    "MRI scanner",
    "portable X-Ray",
    "ultrasound machine",
    "surgical robotics",
    "patient monitor",
    "medical technology",
    "clinical diagnostics",
    "healthcare procurement",
    "MediTech Pro",
  ],
  authors: [{ name: "MediTech Pro", url: siteUrl }],
  creator: "MediTech Pro",
  publisher: "MediTech Pro",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "MediTech Pro",
    title: "MediTech Pro | Premium Hospital Devices & Medical Equipment",
    description:
      "Engineering the next generation of clinical ecosystems. Advanced MRI, X-Ray, Ultrasound, and Surgical Robotics trusted by 142+ hospitals worldwide.",
    images: [
      {
        url: `${siteUrl}/mri_scanner_1777574926132.png`,
        width: 800,
        height: 800,
        alt: "MediTech Pro Quantum MRI 7T Scanner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MediTech Pro | Premium Hospital Devices",
    description:
      "Next-gen medical equipment for modern hospitals. MRI, X-Ray, Ultrasound, Robotics.",
    images: [`${siteUrl}/mri_scanner_1777574926132.png`],
  },
  alternates: {
    canonical: siteUrl,
  },
};

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MediTech Pro",
  url: siteUrl,
  logo: `${siteUrl}/favicon.ico`,
  description:
    "Leading provider of next-generation hospital devices and medical equipment including MRI scanners, X-Ray systems, ultrasound machines, and surgical robotics.",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-888-555-0123",
    contactType: "sales",
    email: "hq@meditechpro.systems",
    availableLanguage: "English",
  },
  sameAs: [
    "https://github.com/alizaib43/Hospital-Device-Ecom-Web-3D",
  ],
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
