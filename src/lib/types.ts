export interface Experience {
     id: string;
     company: string;
     role: string;
     year: string;
     description: string;
     logo: string;
     link: string;
     techStack: string[];
}

export interface Project {
     id: string;
     title: string;
     image: string;
     description: string;
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
}
