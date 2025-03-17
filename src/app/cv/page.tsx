"use client";

import { useEffect, useState } from "react";
import Image from 'next/image';
import { db } from "@/lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { MY_NAME, MY_LOCATION, SOCIAL_MEDIA } from '@/lib/constants';
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import ProjectCard from '@/components/ui/ProjectCard';

interface Education {
     id: string;
     school: string;
     degree: string;
     year: string;
}

interface Experience {
     id: string;
     company: string;
     duration: number;
     role: string;
     year: string;
     type: string;
     logo: string;
}

interface Project {
     id: string;
     title: string;
     image: string;
     technology: string[];
     description: string;
     link: string;
}

export default function CV() {
     const [education, setEducation] = useState<Education[]>([]);
     const [experience, setExperience] = useState<Experience[]>([]);
     const [projects, setProjects] = useState<Project[]>([]);

     useEffect(() => {
          const fetchData = async <T,>(collectionName: string, setter: (data: T[]) => void) => {
               const querySnapshot = await getDocs(collection(db, collectionName));
               const data = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
               })) as T[];
               setter(data);
          };
     
          fetchData<Education>("education", setEducation);
          fetchData<Experience>("experience", setExperience);
          fetchData<Project>("projects", setProjects);
     }, []);
     

     return (
          <div className="container mx-auto px-6 py-12 space-y-12">
               <main className="mt-24 max-w-3xl w-full p-6 mx-auto space-y-12">
                    {/* About Me */}
                    <section className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6">

                         <div className="md:w-2/3">
                              <h1 className="text-3xl font-bold">{MY_NAME}</h1>
                              <p className="my-2 text-gray-600">
                                   Saya adalah seorang pengembang web dan software dengan minat dalam teknologi modern.
                              </p>
                              <a className="mt-2 text-blue-500 hover:underline" href="https://maps.app.goo.gl/oEwg1oEqSMaLQCJZ7">{MY_LOCATION}</a>
                              <div className="mt-4 flex gap-4 justify-center md:justify-start text-gray-600">
                                   <a href={SOCIAL_MEDIA.github} target="_blank" className="hover:text-black">
                                        <FaGithub size={28} />
                                   </a>
                                   <a href={SOCIAL_MEDIA.linkedin} target="_blank" className="hover:text-blue-700">
                                        <FaLinkedin size={28} />
                                   </a>
                                   <a href="https://twitter.com/" target="_blank" className="hover:text-blue-500">
                                        <FaTwitter size={28} />
                                   </a>
                              </div>
                         </div>
                         <div className="md:w-1/3 flex justify-center">
                              <Image src="/images/profile.jpg" alt="Profile" width={128} height={128} className="rounded-full shadow-lg object-cover" />
                         </div>
                    </section>

                    {/* Education */}
                    <section>
                         <h2 className="text-2xl font-bold mb-4">Education</h2>
                         <div className="space-y-4">
                              {education.map((edu) => (
                                   <div key={edu.id}>
                                        <div className="flex justify-between">
                                             <h3 className="text-xl font-semibold">{edu.school}</h3>
                                             <p className="text-gray-400">{edu.year}</p>
                                        </div>
                                        <p className="text-gray-500">{edu.degree}</p>
                                   </div>
                              ))}
                         </div>
                    </section>

                    {/* Experience */}
                    <section>
                         <h2 className="text-2xl font-bold mb-4">Experience</h2>
                         <div className="space-y-4">
                              {experience.map((exp) => {
                                   // Hitung durasi dalam bulan/tahun
                                   const categorizeDuration = (duration: number) => {
                                        return duration >= 12 ? `${duration / 12} tahun` : `${duration} bulan`;
                                   };

                                   return (
                                        <div key={exp.id} className="border p-4 rounded-lg border-gray-600 text-white">
                                             <div className="flex items-center gap-4">
                                                  {/* Logo Perusahaan */}
                                                  {exp.logo && (
                                                       <Image
                                                            src={exp.logo}
                                                            alt={exp.company}
                                                            className="w-12 h-12 rounded-full object-cover border border-gray-500"
                                                            width={48}
                                                            height={48}
                                                       />
                                                  )}

                                                  {/* Detail Pekerjaan */}
                                                  <div className="flex-1">
                                                       <div className="flex justify-between items-center">
                                                            <h3 className="text-xl font-semibold">{exp.company}</h3>
                                                            <p className="text-gray-400">{exp.year}</p>
                                                       </div>
                                                       <p className="text-gray-300">{exp.role}</p>
                                                       <p className="text-gray-400 text-sm"><span className="">{exp.type}</span> • {categorizeDuration(exp.duration)}</p>
                                                  </div>
                                             </div>
                                        </div>
                                   );
                              })}
                         </div>
                    </section>

                    {/* Tech Stack */}
                    <section>
                         <h2 className="text-2xl font-bold mb-4">Tech Stack</h2>
                         <div className="flex flex-wrap gap-4">
                              {["JavaScript", "TypeScript", "React", "Next.js", "Firebase", "Tailwind CSS"].map((tech) => (
                                   <span key={tech} className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md">
                                        {tech}
                                   </span>
                              ))}
                         </div>
                    </section>

                    {/* Projects */}
                    <section id="portofilo">
                         <h2 className="text-2xl font-bold mb-6">Projects</h2>
                         <div className="grid gap-6">
                              {projects.map((project) => (
                                   <ProjectCard
                                        key={project.id}
                                        title={project.title}
                                        description={project.description}
                                        image={project.image}
                                        technology={project.technology}
                                        link={project.link}
                                   />
                              ))}
                         </div>
                    </section>
               </main>
          </div>
     );
}

