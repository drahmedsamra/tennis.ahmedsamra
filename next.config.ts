import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,

  compress: true,

  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days cache for optimized images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

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

  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|png|webp|avif|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;