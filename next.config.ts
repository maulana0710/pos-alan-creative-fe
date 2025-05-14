import type { NextConfig } from "next";
const getBaseURL = () => {
  const URL = process.env.NEXT_PUBLIC_SUBDOMAIN;
  return `https://${URL}/api/v1/`;
};

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: getBaseURL(),
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
