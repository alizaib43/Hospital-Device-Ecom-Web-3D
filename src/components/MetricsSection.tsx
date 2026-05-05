"use client";

import { motion } from "framer-motion";

export default function MetricsSection() {
  const stats = [
    { label: "Active Diagnostics", value: "12,842", sub: "+12% vs last hour", color: "text-blue-500", bg: "bg-blue-500" },
    { label: "Neural Precision", value: "99.98%", sub: "Validated Clinical", color: "text-green-500", bg: "bg-green-500" },
    { label: "Global Reach", value: "142", sub: "Hospitals Integrated", color: "text-purple-500", bg: "bg-purple-500" },
    { label: "System Uptime", value: "99.99%", sub: "Live Status: Optimal", color: "text-orange-500", bg: "bg-orange-500" }
  ];

  return (
    <section className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 lg:gap-12">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] bg-muted/20 border border-border/50 group hover:bg-muted/30 transition-all duration-700"
            >
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.4em] text-muted-foreground block mb-3 sm:mb-4">{stat.label}</span>
              <h3 className={`text-3xl sm:text-4xl font-black tracking-tighter mb-2 ${stat.color}`}>{stat.value}</h3>
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground/80">{stat.sub}</p>
              
              <div className="mt-5 sm:mt-6 h-1 w-full bg-border/30 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "70%" }}
                  transition={{ duration: 2, delay: 0.5 }}
                  className={`h-full ${stat.bg}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
