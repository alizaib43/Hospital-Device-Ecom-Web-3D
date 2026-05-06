import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about MediTech Pro — a global leader in next-generation medical devices. We specialize in high-precision diagnostic imaging, AI-powered clinical systems, and advanced surgical instruments trusted by 142+ hospitals worldwide.",
  openGraph: {
    title: "About MediTech Pro | Our Mission & Innovation",
    description:
      "Transforming global healthcare through innovation, reliability, and impact. Discover the team behind the world's most advanced medical equipment.",
    url: "https://alizaib43.github.io/Hospital-Device-Ecom-Web-3D/about",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
