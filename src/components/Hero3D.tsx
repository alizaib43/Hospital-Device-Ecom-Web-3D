"use client";

import { useRef, useState, useEffect, useMemo, createContext, useContext } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";

// Shared scroll context to avoid multiple window.scrollY reads per frame
const ScrollContext = createContext<React.RefObject<{ y: number; velocity: number }> | null>(null);

function useSharedScroll() {
  return useContext(ScrollContext);
}

function Particles({ count = 200, isDark }: { count?: number; isDark: boolean }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 20;
      p[i * 3 + 1] = (Math.random() - 0.5) * 20;
      p[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return p;
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame(() => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += 0.001;
    pointsRef.current.rotation.x += 0.0005;
  });

  return (
    <Points ref={pointsRef} positions={points} stride={3}>
      <PointMaterial
        transparent
        color={isDark ? "#3b82f6" : "#020617"}
        size={0.08}
        sizeAttenuation={true}
        depthWrite={false}
        blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
        opacity={isDark ? 0.9 : 0.6}
      />
    </Points>
  );
}

// Reusable geometry refs to avoid recreating per BeadPair
const SPHERE_GEO_DESKTOP = [0.2, 32, 32] as const;
const SPHERE_GEO_MOBILE = [0.2, 12, 12] as const;
const CYL_SEGMENTS_DESKTOP = 16;
const CYL_SEGMENTS_MOBILE = 6;

function BeadPair({ index, currentRadius, globalPointer, isDark, isMobile, beadCount, spacing, range }: {
  index: number;
  currentRadius: number;
  globalPointer: React.RefObject<{ x: number; y: number }>;
  isDark: boolean;
  isMobile: boolean;
  beadCount: number;
  spacing: number;
  range: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const mesh1Ref = useRef<THREE.Mesh>(null);
  const mesh2Ref = useRef<THREE.Mesh>(null);
  const scrollRef = useSharedScroll();

  const sphereArgs = isMobile ? SPHERE_GEO_MOBILE : SPHERE_GEO_DESKTOP;
  const cylSegments = isMobile ? CYL_SEGMENTS_MOBILE : CYL_SEGMENTS_DESKTOP;

  // Pre-allocate vector to avoid GC
  const targetScale = useRef(new THREE.Vector3(1, 1, 1));

  useFrame((state) => {
    if (!groupRef.current) return;
    
    const baseOffset = (index - beadCount / 2) * spacing;
    
    const timeSpeed = 0.3;
    const scrollSpeed = 0.006;
    
    const timeOffset = state.clock.elapsedTime * timeSpeed; 
    const scrollY = scrollRef?.current?.y ?? 0;
    const scrollOffset = scrollY * scrollSpeed; 
    
    let newY = (baseOffset - scrollOffset - timeOffset) % range;
    
    if (newY < -range / 2) newY += range;
    if (newY > range / 2) newY -= range;
    
    groupRef.current.position.y = newY;
    const angle = newY * (Math.PI / 2.5);
    groupRef.current.rotation.y = angle;

    const mouseX = globalPointer.current.x * 5;
    const mouseY = globalPointer.current.y * 5;
    const dist = Math.sqrt(Math.pow(groupRef.current.position.x - mouseX, 2) + Math.pow(newY - mouseY, 2));
    
    const s = dist < 2 ? 1.6 : 1.0;
    targetScale.current.set(s, s, s);
    if (mesh1Ref.current) mesh1Ref.current.scale.lerp(targetScale.current, 0.1);
    if (mesh2Ref.current) mesh2Ref.current.scale.lerp(targetScale.current, 0.1);
  });

  return (
    <group ref={groupRef}>
      <mesh ref={mesh1Ref} position={[currentRadius, 0, 0]}>
        <sphereGeometry args={[...sphereArgs]} />
        <meshStandardMaterial 
          color={isDark ? "#3b82f6" : "#2563eb"} 
          emissive={isDark ? "#1d4ed8" : "#60a5fa"} 
          emissiveIntensity={isDark ? 1 : 0.5} 
          roughness={0.1} 
          metalness={0.9} 
        />
      </mesh>
      <mesh ref={mesh2Ref} position={[-currentRadius, 0, 0]}>
        <sphereGeometry args={[...sphereArgs]} />
        <meshStandardMaterial 
          color={isDark ? "#60a5fa" : "#3b82f6"} 
          emissive={isDark ? "#2563eb" : "#93c5fd"} 
          emissiveIntensity={isDark ? 1 : 0.5} 
          roughness={0.1} 
          metalness={0.9} 
        />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, currentRadius * 2, cylSegments]} />
        <meshStandardMaterial color={isDark ? "#ffffff" : "#020617"} transparent opacity={isDark ? 0.3 : 0.1} />
      </mesh>
    </group>
  );
}

