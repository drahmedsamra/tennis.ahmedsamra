import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,

  compress: true,

  images: {
    formats: ["image/avif", "image/webp"],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/photos/**",
      },

      {
        protocol: "https",
        hostname: "grivtklckeaphdrjjkpb.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },

      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/vi/**",
      },

      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/vi/**",
      },
    ],
  },

  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;