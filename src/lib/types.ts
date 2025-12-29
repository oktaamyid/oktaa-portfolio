export interface Experience {
     id: string;
     company: string;
     role: string;
     year: string;
     description: string;
     description_id?: string;
     logo: string;
     link: string;
     techStack: string[];
}

export interface Project {
     id: string;
     title: string;
     type: 'Website' | 'Mobile' | 'Other'; 
     year: string; 
     image: string;
     description: string;
     description_id?: string; 
     link: string;
     technology: string[];
}

export interface Education {
     id: string;
     institution: string;
     year: string;
     region: string;
     description: string;
     major: string;
}

export interface Profile {
     id: string;
     name: string;
     username: string;
     updatedAt?: string;
     profilePicture?: string;
     socialMedia?: {
          instagram?: string;
          linkedin?: string;
          spotify?: string;
          github?: string;
          mail?: string;
          tiktok?: string;
     }
     bio?: string;
     website?: string;
     sortSettings?: { field: string; direction: "asc" | "desc" };
     categorySortSettings?: {
          [categoryId: string]: {
               type?: "field" | "manual";
               field?: string;
               direction?: "asc" | "desc";
               order?: string[];
          };
     };
}

export interface Link {
     id: string;
     originalUrl: string;
     shortUrl?: string;
     multipleUrls?: {
          url: string; name?: string
     }[];
     useMultipleUrls?: boolean;
     createdAt?: string;
     updatedAt?: string;
     clicks?: number;
     showToPortal?: boolean;
     nameUrl?: string;
     category?: string;
     description?: string;
     price?: number;
     isPinned?: boolean; // New property for pinned links

     // Statistik
     deviceStats?: {
          desktop?: number;
          mobile?: number;
          tablet?: number;
     };
     browserStats?: {
          [key: string]: number;
     }
     geoStats?: {
          [key: string]: number;
     };
     refererStats?: {
          [key: string]: number;
     };

     showConfirmationPage?: boolean;
     confirmationPageSettings?: {
          customMessage?: string;
     };
}
