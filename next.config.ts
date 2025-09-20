import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.static.brasilescola.uol.com.br',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com', 
      },
      {
        protocol: 'https',
        hostname: 'images.livrariasaraiva.com.br',
      },
    ],
  },
};


export default nextConfig;
