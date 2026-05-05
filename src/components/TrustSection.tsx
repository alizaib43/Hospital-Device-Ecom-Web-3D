"use client";

import { motion } from "framer-motion";

export default function TrustSection() {
  const partners = [
    { name: "Mayo Clinic", logo: "MC" },
    { name: "Cleveland Clinic", logo: "CC" },
    { name: "Johns Hopkins", logo: "JH" },
    { name: "Mount Sinai", logo: "MS" },
    { name: "Stanford Health", logo: "SH" },
    { name: "Cedars-Sinai", logo: "CS" }
  ];

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-transparent border-y border-border/50">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        <p className="text-center text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-muted-foreground mb-10 sm:mb-12">
          Trusted by Global Healthcare Leaders
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 sm:gap-12 items-center opacity-60 sm:opacity-50 hover:opacity-100 transition-opacity duration-700">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="text-xl sm:text-2xl font-black text-foreground group-hover:text-blue-500 transition-colors duration-300">
                {partner.logo}
              </div>
              <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-widest mt-2 text-muted-foreground/50 group-hover:text-foreground transition-colors duration-300">
                {partner.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
