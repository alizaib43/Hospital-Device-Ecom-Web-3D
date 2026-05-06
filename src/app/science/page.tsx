import type { Metadata } from "next";
import ScienceClient from "./ScienceClient";

export const metadata: Metadata = {
  title: "Clinical Science & Engineering",
  description:
    "Explore the science behind MediTech Pro's medical devices. Learn about our neural-link algorithms, bio-sensor integration, and aerospace-grade materials used in MRI, X-Ray, and Surgical Robotics.",
  openGraph: {
    title: "The Science of MediTech Pro | Medical Engineering",
    description:
      "Deep dive into the technology powering the next generation of clinical ecosystems. Rigorous research, AI-assisted diagnostics, and precision engineering.",
    url: "https://alizaib43.github.io/Hospital-Device-Ecom-Web-3D/science",
  },
};

export default function SciencePage() {
  return <ScienceClient />;
}
