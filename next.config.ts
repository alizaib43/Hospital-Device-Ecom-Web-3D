import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.7", "192.168.*.*", "10.*.*.*", "172.16.*.*"],
  output: "export",
  basePath: isProd ? "/Hospital-Device-Ecom-Web-3D" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
