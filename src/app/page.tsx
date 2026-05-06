"use client";

import Navbar from "@/components/Navbar";
import Hero3D from "@/components/Hero3D";
import ProductGrid from "@/components/ProductGrid";
import InfoSection from "@/components/InfoSection";
import WhyUsSection from "@/components/WhyUsSection";
import FAQSection from "@/components/FAQSection";
import TrustSection from "@/components/TrustSection";
import NewsletterSection from "@/components/NewsletterSection";
import MetricsSection from "@/components/MetricsSection";
import Footer from "@/components/Footer";
import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const checkMobile = () => setIsMobile(window.innerWidth < 768);
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }
  }, [mounted]);

  const isDark = mounted ? theme === "dark" : true; // Assuming dark is default to match layout

  return (
    <main className="min-h-screen relative flex flex-col transition-colors duration-1000 overflow-x-hidden pb-28 md:pb-0">
      <Navbar />
      
      {/* Decorative Background Blobs */}
      <div className="fixed inset-0 pointer-events-none z-[-1] transition-opacity duration-1000">
        <div 
          className={`blob -top-[10%] -left-[10%] transition-opacity duration-1000 ${mounted ? (isDark ? "opacity-40" : "opacity-20") : "opacity-0"}`} 
          style={{ background: isDark ? "radial-gradient(circle, #3b82f6 0%, transparent 70%)" : "radial-gradient(circle, #93c5fd 0%, transparent 70%)" }} 
        />
        <div 
          className={`blob top-[40%] -right-[10%] transition-opacity duration-1000 ${mounted ? (isDark ? "opacity-30" : "opacity-15") : "opacity-0"}`} 
          style={{ animationDelay: "-5s", background: isDark ? "radial-gradient(circle, #6366f1 0%, transparent 70%)" : "radial-gradient(circle, #c7d2fe 0%, transparent 70%)" }} 
        />
        <div 
          className={`blob -bottom-[10%] left-[20%] transition-opacity duration-1000 ${mounted ? (isDark ? "opacity-30" : "opacity-15") : "opacity-0"}`} 
          style={{ animationDelay: "-10s", background: isDark ? "radial-gradient(circle, #06b6d4 0%, transparent 70%)" : "radial-gradient(circle, #a5f3fc 0%, transparent 70%)" }} 
        />
      </div>



      {/* Hero Section */}
      <section className="hero-section relative min-h-[90vh] md:h-screen flex items-center justify-center overflow-hidden py-16 sm:py-24 lg:py-32">
        <div className="relative z-10 text-center px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
          >
            <span className={`inline-block px-5 py-2.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.4em] mb-6 sm:mb-10 border ${
              isDark ? "bg-blue-500/10 text-blue-400 border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.3)]" : "bg-white text-blue-600 border-blue-100 shadow-[0_10px_20px_rgba(37,99,235,0.1)]"
            }`}>
              Intelligence for Modern Medicine
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
            className={`hero-title text-4xl sm:text-6xl md:text-8xl lg:text-[11rem] font-black tracking-tighter mb-8 sm:mb-12 lg:mb-16 leading-[0.95] sm:leading-[0.8] transition-all duration-1000 ${
              isDark ? "text-white drop-shadow-[0_20px_60px_rgba(0,0,0,0.8)]" : "text-slate-900 drop-shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
            }`}
          >
            <span className={isDark ? "text-cyan-400" : "text-blue-600"}>BIO</span><span className={isDark ? "text-white" : "text-slate-900"}>TECH</span> <br className="hidden sm:block"/>
            <span className={`text-transparent bg-clip-text bg-gradient-to-r transition-all duration-1000 animate-gradient ${
              isDark ? "from-cyan-400 via-blue-500 to-indigo-400" : "from-blue-600 via-indigo-700 to-blue-800"
            }`}>FUTURE</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.33, 1, 0.68, 1] }}
            className={`text-lg sm:text-xl md:text-2xl lg:text-3xl mb-12 sm:mb-16 max-w-3xl mx-auto font-medium leading-relaxed transition-colors duration-1000 ${
              isDark ? "text-slate-300/80" : "text-slate-500"
            }`}
          >
            Engineering the next generation of clinical ecosystems through neural-link diagnostics. 
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.33, 1, 0.68, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 lg:gap-12"
          >
            <motion.a 
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              animate={{ 
                y: [0, -5, 0],
              }}
              transition={{ 
                y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 0.2 },
                default: { duration: 0.5 }
              }}
              href="#products" 
              className={`w-full sm:w-auto px-8 sm:px-12 lg:px-16 py-4 sm:py-6 lg:py-8 rounded-[1.5rem] sm:rounded-[2.5rem] font-black uppercase tracking-[0.25em] transition-all duration-500 flex items-center justify-center gap-4 group/btn shimmer-btn ${
                isDark 
                  ? "bg-blue-600 text-white shadow-[0_25px_50px_-12px_rgba(37,99,235,0.5)]" 
                  : "bg-blue-600 text-white shadow-[0_20px_40px_-10px_rgba(37,99,235,0.3)] hover:bg-blue-700"
              }`}
            >
              Start Trial <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover/btn:translate-x-3 transition-transform duration-500" />
            </motion.a>
            
            <Link 
              href="/science"
              className={`w-full sm:w-auto px-8 sm:px-12 lg:px-16 py-4 sm:py-6 lg:py-8 rounded-[1.5rem] sm:rounded-[2.5rem] font-black uppercase tracking-[0.25em] transition-all duration-500 flex items-center justify-center gap-4 border backdrop-blur-3xl ${
                isDark 
                  ? "bg-white/5 text-white border-white/10 hover:bg-white/10" 
                  : "bg-white text-slate-900 border-slate-200 shadow-2xl shadow-slate-200/50 hover:bg-slate-50"
              }`}
            >
              The Science <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
            </Link>
          </motion.div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1.5 }}
          className={`absolute bottom-12 left-12 z-10 transition-colors duration-1000 hidden sm:block ${isDark ? "text-blue-500/30" : "text-slate-300"}`}
        >
          <div className="flex flex-col items-center gap-6">
            <span className="text-[12px] font-black uppercase tracking-[0.4em] rotate-180 [writing-mode:vertical-lr]">Discover</span>
            <div className={`w-[1px] h-32 transition-colors duration-1000 ${isDark ? "bg-gradient-to-b from-blue-500/30 to-transparent" : "bg-gradient-to-b from-slate-200 to-transparent"}`}>
              <motion.div 
                animate={{ y: [0, 128, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className={`w-full h-12 ${isDark ? "bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,1)]" : "bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.5)]"}`}
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Main Content Sections with Reveal Animation */}
      <div className="relative z-10">
        {[
          { component: <InfoSection />, id: "info" },
          { component: <MetricsSection />, id: "metrics" },
          { component: <TrustSection />, id: "trust" },
          { component: <WhyUsSection />, id: "why" },
          { component: <ProductGrid />, id: "products" },
          { component: <FAQSection />, id: "faq" },
          { component: <NewsletterSection />, id: "newsletter" }
        ].map((item, i) => (
          <motion.section 
            key={item.id}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileTap={{ scale: 0.995 }} // Subtle tap feedback for whole sections
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
            className="relative"
          >
            {item.component}
          </motion.section>
        ))}
        <Footer />
      </div>
    </main>
  );
}
