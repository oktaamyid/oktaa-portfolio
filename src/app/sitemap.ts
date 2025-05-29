import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
     const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'; 

     const staticUrls: MetadataRoute.Sitemap = [
          {
               url: baseUrl,
               lastModified: new Date(),
               changeFrequency: 'daily',
               priority: 1.0,
          },
          {
               url: `${baseUrl}/about`,
               lastModified: new Date(), 
               changeFrequency: 'monthly',
               priority: 0.5,
          },
          {
               url: `${baseUrl}/portal`,
               lastModified: new Date(), 
               changeFrequency: 'weekly',
               priority: 0.9,
          },
     ];

     return [
          ...staticUrls,
     ];
}