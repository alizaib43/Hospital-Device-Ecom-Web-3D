"use client";

import { ShieldCheck, Zap, Globe2, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function WhyUsSection() {
  const reasons = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-blue-500 group-hover:text-blue-400 transition-colors" />,
      title: "Uncompromising Quality",
      description: "Every device goes through rigorous testing to meet international clinical standards."
    },
    {
      icon: <Zap className="w-6 h-6 text-blue-500 group-hover:text-blue-400 transition-colors" />,
      title: "Cutting-Edge Technology",
      description: "We integrate the latest AI and sensor advancements to keep your facility ahead."
    },
    {
      icon: <Globe2 className="w-6 h-6 text-blue-500 group-hover:text-blue-400 transition-colors" />,
      title: "Global Support Network",
      description: "24/7 technical assistance and maintenance available worldwide."
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-500 group-hover:text-blue-400 transition-colors" />,
      title: "Rapid Deployment",
      description: "Streamlined logistics ensure your equipment is delivered and installed fast."
    }
  ];

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-10 sm:gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 glass p-6 sm:p-8 md:p-12 rounded-[2rem] sm:rounded-3xl"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-foreground">
              Why <span className="text-blue-500">Choose Us?</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg mb-6 sm:mb-8">
              In the medical field, reliability is not optional—it's mandatory. 
              We partner with top hospitals globally to provide infrastructure that saves lives, 
              optimizes workflows, and reduces operational downtime.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {reasons.map((reason, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-4 group cursor-pointer"
                >
                  <div className="mt-1 bg-blue-500/10 p-2 rounded-lg h-fit group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-300">
                    {reason.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1 group-hover:text-blue-500 transition-colors">{reason.title}</h4>
                    <p className="text-sm text-muted-foreground">{reason.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 w-full relative"
          >
            <div className="aspect-square max-w-md mx-auto relative rounded-3xl overflow-hidden glass-card p-2 group hover:shadow-[0_0_50px_rgba(59,130,246,0.3)] transition-all duration-500">
              <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center relative overflow-hidden">
                <Globe2 className="w-48 h-48 text-blue-500/50 animate-pulse group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
