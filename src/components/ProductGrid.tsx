"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingCart, Check, Star, Plus } from "lucide-react";
import { allProducts, categories } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useTheme } from "next-themes";

export default function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart } = useCart();
  const [addedItems, setAddedItems] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const { theme } = useTheme();
  const isDark = mounted ? theme === "dark" : false;

  const filteredProducts = allProducts.filter(product => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAddedItems(prev => [...prev, product.id]);
    setTimeout(() => {
      setAddedItems(prev => prev.filter(id => id !== product.id));
    }, 2000);
  };

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

  return (
    <div id="products" className="py-16 sm:py-24 lg:py-32 relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10 sm:mb-16"
      >
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-4 sm:mb-6 text-foreground tracking-tight">
          Premium <span className="text-blue-500">Medical Systems</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg leading-relaxed font-medium">
          The world's most advanced clinical diagnostics, engineered for precision.
        </p>
      </motion.div>

      {/* Filters and Search Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-16 sm:mb-20 gap-8">
        <div className="w-full overflow-x-auto pb-4 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 no-scrollbar">
          <div className="flex md:flex-wrap gap-3 sm:gap-4 min-w-max md:min-w-0">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-[10px] sm:text-xs font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-all duration-300 border whitespace-nowrap ${
                  activeCategory === category 
                    ? "bg-blue-600 text-white border-blue-400 shadow-[0_10px_20px_rgba(37,99,235,0.3)]" 
                    : "bg-muted text-muted-foreground border-border hover:bg-muted/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-500" />
          <input
            type="text"
            placeholder="Search catalog..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-muted/30 border border-border rounded-2xl text-foreground focus:outline-none focus:border-blue-500 transition-all backdrop-blur-xl text-sm"
          />
        </div>
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -10 }}
              whileTap={{ scale: 0.98 }}
              className="bg-card border border-border rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden group cursor-pointer relative shadow-xl hover:shadow-2xl transition-all duration-500 h-full"
            >
              <Link href={`/products/${product.id}`} className="block p-6 sm:p-8 lg:p-10 pb-4">
                <div className="aspect-[4/3] rounded-[2rem] bg-muted/30 mb-8 relative overflow-hidden flex items-center justify-center group-hover:bg-muted/50 transition-colors">
                  <Image 
                    src={product.image} 
                    alt={product.name}
                    width={300}
                    height={300}
                    className="object-contain p-8 transition-transform duration-700 group-hover:scale-110"
                    style={{ filter: isDark ? getProductFilter(product.id) : "none" }}
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/10 backdrop-blur-md border border-white/20 text-foreground shadow-lg">
                      In Stock
                    </span>
                  </div>
                </div>

                <div className="space-y-3 px-2 mb-8">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-[0.1em] sm:tracking-[0.2em] text-blue-500">{product.category}</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <div key={s} className={`w-1.5 h-1.5 rounded-full ${s <= 4 ? "bg-blue-500" : "bg-muted"}`} />
                      ))}
                    </div>
                  </div>
                  <h3 className="text-2xl font-black text-foreground tracking-tight group-hover:text-blue-500 transition-colors leading-tight">
                    {product.name}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed font-medium">
                    {product.description}
                  </p>
                </div>

                <div className="flex items-center justify-between px-2 pt-6 border-t border-border">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-1">MSRP</span>
                    <span className="text-3xl font-black text-foreground tracking-tighter">${product.price.toLocaleString()}</span>
                  </div>
                </div>
              </Link>

              {/* Quick Add Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => handleAddToCart(e, product)}
                className={`absolute bottom-8 right-8 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-500 z-20 ${
                  addedItems.includes(product.id)
                    ? "bg-green-500 text-white translate-y-0 opacity-100"
                    : "bg-blue-600 text-white opacity-100 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 hover:bg-blue-500"
                }`}
              >
                {addedItems.includes(product.id) ? (
                  <Check className="w-6 h-6" />
                ) : (
                  <Plus className="w-6 h-6" />
                )}
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
