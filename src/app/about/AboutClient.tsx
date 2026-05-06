"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarBackground from "@/components/StarBackground";
import { motion } from "framer-motion";

export default function AboutClient() {
  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden">
      <StarBackground />
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center pt-32 pb-12 px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl w-full text-center glass p-8 md:p-16 rounded-[2.5rem] border border-white/10 shadow-2xl"
        >
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-7xl font-bold mb-8 text-foreground tracking-tight"
          >
            About <span className="text-blue-500">MediTech Pro</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-12 max-w-3xl mx-auto"
          >
            Founded with the vision of transforming global healthcare, MediTech Pro is a leading provider of next-generation medical devices. We specialize in high-precision diagnostic imaging and advanced surgical instruments.
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              { title: "Innovation", desc: "Constantly pushing boundaries through AI and engineering." },
              { title: "Reliability", desc: "Building mission-critical equipment professionals can trust." },
              { title: "Impact", desc: "Serving hospitals worldwide with robust logistics." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                whileHover={{ y: -5, borderColor: "rgba(59, 130, 246, 0.5)" }}
                className="bg-background/40 p-8 rounded-3xl border border-white/5 backdrop-blur-md transition-colors"
              >
                <h3 className="text-xl font-bold mb-3 text-blue-500">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </main>
  );
}
