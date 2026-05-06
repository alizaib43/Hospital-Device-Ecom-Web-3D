"use client";

import { useEffect, useState } from "react";

export default function StarBackground() {
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; duration: number; delay: number }[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    const count = window.innerWidth < 768 ? 20 : 50;
    const generatedStars = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
    setStars(generatedStars);
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-background pointer-events-none">
      <style jsx>{`
        @keyframes star-float {
          0%, 100% { transform: translateY(0); opacity: 0.2; }
          50% { transform: translateY(100px); opacity: 0.8; }
        }
        .star {
          animation: star-float var(--duration) linear infinite;
          animation-delay: var(--delay);
        }
      `}</style>
      {stars.map((star) => (
        <div
          key={star.id}
          className="star absolute rounded-full bg-blue-400"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            '--duration': `${star.duration}s`,
            '--delay': `-${star.delay}s`,
          } as any}
        />
      ))}
    </div>
  );
}
