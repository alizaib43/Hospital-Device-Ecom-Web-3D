"use client";

import { useParams } from "next/navigation";
import { motion, useScroll, useSpring, useTransform, useMotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Star, ShoppingCart, Shield, Truck, Zap, Check, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero3D from "@/components/Hero3D";
import { allProducts } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Scroll Progress
  const { scrollYProgress } = useScroll();
  const scrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Mouse Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [10, -10]));
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-10, 10]));

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };
  
  const product = allProducts.find(p => p.id === Number(id));

  const getProductFilter = (id: number) => {
    switch(id) {
      case 2: return "hue-rotate(30deg) brightness(1.1)";
      case 5: return "hue-rotate(160deg) contrast(1.1)";
      case 7: return "hue-rotate(280deg) saturate(1.5)";
      case 4: return "hue-rotate(90deg) brightness(0.9)";
      case 6: return "hue-rotate(-40deg) saturate(1.2)";
      case 8: return "brightness(1.5) contrast(1.2)";
      case 9: return "hue-rotate(200deg)";
      default: return "none";
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Product not found.
      </div>
    );
  }

  const handleDownloadPDF = () => {
    window.print();
  };

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const relatedProducts = [
    ...allProducts.filter(p => p.category === product.category && p.id !== product.id),
    ...allProducts.filter(p => p.category !== product.category && p.id !== product.id).sort((a, b) => b.rating - a.rating)
  ].slice(0, 3);

  return (
    <main className="min-h-screen relative flex flex-col bg-transparent print:bg-white overflow-hidden">
      <Navbar />
      <Hero3D />
      
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-blue-500 z-[110] origin-left"
        style={{ scaleX: scrollProgress }}
      />

      <div className="flex-grow pt-40 pb-32 px-6 relative z-10 max-w-7xl mx-auto w-full print:pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-40">
          {/* Minimalist Gallery with 3D Parallax */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, perspective: 1000 }}
            className="relative flex items-center justify-center group cursor-crosshair"
          >
            <div className={`absolute inset-0 rounded-full blur-[120px] transition-colors duration-1000 ${isDark ? "bg-blue-500/10" : "bg-blue-500/20"}`} />
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              src={product.image} 
              alt={product.name}
              width={800}
              height={800}
              className="w-full h-auto object-contain drop-shadow-[0_50px_100px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_50px_100px_rgba(0,0,0,0.5)] relative z-10"
              style={{ translateZ: 100, filter: getProductFilter(product.id) }}
            />
          </motion.div>

          {/* Clean Details Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col space-y-12"
          >
            <div className="space-y-6">
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-500"
              >
                {product.category}
              </motion.span>
              <h1 className="text-6xl md:text-[7rem] font-black text-foreground tracking-tighter leading-[0.85] drop-shadow-sm">
                {product.name.split(' ').map((word, i) => (
                  <span key={i} className="block" i-key={i}>{word}</span>
                ))}
              </h1>
              <div className="flex items-center gap-6">
                <span className="text-4xl font-black text-blue-600 dark:text-blue-400 tracking-tighter">{product.price}</span>
                <div className="h-[1px] w-12 bg-border" />
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-xs font-bold text-foreground uppercase tracking-widest">{product.rating} Precision Score</span>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground text-xl leading-relaxed font-medium max-w-lg">
              {product.longDescription || product.description}
            </p>

            {/* Core Capabilities - Interesting & Visual */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: <Zap className="w-5 h-5" />, title: "Instant Response", desc: "Zero-latency clinical processing" },
                { icon: <Shield className="w-5 h-5" />, title: "Bio-Security", desc: "Military-grade data encryption" },
                { icon: <ArrowRight className="w-5 h-5" />, title: "AI-Driven", desc: "Neural diagnostics assist" },
                { icon: <Check className="w-5 h-5" />, title: "Eco-Logic", desc: "40% less power consumption" }
              ].map((cap, i) => (
                <div key={i} className={`flex gap-4 p-5 rounded-3xl border transition-all duration-500 ${isDark ? "bg-blue-500/5 border-blue-500/10" : "bg-white border-slate-200 shadow-sm"}`}>
                  <div className="text-blue-500 mt-1">{cap.icon}</div>
                  <div>
                    <h4 className="text-sm font-black text-foreground uppercase tracking-tight">{cap.title}</h4>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest leading-tight">{cap.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Simplified Specs */}
            <div className="grid grid-cols-2 gap-x-12 gap-y-8 py-10 border-y border-border/50">
              {(product.specs ? Object.entries(product.specs).slice(0, 4) : [
                ["Interface", "DICOM 3.0"],
                ["Power", "220V"],
                ["Warranty", "3-Year"],
                ["Precision", "99.9%"]
              ]).map(([key, value]) => (
                <div key={key} className="space-y-1">
                  <span className="block text-[10px] text-muted-foreground uppercase tracking-widest font-black opacity-60">{key}</span>
                  <span className="text-lg font-bold text-foreground">{value as string}</span>
                </div>
              ))}
            </div>

            {/* Minimalist CTA */}
            <div className="flex flex-col sm:flex-row gap-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className={`px-12 py-6 rounded-full font-black uppercase tracking-widest transition-all text-sm ${
                  added 
                    ? "bg-green-500 text-white shadow-xl shadow-green-500/20" 
                    : "bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-500/30"
                }`}
              >
                {added ? "Added to Catalog" : "Add to Procurement"}
              </motion.button>
              
              <button 
                onClick={handleDownloadPDF}
                className="px-12 py-6 rounded-full border border-border font-black uppercase tracking-widest text-sm hover:bg-muted transition-all text-foreground"
              >
                Technical PDF
              </button>
            </div>
          </motion.div>
        </div>

        {/* Clinical Workflow Section */}
        <div className="mb-40 space-y-20">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">Clinical <span className="text-blue-500">Workflow</span></h2>
            <p className="text-muted-foreground font-bold uppercase tracking-[0.3em] text-xs">Seamless integration into your hospital ecosystem.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { step: "01", title: "Neural Link", desc: "System connects to your hospital's central diagnostic hub automatically.", icon: <Zap /> },
              { step: "02", title: "AI Scan", desc: "Real-time AI analysis identifies clinical anomalies within milliseconds.", icon: <ArrowRight /> },
              { step: "03", title: "Direct Sync", desc: "Results are synced to physician devices with military-grade encryption.", icon: <Check /> }
            ].map((workflow, i) => (
              <div key={i} className={`space-y-8 relative p-12 rounded-[3.5rem] border group transition-all duration-700 ${isDark ? "bg-muted/20 border-border/50 hover:border-blue-500/30" : "bg-white border-slate-200 shadow-xl hover:shadow-2xl"}`}>
                <div className={`text-7xl font-black absolute top-10 right-10 transition-colors duration-700 ${isDark ? "text-blue-500/40 group-hover:text-blue-500/60" : "text-blue-600/30 group-hover:text-blue-600/50"}`}>
                  {workflow.step}
                </div>
                <div className="w-14 h-14 rounded-[1.5rem] bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/30">
                  {workflow.icon}
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl font-black tracking-tight">{workflow.title}</h3>
                  <p className="text-muted-foreground text-sm font-bold leading-relaxed uppercase tracking-widest opacity-80">{workflow.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Simplified Related */}
        <div className="space-y-20">
          <div className="text-center space-y-6">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter">Related Solutions</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full" />
            <p className="text-muted-foreground font-bold uppercase tracking-[0.2em] text-[10px]">Synergistic equipment for your facility</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {relatedProducts.map((p) => (
              <Link key={p.id} href={`/products/${p.id}`} className="group">
                <div className={`aspect-square rounded-[3.5rem] mb-10 flex items-center justify-center p-16 overflow-hidden relative transition-all duration-700 ${isDark ? "bg-muted/20" : "bg-white border border-slate-100 shadow-lg group-hover:shadow-2xl hover:bg-slate-50"}`}>
                  <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Floating Price Badge */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute top-8 left-8 px-4 py-2 bg-blue-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg z-20"
                  >
                    {p.price}
                  </motion.div>

                  <img 
                    src={p.image} 
                    alt={p.name} 
                    className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-110" 
                    style={{ filter: getProductFilter(p.id) }}
                  />
                  <div className="absolute bottom-10 right-10 w-12 h-12 rounded-2xl bg-blue-600 border border-blue-500/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="space-y-2 text-center">
                  <h4 className="text-2xl font-black text-foreground group-hover:text-blue-600 transition-colors tracking-tight">{p.name}</h4>
                  <p className="text-blue-500 font-black text-sm tracking-[0.2em] uppercase">{p.category}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="print:hidden">
        <Footer />
      </div>
    </main>
  );
}
