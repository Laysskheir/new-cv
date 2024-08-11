/** @type {import('next').NextConfig} */
const nextConfig = {
  
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000",
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "shots.so",
      },
      {
        protocol: "https",
        hostname: "*",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
