"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import StarBackground from "@/components/StarBackground";
import { motion } from "framer-motion";

export default function ProductsPage() {
  return (
    <main className="min-h-screen flex flex-col relative bg-transparent overflow-hidden">
      <StarBackground />
      <Navbar />
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex-grow pt-32 pb-12 relative z-10"
      >
        <ProductGrid />
      </motion.div>
      
      <Footer />
    </main>
  );
}