function DNAStrand({ isDark, isMobile }: { isDark: boolean; isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const globalPointer = useRef({ x: 0, y: 0 });
  const lightRef = useRef<THREE.PointLight>(null);
  const scrollRef = useSharedScroll();

  useEffect(() => {
    const handlePointerMove = (e: any) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      globalPointer.current.x = (clientX / window.innerWidth) * 2 - 1;
      globalPointer.current.y = -(clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("touchmove", handlePointerMove, { passive: true });
    window.addEventListener("touchstart", handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("touchstart", handlePointerMove);
    };
  }, []);

  useFrame((state) => {
    const scrollVelocity = scrollRef?.current?.velocity ?? 0;
    
    if (groupRef.current) {
      const maxTilt = (140 * Math.PI) / 360; 
      const targetRotationX = isMobile ? 0 : globalPointer.current.y * maxTilt;
      const targetRotationZ = isMobile ? 0 : -globalPointer.current.x * maxTilt;
      const bobbing = Math.sin(state.clock.elapsedTime * 1.5) * 0.4;
      
      // Apply scroll velocity to rotation Y
      groupRef.current.rotation.y += scrollVelocity * 0.004;
      
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.08);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotationZ, 0.08);
      // Lift it up on mobile to center it behind the hero text
      const targetY = bobbing + (isMobile ? 1.5 : 0);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.06);
    }
    
    if (lightRef.current) {
      lightRef.current.position.x = globalPointer.current.x * 12;
      lightRef.current.position.y = globalPointer.current.y * 12;
    }
  });

  const currentRadius = isMobile ? 1.0 : 1.5;
  const beadCount = isMobile ? 30 : 30; // Set to 30 for both to fill screen
  const spacing = 0.5;
  const range = beadCount * spacing;

  return (
    <group ref={groupRef}>
      <pointLight ref={lightRef} distance={15} intensity={isDark ? 8 : 4} color={isDark ? "#60a5fa" : "#3b82f6"} />
      {Array.from({ length: beadCount }).map((_, i) => (
        <BeadPair 
          key={i} 
          index={i} 
          currentRadius={currentRadius} 
          globalPointer={globalPointer} 
          isDark={isDark} 
          isMobile={isMobile} 
          beadCount={beadCount} 
          spacing={spacing} 
          range={range} 
        />
      ))}
    </group>
  );
}


export default function Hero3D() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Shared scroll ref — read once per frame, not per BeadPair
  const scrollData = useRef({ y: 0, velocity: 0 });
  const lastScrollY = useRef(0);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    // Single scroll listener for the whole scene
    let rafId: number;
    const updateScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;
      lastScrollY.current = currentY;
      scrollData.current.y = currentY;
      scrollData.current.velocity = THREE.MathUtils.lerp(scrollData.current.velocity, delta, 0.1);
      rafId = requestAnimationFrame(updateScroll);
    };
    rafId = requestAnimationFrame(updateScroll);
    
    return () => {
      window.removeEventListener("resize", checkMobile);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!mounted) {
    return (
      <div 
        className="fixed inset-0 -z-20 bg-[#050b1a] transition-colors duration-1000" 
        aria-hidden="true"
      />
    );
  }

  const isDark = mounted ? theme === "dark" : true;
  const currentIsMobile = mounted ? isMobile : false;
  const bgColor = isDark ? "#050b1a" : "#ffffff";
  const accentColor = isDark ? "#3b82f6" : "#2563eb";

  // Mobile: fewer particles, no Environment, no ContactShadows, lower DPR
  const particleCount = currentIsMobile
    ? (isDark ? 60 : 30)
    : (isDark ? 800 : 200);

  return (
    <div className={`fixed inset-0 -z-20 transition-colors duration-1000 ${isDark ? "bg-[#050b1a]" : "bg-[#f8fafc]"}`}>
      {/* Mobile Vignette for focus */}
      <div className="absolute inset-0 z-10 pointer-events-none md:hidden bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)] opacity-50" />
      
      <ScrollContext.Provider value={scrollData}>
        <Canvas
          camera={{ position: [0, 0, currentIsMobile ? 12 : 10], fov: currentIsMobile ? 55 : 45 }}
          dpr={currentIsMobile ? [1, 1.5] : [1, 2]}
          gl={{
            alpha: true,
            antialias: !currentIsMobile,
            powerPreference: currentIsMobile ? "low-power" : "high-performance",
          }}
        >
          <color attach="background" args={[bgColor]} />
          <ambientLight intensity={isDark ? 0.8 : 1.2} />
          <spotLight position={[15, 20, 15]} angle={0.3} penumbra={1} intensity={isDark ? 5 : 3} color={accentColor} />
          <pointLight position={[-10, -10, -10]} intensity={isDark ? 3 : 1.5} color={isDark ? "#818cf8" : "#bfdbfe"} />
          <Particles count={particleCount} isDark={isDark} />
          
          {currentIsMobile ? (
            // Mobile: skip Float wrapper to save per-frame overhead
            <DNAStrand isDark={isDark} isMobile={isMobile} />
          ) : (
            <Float speed={isDark ? 2 : 1} rotationIntensity={isDark ? 1 : 0.5} floatIntensity={isDark ? 1.5 : 0.8}>
              <DNAStrand isDark={isDark} isMobile={isMobile} />
            </Float>
          )}

          {/* Desktop only: Environment preset and ContactShadows */}
          {!currentIsMobile && (
            <>
              <Environment preset={isDark ? "night" : "apartment"} />
              <ContactShadows position={[0, -4.5, 0]} scale={30} blur={2.5} far={4.5} opacity={isDark ? 0.6 : 0.1} />
            </>
          )}
        </Canvas>
      </ScrollContext.Provider>
    </div>
  );
}
