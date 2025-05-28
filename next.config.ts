import type { NextConfig } from "next";

const nextConfig: NextConfig = {
     images: {
          remotePatterns: [
               {
                    protocol: 'https',
                    hostname: 'i.ibb.co.com',
                    pathname: '**'
               },
               {
                    protocol: 'https',
                    hostname: 'api.screenshotone.com',
                    pathname: '**'
               },
               {
                    protocol: 'https',
                    hostname: 'i.scdn.co',
                    pathname: '**'
               },
               {
                    protocol: 'https',
                    hostname: 'zbcld3vq1ntclyw4.public.blob.vercel-storage.com',
                    pathname: '**'
               }
          ]
     },
};

export default nextConfig;
