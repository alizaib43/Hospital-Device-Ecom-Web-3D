"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Footer() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <footer className="bg-transparent border-t border-border pt-20 sm:pt-28 lg:pt-36 pb-12 sm:pb-20 relative z-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-12 sm:gap-16 mb-16 sm:mb-24">
          <div className="md:col-span-4">
            <h3 className="font-black text-2xl tracking-tighter text-foreground mb-6 sm:mb-8">
              MEDI<span className="text-blue-500">TECH</span>
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6 sm:mb-8 font-medium text-sm sm:text-base">
              We are defining the next era of medical diagnostics. Our mission is to empower healthcare providers with the most precise tools ever engineered.
            </p>
            <div className="flex gap-4">
              {["Twitter", "LinkedIn", "Instagram"].map((social) => (
                <motion.a
                  key={social}
                  whileHover={{ scale: 1.1, y: -2 }}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center text-muted-foreground hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all duration-300"
                >
                  <span className="sr-only">{social}</span>
                  <div className="w-5 h-5 bg-current mask-icon" />
                </motion.a>
              ))}
            </div>
          </div>
          
          <div className="md:col-span-2">
            <h4 className="font-black text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.3em] text-foreground mb-6 sm:mb-8">Solutions</h4>
            <ul className="space-y-3 sm:space-y-4">
              {["Imaging", "Robotics", "Cardiology", "Diagnostics"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-muted-foreground hover:text-blue-500 text-sm font-bold transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-black text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.3em] text-foreground mb-6 sm:mb-8">Company</h4>
            <ul className="space-y-3 sm:space-y-4">
              {["About", "Global Ops", "Clinical Trial", "Careers"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-muted-foreground hover:text-blue-500 text-sm font-bold transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="font-black text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.3em] text-foreground mb-6 sm:mb-8">Clinical HQ</h4>
            <p className="text-muted-foreground text-sm font-bold mb-4">
              100 Innovation Plaza, Suite 400<br/>
              Palo Alto, CA 94304
            </p>
            <p className="text-blue-500 text-sm font-black">
              contact@meditech-dummy.com<br/>
              +92 300 000 0000
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.15em] text-muted-foreground/80">
            {"\u00A9"} {mounted ? new Date().getFullYear() : 2026} MEDITECHPRO SYSTEMS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6 sm:gap-8">
            <a href="#" className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-muted-foreground/80 hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-muted-foreground/80 hover:text-foreground transition-colors">Compliance</a>
            <a href="#" className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-muted-foreground/80 hover:text-foreground transition-colors">Ethics</a>
          </div>
        </div>
        {/* Creator Credit */}
        <div className="mt-6 pt-6 border-t border-border/30 text-center">
          <p className="text-[10px] sm:text-xs font-bold text-muted-foreground/50 tracking-widest">
            Crafted with <span className="text-red-500">♥</span> by{" "}
            <span className="text-blue-400 font-black uppercase tracking-[0.15em] hover:text-blue-300 transition-colors cursor-default">Alizaib</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
