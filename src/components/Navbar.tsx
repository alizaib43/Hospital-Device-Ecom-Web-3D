"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Activity, ShoppingCart, Menu, Moon, Sun, X as CloseIcon } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { cartCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      const sections = ["solutions", "products"];
      let current = "Home";
      
      for (const id of sections) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200) {
            current = id === "products" ? "Equipment" : "Solutions";
          }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Equipment", href: "/#products" },
    { name: "Solutions", href: "/#solutions" },
    { name: "About Us", href: "/about" },
  ];

  const isDark = mounted ? theme === "dark" : false;

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500 print:hidden ${
          scrolled
            ? (isDark 
                ? "bg-black/60 backdrop-blur-xl border-blue-500/20 py-2" 
                : "bg-white/70 backdrop-blur-xl border-slate-200/80 py-2 shadow-xl shadow-slate-200/30")
            : (isDark 
                ? "bg-transparent border-transparent py-4 sm:py-6" 
                : "bg-transparent border-transparent py-4 sm:py-6")
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 flex items-center justify-between">
          <div className="flex flex-col">
            <Link href="/" className="flex items-center gap-2 sm:gap-3 text-foreground group">
              <div className={`p-1.5 sm:p-2 rounded-xl transition-all duration-500 group-hover:rotate-[360deg] ${isDark ? "bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.3)]" : "bg-blue-50/80 shadow-sm"}`}>
                <Activity className={`w-5 h-5 sm:w-7 sm:h-7 ${isDark ? "text-blue-400" : "text-blue-600"}`} />
              </div>
              <span className={`font-black text-xl sm:text-2xl tracking-tighter transition-colors duration-500 ${isDark ? "text-white" : "text-slate-900"}`}>
                MEDI<span className={isDark ? "text-blue-400" : "text-blue-600"}>TECH</span>
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-2 mt-1 px-1">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
              <span className="text-[7px] font-black uppercase tracking-[0.4em] text-muted-foreground opacity-60">Clinical Network Online</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-12 text-[11px] font-black uppercase tracking-[0.25em]">
            {navLinks.map((link) => {
              const isActive = activeSection === link.name;
              return (
                <motion.div key={link.name} whileHover={{ y: -1 }} transition={{ duration: 0.2 }}>
                  <Link 
                    href={link.href} 
                    className={`transition-all duration-500 relative group py-2 ${
                      isActive 
                        ? (isDark ? "text-white" : "text-blue-600") 
                        : (isDark ? "text-white/60 hover:text-white" : "text-slate-500 hover:text-blue-600")
                    }`}
                  >
                    {link.name}
                    <motion.span 
                      initial={false}
                      animate={{ 
                        width: isActive ? "100%" : "0%",
                        opacity: isActive ? 1 : 0
                      }}
                      className={`absolute -bottom-0.5 left-0 h-0.5 transition-all duration-500 ${isDark ? "bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]" : "bg-blue-600"}`}
                    />
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {mounted && (
              <motion.button 
                whileHover={{ scale: 1.05, rotate: 15 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className={`p-2 sm:p-3 rounded-2xl transition-all duration-500 border hidden sm:flex ${
                  isDark ? "bg-white/5 hover:bg-white/10 text-blue-400 border-white/10 shadow-inner" : "bg-slate-50 hover:bg-white text-slate-600 border-slate-200 shadow-sm"
                }`}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>
            )}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCartOpen(true)}
              className={`p-2 sm:p-3 rounded-2xl transition-all duration-500 border relative ${
                isDark ? "bg-blue-600 hover:bg-blue-500 text-white border-blue-400/30 shadow-[0_0_20px_rgba(37,99,235,0.4)]" : "bg-blue-600 hover:bg-blue-700 text-white border-blue-700 shadow-[0_8px_15px_rgba(37,99,235,0.2)]"
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              {mounted && cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 sm:w-6 sm:h-6 bg-white text-blue-600 text-[8px] sm:text-[10px] font-black rounded-full border-2 border-blue-600 flex items-center justify-center shadow-lg">
                  {cartCount}
                </span>
              )}
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(true)}
              className={`md:hidden p-2 sm:p-3 rounded-2xl transition-all border ${
                isDark ? "bg-white/5 text-white border-white/10" : "bg-slate-50 text-slate-900 border-slate-200"
              }`}
            >
              <Menu className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-screen w-full sm:w-[400px] bg-background border-l border-border z-[61] p-0 flex flex-col shadow-2xl overflow-hidden"
            >
              <div className="p-8 flex justify-between items-center border-b border-border/50">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${isDark ? "bg-blue-500/10" : "bg-blue-50"}`}>
                    <Activity className="w-6 h-6 text-blue-500" />
                  </div>
                  <span className="font-black text-xl tracking-tighter text-foreground uppercase">Menu</span>
                </div>
                <button 
                  onClick={() => setIsMenuOpen(false)} 
                  className={`p-3 rounded-2xl transition-all ${isDark ? "bg-white/5 text-white hover:bg-white/10" : "bg-slate-50 text-slate-900 hover:bg-slate-100"}`}
                >
                  <CloseIcon className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 px-8 py-12 flex flex-col gap-4 overflow-y-auto">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                  >
                    <Link 
                      href={link.href} 
                      onClick={() => setIsMenuOpen(false)}
                      className={`group flex items-center justify-between p-6 rounded-[2rem] transition-all duration-300 border ${
                        isDark 
                          ? "bg-white/5 border-white/5 hover:bg-blue-600 hover:border-blue-400 text-white" 
                          : "bg-slate-50 border-slate-100 hover:bg-blue-600 hover:border-blue-400 hover:text-white"
                      }`}
                    >
                      <span className="text-xl font-black uppercase tracking-widest">{link.name}</span>
                      <Activity className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="p-8 border-t border-border/50 bg-muted/20">
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setTheme('light')}
                    className={`flex items-center justify-center gap-3 py-4 rounded-2xl font-bold transition-all border ${
                      !isDark 
                        ? "bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-600/20" 
                        : "bg-background text-muted-foreground border-border"
                    }`}
                  >
                    <Sun className="w-5 h-5" />
                    <span>Light</span>
                  </button>
                  <button 
                    onClick={() => setTheme('dark')}
                    className={`flex items-center justify-center gap-3 py-4 rounded-2xl font-bold transition-all border ${
                      isDark 
                        ? "bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-600/20" 
                        : "bg-background text-muted-foreground border-border"
                    }`}
                  >
                    <Moon className="w-5 h-5" />
                    <span>Dark</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
