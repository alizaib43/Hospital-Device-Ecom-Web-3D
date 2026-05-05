"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");

  return (
    <section className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
        <div className="glass p-8 sm:p-16 lg:p-24 rounded-[2rem] sm:rounded-[3rem] border border-blue-500/10 relative overflow-hidden group shadow-[0_20px_50px_-20px_rgba(37,99,235,0.2)]">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 group-hover:animate-shimmer pointer-events-none" />
          
          <div className="text-center relative z-10">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 text-foreground tracking-tighter"
            >
              Stay Ahead of <br className="hidden sm:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">Clinical Innovation</span>
            </motion.h2>
            <p className="text-muted-foreground text-base sm:text-lg mb-8 sm:mb-10 max-w-2xl mx-auto">
              Join 50,000+ medical professionals receiving weekly insights on advanced diagnostic technology.
            </p>
            
            <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Hospital Email Address" 
                className="flex-1 px-6 py-4 rounded-xl sm:rounded-2xl bg-muted/50 border border-border focus:outline-none focus:border-blue-500 transition-colors text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-8 py-4 rounded-xl sm:rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition-colors flex items-center justify-center gap-3 shadow-[0_10px_20px_rgba(37,99,235,0.2)]"
              >
                Join <Send className="w-4 h-4" />
              </motion.button>
            </form>
            <p className="mt-6 text-[9px] sm:text-[10px] text-muted-foreground/60 uppercase tracking-widest font-bold">
              Secure. Clinical. No Spam.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
