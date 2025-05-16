"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { db } from "@/lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { MY_NAME, SOCIAL_MEDIA } from "@/lib/constants";
import { MdOutlineArrowOutward, MdHourglassEmpty } from "react-icons/md";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";

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
     const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async <T,>(collectionName: string, setter: (data: T[]) => void) => {
            try {
                const querySnapshot = await getDocs(collection(db, collectionName));
                let data = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as T[];

                // Jika collectionName adalah "projects", tambahkan screenshotUrl
                if (collectionName === "projects") {
                    data = await Promise.all(
                        (data as Project[]).map(async (project) => {
                            const screenshotUrl = `https://api.screenshotmachine.com?key=ae018e&url=${encodeURIComponent(project.link)}&dimension=1280x800`;
                            return { ...project, image: screenshotUrl };
                        })
                    ) as T[];
                }

                setter(data);
            } catch (error) {
                console.error(`Error fetching ${collectionName}:`, error);
            }
        };

        const loadAllData = async () => {
            await Promise.all([
                fetchData<Experience>("experience", setExperience),
                fetchData<Project>("projects", setProjects),
            ]);
            setLoading(false);
        };

        loadAllData();
    }, []);

     return (
          <div className="max-w-5xl mx-auto px-4 py-12 space-y-16 mt-5 md:mt-8">

               {/* About Section */}
               <section className="flex flex-col items-center text-center space-y-4 px-6 py-10 sm:px-10 md:px-16 lg:px-20 max-w-3xl mx-auto">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">{MY_NAME}</h1>

                    <span className="bg-gray-800 bg-opacity-40 px-4 py-2 rounded-full text-xs sm:text-sm text-gray-300">
                         Web & Software Developer
                    </span>

                    <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-xl leading-relaxed">
                         Passionate about web development, programming, and staying ahead in the latest technology trends.
                         I specialize in crafting dynamic, interactive, and user-friendly websites while continuously expanding my expertise in modern frameworks, tools, and best practices.
                         Dedicated to delivering innovative solutions, I thrive on learning and adapting to emerging technologies to create impactful digital experiences.
                    </p>

                    {/* Social Media Icons */}
                    <div className="flex space-x-4 mt-4 text-gray-400 text-2xl">
                         <a href={SOCIAL_MEDIA.github} target="_blank" className="hover:text-white transition">
                              <FaGithub />
                         </a>
                         <a href={SOCIAL_MEDIA.linkedin} target="_blank" className="hover:text-blue-400 transition">
                              <FaLinkedin />
                         </a>
                         <a href={SOCIAL_MEDIA.twitter} target="_blank" className="hover:text-blue-500 transition">
                              <FaXTwitter />
                         </a>
                         <a href={SOCIAL_MEDIA.instagram} target="_blank" className="hover:text-pink-400 transition">
                              <FaInstagram />
                         </a>
                         <a href={SOCIAL_MEDIA.email} className="hover:text-red-400 transition">
                              <IoIosMail />
                         </a>
                    </div>
               </section>



               {/* Loading Indicator */}
               {loading ? (
                    <div className="flex flex-col justify-center items-center h-32 animate-fadeIn">
                         <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-70"></div>
                         <p className="text-gray-400 text-lg mt-3 flex items-center gap-2">
                              <MdHourglassEmpty className="text-blue-400 text-2xl animate-pulse" />
                              Loading...
                         </p>
                    </div>

               ) : (
                    <>
                         {/* Experience Section */}
                         <section id="experience">
                              <h2 className="text-3xl font-bold text-white text-start my-4 md:text-center">Experience</h2>
                              {experience.length > 0 ? (
                                   <div className={`${experience.length === 1 ? 'flex justify-center' : 'grid grid-cols-1 md:grid-cols-2'} gap-6`}>
                                        {experience.map((exp) => (
                                             <div
                                                  key={exp.id}
                                                  className={`p-5 rounded-lg shadow-md hover:bg-gray-800 hover:text-white group transition ${experience.length === 1 ? 'w-full md:w-2/3 lg:w-1/2' : ''}`}
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
                         <section id="portfolio">
                              <h2 className="text-3xl font-semibold text-white text-start my-4 md:text-center">Project Highlights</h2>
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
                                                            width={400}
                                                            height={180}
                                                            className="rounded-md"
                                                            unoptimized
                                                       />
                                                       <h3 className="text-xl font-semibold mt-4 transition group-hover:text-blue-400">
                                                            <div className="flex items-center justify-center gap-2">
                                                                 {project.title}
                                                                 <span className="transition transform translate-x-0 translate-y-0 group-hover:translate-x-1 group-hover:-translate-y-1">
                                                                      <MdOutlineArrowOutward size={24} className="w-5 h-5" />
                                                                 </span>
                                                            </div>
                                                       </h3>
                                                       <p className="text-gray-400 mt-2 transition">{project.description}</p>
                                                       <div className="flex flex-wrap gap-2 mt-4 justify-center">
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
                    </>
               )}
          </div>
     );
}
