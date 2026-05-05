"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";

function Particles({ count = 200, isDark, isMobile }: { count?: number; isDark: boolean; isMobile?: boolean }) {
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

  useFrame((state) => {
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

function BeadPair({ index, currentRadius, globalPointer, isDark }: any) {
  const groupRef = useRef<THREE.Group>(null);
  const mesh1Ref = useRef<THREE.Mesh>(null);
  const mesh2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    const count = 30; 
    const spacing = 0.5;
    const baseOffset = (index - count / 2) * spacing;
    
    const timeSpeed = 0.3;
    const scrollSpeed = 0.006;
    
    const timeOffset = state.clock.elapsedTime * timeSpeed; 
    const scrollOffset = window.scrollY * scrollSpeed; 
    
    const range = 15; 
    let newY = (baseOffset - scrollOffset - timeOffset) % range;
    
    if (newY < -range / 2) newY += range;
    if (newY > range / 2) newY -= range;
    
    groupRef.current.position.y = newY;
    const angle = newY * (Math.PI / 2.5);
    groupRef.current.rotation.y = angle;

    const mouseX = globalPointer.current.x * 5;
    const mouseY = globalPointer.current.y * 5;
    const dist = Math.sqrt(Math.pow(groupRef.current.position.x - mouseX, 2) + Math.pow(newY - mouseY, 2));
    
    const targetScale = dist < 2 ? 1.6 : 1.0;
    if (mesh1Ref.current) mesh1Ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    if (mesh2Ref.current) mesh2Ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  return (
    <group ref={groupRef}>
      <mesh ref={mesh1Ref} position={[currentRadius, 0, 0]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial 
          color={isDark ? "#3b82f6" : "#2563eb"} 
          emissive={isDark ? "#1d4ed8" : "#60a5fa"} 
          emissiveIntensity={isDark ? 1 : 0.5} 
          roughness={0.1} 
          metalness={0.9} 
        />
      </mesh>
      <mesh ref={mesh2Ref} position={[-currentRadius, 0, 0]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial 
          color={isDark ? "#60a5fa" : "#3b82f6"} 
          emissive={isDark ? "#2563eb" : "#93c5fd"} 
          emissiveIntensity={isDark ? 1 : 0.5} 
          roughness={0.1} 
          metalness={0.9} 
        />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, currentRadius * 2, 16]} />
        <meshStandardMaterial color={isDark ? "#ffffff" : "#020617"} transparent opacity={isDark ? 0.3 : 0.1} />
      </mesh>
    </group>
  );
}

function DNAStrand({ isDark, isMobile }: { isDark: boolean; isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const globalPointer = useRef({ x: 0, y: 0 });
  const lightRef = useRef<THREE.PointLight>(null);

  useEffect(() => {
    const handlePointerMove = (e: any) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      globalPointer.current.x = (clientX / window.innerWidth) * 2 - 1;
      globalPointer.current.y = -(clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("touchmove", handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
    };
  }, []);

  const lastScrollY = useRef(0);
  const scrollVelocity = useRef(0);

  useFrame((state) => {
    // Calculate scroll velocity
    const currentScrollY = window.scrollY;
    const delta = currentScrollY - lastScrollY.current;
    lastScrollY.current = currentScrollY;
    
    // Smooth out velocity with damping
    scrollVelocity.current = THREE.MathUtils.lerp(scrollVelocity.current, delta, 0.1);
    
    if (groupRef.current) {
      const maxTilt = (140 * Math.PI) / 360; 
      const targetRotationX = globalPointer.current.y * maxTilt;
      const targetRotationZ = -globalPointer.current.x * maxTilt;
      const bobbing = Math.sin(state.clock.elapsedTime * 1.5) * 0.4;
      
      // Apply scroll velocity to rotation Y (Reduced sensitivity for smoother feel)
      groupRef.current.rotation.y += scrollVelocity.current * 0.004;
      
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.08);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotationZ, 0.08);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, bobbing + (isMobile ? -2 : 0), 0.06);
    }
    
    if (lightRef.current) {
      lightRef.current.position.x = globalPointer.current.x * 12;
      lightRef.current.position.y = globalPointer.current.y * 12;
    }
  });

  const currentRadius = isMobile ? 1.0 : 1.5;

  return (
    <group ref={groupRef}>
      <pointLight ref={lightRef} distance={15} intensity={isDark ? 8 : 4} color={isDark ? "#60a5fa" : "#3b82f6"} />
      {Array.from({ length: 30 }).map((_, i) => (
        <BeadPair key={i} index={i} currentRadius={currentRadius} globalPointer={globalPointer} isDark={isDark} />
      ))}
    </group>
  );
}


export default function Hero3D() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
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

  return (
    <div className={`fixed inset-0 -z-20 transition-colors duration-1000 ${isDark ? "bg-[#050b1a]" : "bg-[#f8fafc]"}`}>
      {/* Mobile Vignette for focus */}
      <div className="absolute inset-0 z-10 pointer-events-none md:hidden bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)] opacity-50" />
      
      <Canvas camera={{ position: [0, 0, 10], fov: currentIsMobile ? 65 : 45 }} gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}>
        <color attach="background" args={[bgColor]} />
        <ambientLight intensity={isDark ? 0.8 : 1.2} />
        <spotLight position={[15, 20, 15]} angle={0.3} penumbra={1} intensity={isDark ? 5 : 3} color={accentColor} />
        <pointLight position={[-10, -10, -10]} intensity={isDark ? 3 : 1.5} color={isDark ? "#818cf8" : "#bfdbfe"} />
        <Particles count={currentIsMobile ? (isDark ? 300 : 100) : (isDark ? 800 : 200)} isDark={isDark} isMobile={currentIsMobile} />
        <Float speed={isDark ? 2 : 1} rotationIntensity={isDark ? 1 : 0.5} floatIntensity={isDark ? 1.5 : 0.8}>
          <DNAStrand isDark={isDark} isMobile={isMobile} />
        </Float>
        <Environment preset={isDark ? "night" : "apartment"} />
        <ContactShadows position={[0, -4.5, 0]} scale={30} blur={2.5} far={4.5} opacity={isDark ? 0.6 : 0.1} />
      </Canvas>
    </div>
  );
}
