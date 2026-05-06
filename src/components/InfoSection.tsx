"use client";

import { Stethoscope, Activity, HeartPulse } from "lucide-react";
import { motion } from "framer-motion";

export default function InfoSection() {
  const features = [
    {
      icon: <Stethoscope className="w-8 h-8 text-blue-500 group-hover:scale-110 transition-transform duration-300" />,
      title: "Diagnostic Equipment",
      description: "Advanced imaging and monitoring systems designed to provide crystal-clear insights for accurate diagnosis."
    },
    {
      icon: <Activity className="w-8 h-8 text-blue-500 group-hover:scale-110 transition-transform duration-300" />,
      title: "Life Support",
      description: "Reliable, state-of-the-art life support machines that ensure patient stability in critical care environments."
    },
    {
      icon: <HeartPulse className="w-8 h-8 text-blue-500 group-hover:scale-110 transition-transform duration-300" />,
      title: "Surgical Instruments",
      description: "Precision-engineered tools that assist surgeons in performing complex procedures with enhanced control."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] } }
  } as const;

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-transparent relative overflow-hidden" id="solutions">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 p-6 sm:p-8 glass rounded-[2rem] sm:rounded-3xl"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-foreground">
            What Are Our <span className="text-blue-500">Devices?</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            We provide next-generation clinical equipment that bridges the gap between technology and human care. 
            Our devices are engineered to empower healthcare professionals with precision, reliability, and speed.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              whileTap={{ scale: 0.98, y: -2 }}
              className="glass p-6 sm:p-8 rounded-[2rem] group cursor-pointer border border-border shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-500">
                <div className="group-hover:text-white transition-colors duration-500">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-2xl font-black mb-4 text-foreground tracking-tight">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed font-medium">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
