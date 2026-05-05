"use client";

import { motion } from "framer-motion";
import { Home, Package, Cpu } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";
import { useUI } from "@/context/UIContext";
import { useRouter, usePathname } from "next/navigation";

export default function MobileNav() {
  const [activeSection, setActiveSection] = useState("Home");
  const isScrollingRef = useRef(false);
  const { isChatOpen } = useUI();
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      if (isScrollingRef.current) return;
      
      const productEl = document.getElementById("products");
      const solutionEl = document.getElementById("solutions");

      let current = "Home";

      if (solutionEl) {
        const rect = solutionEl.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.5) {
          current = "Tech";
        }
      }
      
      if (productEl) {
        const rect = productEl.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.5) {
          current = "Devices";
        }
      }
      
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted || isChatOpen) return null;

  const isDark = theme === "dark";

  const navItems = [
    {
      name: "Home",
      icon: <Home className="w-5 h-5" />,
      onClick: () => {
        isScrollingRef.current = true;
        setActiveSection("Home");
        if (pathname !== "/") {
          router.push("/");
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        setTimeout(() => { isScrollingRef.current = false; }, 1000);
      },
    },
    {
      name: "Devices",
      icon: <Package className="w-5 h-5" />,
      onClick: () => {
        isScrollingRef.current = true;
        setActiveSection("Devices");
        if (pathname !== "/") {
          router.push("/#products");
        } else {
          const el = document.getElementById("products");
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        setTimeout(() => { isScrollingRef.current = false; }, 1000);
      },
    },
    {
      name: "Tech",
      icon: <Cpu className="w-5 h-5" />,
      onClick: () => {
        isScrollingRef.current = true;
        setActiveSection("Tech");
        if (pathname !== "/") {
          router.push("/#solutions");
        } else {
          const el = document.getElementById("solutions");
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        setTimeout(() => { isScrollingRef.current = false; }, 1000);
      },
    },
  ];

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", damping: 20, stiffness: 100 }}
      className="fixed left-1/2 -translate-x-1/2 z-[100] md:hidden w-[calc(100%-3rem)] max-w-xs"
      style={{ bottom: "max(1.5rem, env(safe-area-inset-bottom, 1.5rem))" }}
    >
      <div
        className={`backdrop-blur-2xl h-[4.5rem] rounded-[2rem] flex items-center justify-around px-2 border transition-colors duration-500 ${
          isDark
            ? "bg-black/50 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
            : "bg-white/70 border-slate-200 shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
        }`}
      >
        {navItems.map((item) => {
          const isActive = activeSection === item.name;
          return (
            <button
              key={item.name}
              onClick={item.onClick}
              className="relative flex flex-col items-center justify-center h-full flex-1 group"
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabBg"
                  className="absolute inset-x-1 inset-y-1.5 bg-blue-600 rounded-2xl -z-10 shadow-[0_6px_16px_rgba(37,99,235,0.5)]"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              )}
              <div
                className={`transition-all duration-300 ${
                  isActive
                    ? "text-white scale-110"
                    : isDark
                    ? "text-white/40 group-active:text-white/70"
                    : "text-slate-400 group-active:text-blue-500"
                }`}
              >
                {item.icon}
              </div>
              <span
                className={`text-[10px] font-black uppercase tracking-[0.15em] mt-1 transition-colors duration-300 ${
                  isActive
                    ? "text-white"
                    : isDark
                    ? "text-white/30"
                    : "text-slate-400"
                }`}
              >
                {item.name}
              </span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
