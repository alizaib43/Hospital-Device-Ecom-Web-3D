"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQSection() {
  const faqs = [
    {
      question: "Do you provide installation and training for the equipment?",
      answer: "Yes, our team of certified technicians handles the complete installation process. We also provide comprehensive on-site training for your medical staff to ensure safe and efficient operation of all devices."
    },
    {
      question: "What is the standard warranty period for your medical devices?",
      answer: "All our primary medical devices come with a standard 3-year comprehensive warranty that covers parts, labor, and software updates. Extended warranty plans up to 7 years are also available."
    },
    {
      question: "How quickly can you dispatch replacement parts?",
      answer: "We maintain strategic global warehouses. For critical equipment, we guarantee a 24-hour dispatch time for replacement parts to minimize any disruption to your medical facility."
    },
    {
      question: "Are your devices compatible with existing hospital management systems?",
      answer: "Absolutely. Our modern devices are built with interoperability in mind. They support standard protocols like HL7 and DICOM, ensuring seamless integration with most major Electronic Health Record (EHR) and Hospital Information Systems (HIS)."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-background relative">
      <div className="max-w-4xl mx-auto px-6 sm:px-12 lg:px-16">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-foreground leading-tight">
            Frequently Asked <span className="text-blue-500">Questions</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Find answers to common questions about our medical devices, support, and services.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="glass-card rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="font-semibold text-lg text-foreground pr-8">
                  {faq.question}
                </span>
                <ChevronDown 
                  className={`w-5 h-5 text-blue-500 transition-transform duration-300 shrink-0 ${openIndex === index ? "rotate-180" : ""}`} 
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 pt-2 text-muted-foreground leading-relaxed border-t border-white/5">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
