import Image from 'next/image';

export default function ProjectCard({ 
     title, 
     description, 
     image, 
     technology, 
     link 
}: { 
     title: string; 
     description: string; 
     image: string; 
     technology: string[]; 
     link: string; 
}) {
     return (
          <div className="flex border border-gray-600 rounded-lg shadow-lg hover:shadow-xl transition duration-300 p-4">
               <Image
                    src={image || "/images/profile-dummy.jpg"}
                    alt={title}
                    width={192}
                    height={128}
                    className="object-cover rounded-md mr-4"
               />

               <div className="flex flex-col justify-between flex-1">
                    <div>
                         <h3 className="text-xl font-semibold mb-2">{title}</h3>
                         <p className="text-gray-500 mb-2">{description}</p>
                         <p className="text-sm text-gray-700 font-medium mb-3">
                              <span className="font-semibold">Tech Used:</span> {technology && technology.length > 0 ? technology.join(", ") : "N/A"}
                         </p>
                    </div>
                    <a
                         href={link}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="text-blue-500 hover:underline font-semibold"
                    >
                         View Demo →
                    </a>
               </div>
          </div>
     );
}
