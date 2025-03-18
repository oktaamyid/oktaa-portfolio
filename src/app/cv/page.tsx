"use client";

import { useEffect, useState } from "react";
import Image from 'next/image';
import { db } from "@/lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { MY_NAME } from '@/lib/constants';
import { MdOutlineArrowOutward } from "react-icons/md";
import SidebarSocials from '@/components/sidebarSocials';
interface Experience {
     id: string;
     company: string;
     role: string;
     year: string;
     description: string;
     logo: string;
     link: string;
     techStack: string[];
}

interface Project {
     id: string;
     title: string;
     image: string;
     description: string;
     link: string;
     technology: string[];
}

export default function Portfolio() {
     const [experience, setExperience] = useState<Experience[]>([]);
     const [projects, setProjects] = useState<Project[]>([]);

     useEffect(() => {
          const fetchData = async <T,>(collectionName: string, setter: (data: T[]) => void) => {
               try {
                    const querySnapshot = await getDocs(collection(db, collectionName));
                    const data = querySnapshot.docs.map((doc) => ({
                         id: doc.id,
                         ...doc.data(),
                    })) as T[];
                    setter(data);
               } catch (error) {
                    console.error(`Error fetching ${collectionName}:`, error);
               }
          };

          fetchData<Experience>("experience", setExperience);
          fetchData<Project>("projects", setProjects);
     }, []);

     return (
          <div className="max-w-5xl mx-auto px-6 py-12 space-y-16 mt-16">

               {/* Sidebar Socials */}
               <SidebarSocials />

               {/* About Section */}
               <section className="flex flex-col items-center text-center space-y-5 p-10 max-w-3xl mx-auto">
                    <h1 className="text-5xl font-extrabold text-white tracking-tight">
                         {MY_NAME}
                    </h1>
                    <span className="bg-gray-800 bg-opacity-40 px-4 py-2 rounded-full text-sm text-gray-300">
                         Web & Software Developer
                    </span>
                    <p className="text-gray-300 text-lg max-w-xl">
                         Passionate about web development, programming, and staying ahead in the latest technology trends.
                         I specialize in crafting dynamic, interactive, and user-friendly websites while continuously expanding my expertise in modern frameworks, tools, and best practices.
                         Dedicated to delivering innovative solutions, I thrive on learning and adapting to emerging technologies to create impactful digital experiences.
                    </p>
               </section>

               {/* Experience Section */}
               <section>
                    {experience.length > 0 ? (
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {experience.map((exp) => (
                                   <div
                                        key={exp.id}
                                        className="p-5 rounded-lg shadow-md hover:bg-gray-800 hover:text-white group transition"
                                   >
                                        {/* Header: Logo + Company Name */}
                                        <div className="flex items-center gap-4">
                                             <Image
                                                  src={exp.logo}
                                                  alt={`${exp.company} Logo`}
                                                  width={25}
                                                  height={25}
                                                  className="w-10 h-10 rounded-full border border-gray-600"
                                                  unoptimized={true}
                                             />
                                             <div>
                                                  <a href={exp.link} className="text-xl font-semibold transition group-hover:text-blue-400">
                                                       <div className="flex items-center gap-2">
                                                            {exp.company}
                                                            <span className="transition transform translate-x-0 translate-y-0 group-hover:translate-x-1 group-hover:-translate-y-1">
                                                                 <MdOutlineArrowOutward size={24} className="w-5 h-5" />
                                                            </span>

                                                       </div>
                                                  </a>
                                                  <p className="text-gray-400 text-sm">{exp.role} • {exp.year}</p>
                                             </div>
                                        </div>

                                        {/* Description */}
                                        <p className="text-gray-300 mt-3 transition">{exp.description}</p>

                                        {/* Tech Stack */}
                                        <div className="flex flex-wrap gap-2 mt-4">
                                             {exp.techStack.map((tech) => (
                                                  <span
                                                       key={tech}
                                                       className="inline-flex items-center px-3 py-2 bg-blue-600/30 backdrop-blur-md text-white text-xs font-medium rounded-full shadow-md"
                                                  >
                                                       {tech}
                                                  </span>
                                             ))}
                                        </div>
                                   </div>
                              ))}
                         </div>
                    ) : (
                         <p className="text-gray-500">No experience data available.</p>
                    )}
               </section>

               {/* Projects Section */}
               <section>
                    {projects.length > 0 ? (
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {projects.map((project) => (
                                   <div
                                        key={project.id}
                                        className="p-4 rounded-lg shadow-md hover:bg-gray-800 hover:text-white group"
                                   >
                                        <a href={project.link} target="_blank" rel="noreferrer">
                                             <Image
                                                  src={project.image}
                                                  alt={project.title}
                                                  width={320}
                                                  height={180}
                                                  className="rounded-md"
                                             />
                                             <h3 className="text-xl font-semibold mt-4 transition group-hover:text-blue-400">
                                                  <div className="flex items-center gap-2">
                                                       {project.title}
                                                       <span className="transition transform translate-x-0 translate-y-0 group-hover:translate-x-1 group-hover:-translate-y-1">
                                                            <MdOutlineArrowOutward size={24} className="w-5 h-5" />
                                                       </span>
                                                  </div>
                                             </h3>
                                             <p className="text-gray-400 mt-2 transition">
                                                  {project.description}
                                             </p>
                                             <div className="flex flex-wrap gap-2 mt-4">
                                                  {project.technology.map((tech) => (
                                                       <span
                                                            key={tech}
                                                            className="inline-flex items-center px-3 py-2 bg-blue-600/30 backdrop-blur-md text-white text-xs font-medium rounded-full shadow-md"
                                                       >
                                                            {tech}
                                                       </span>
                                                  ))}
                                             </div>

                                        </a>
                                   </div>
                              ))}
                         </div>
                    ) : (
                         <p className="text-gray-500">No projects available.</p>
                    )}
               </section>

          </div>
     );
}
