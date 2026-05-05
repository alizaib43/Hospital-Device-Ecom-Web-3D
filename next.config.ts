import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.7", "192.168.*.*", "10.*.*.*", "172.16.*.*"],
};

export default nextConfig;
