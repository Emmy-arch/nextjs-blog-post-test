import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "cdn.pixabay.com",
        protocol: "https",
        port: "",
        pathname: "**",
      },
      {
        hostname: "th.bing.com",
        protocol: "https",
        port: "",
        pathname: "**",
      },
    ]
  }
};

export default nextConfig;
