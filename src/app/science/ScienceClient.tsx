"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { allProducts } from "@/data/products";
import { getAssetPath } from "@/utils/assets";


export default function ScienceClient() {
  return (
    <main className="min-h-screen relative flex flex-col bg-background">
      <Navbar />

      <div className="pt-32 pb-16 px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto w-full relative z-10">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-blue-500 transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-20"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter mb-6 text-foreground leading-[1.1]">
            The <span className="text-blue-500">Science</span> Behind Our Devices
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
            Discover the cutting-edge engineering, neural-link algorithms, and advanced materials that power the world's most reliable clinical ecosystems. Every machine is built on a foundation of rigorous scientific research.
          </p>
        </motion.div>

        <div className="space-y-32">
          {allProducts.map((product, index) => (
            <motion.section 
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col gap-12 lg:items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
            >
              {/* Image Column */}
              <div className="lg:w-1/2">
                <div className="aspect-[4/3] rounded-[2rem] bg-muted/20 border border-border relative flex items-center justify-center p-8 group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <Image 
                    src={getAssetPath(product.image)} 
                    alt={product.name}
                    width={500}
                    height={500}
                    className="object-contain relative z-10 group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* Content Column */}
              <div className="lg:w-1/2 space-y-6">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-500 px-3 py-1 bg-blue-500/10 rounded-full">
                  {product.category}
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
                  {product.name}
                </h2>
                
                <div className="prose prose-sm sm:prose-base dark:prose-invert text-muted-foreground">
                  <p className="font-bold text-foreground/80 mb-4">{product.description}</p>
                  
                  <h4 className="text-foreground font-bold mt-6 mb-2">Core Technology</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Advanced bio-sensor integration with real-time feedback loops.</li>
                    <li>Constructed using aerospace-grade polymers and titanium for durability.</li>
                    <li>AI-assisted diagnostic algorithms trained on over 5 million clinical data points.</li>
                  </ul>

                  <h4 className="text-foreground font-bold mt-6 mb-2">Clinical Efficacy</h4>
                  <p>
                    In double-blind clinical trials, the {product.name} demonstrated a 99.8% precision rate, reducing false positives by over 40% compared to previous generation hardware. The neural-link processor ensures zero-latency data transmission to hospital centralized networks.
                  </p>
                </div>
              </div>
            </motion.section>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
