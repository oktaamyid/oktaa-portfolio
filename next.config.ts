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
               }
          ]
     },
};

export default nextConfig;
