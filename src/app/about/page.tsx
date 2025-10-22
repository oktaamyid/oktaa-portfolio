"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { skillsData } from '@/lib/constants';
import { Education, Experience } from '@/lib/types';
import { db } from "@/lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { ReactTyped } from 'react-typed';

export default function About() {
     const refSkills = useRef(null);
     const isInViewSkills = useInView(refSkills, { once: true, margin: "-100px" });
     const [educations, setEducations] = useState<Education[]>([]);
     const [experiences, setExperiences] = useState<Experience[]>([]);

     // Variants for animations
     const fadeInUp = {
          hidden: { opacity: 0, y: 20 },
          visible: {
               opacity: 1,
               y: 0,
               transition: {
                    duration: 0.6,
                    ease: "easeOut",
               },
          },
     };

     const staggerContainer = {
          hidden: { opacity: 0 },
          visible: {
               opacity: 1,
               transition: {
                    staggerChildren: 0.2,
               },
          },
     };

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

          const loadAllData = async () => {
               await Promise.all([
                    fetchData<Education>("education", setEducations),
                    fetchData<Experience>("experience", setExperiences),
               ]);
          };

          loadAllData();

     }, []);

     return (
          <>
               {/* Hero/About Section */}
               <motion.section
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    id="about"
                    className="min-h-[40vh] py-20 relative overflow-hidden"
               >
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-4">
                         <div className="text-start px-4 z-10 relative">
                              <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl font-extrabold font-poppins text-gray-900 dark:text-white mb-6">
                                   I&apos;m{" "}
                                   <span className="text-cyan-500 dark:text-cyan-400 bg-clip-text bg-gradient-to-r from-cyan-500 to-gray-500 dark:from-cyan-400 dark:to-gray-400">
                                        <ReactTyped
                                             strings={[
                                                  "OKTAA",
                                                  "Firtiansyah Okta Resama",
                                                  "Full Stack Developer"
                                             ]}
                                             typeSpeed={150}
                                             backDelay={75}
                                             loop
                                        >
                                        </ReactTyped>
                                   </span>
                              </motion.h1>
                              <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-4xl">
                                   A passionate Full-Stack Developer crafting{" "}
                                   <span className="text-cyan-500 dark:text-cyan-400">scalable</span> and user-friendly digital solutions
                              </motion.p>
                              <motion.a
                                   variants={fadeInUp}
                                   href="https://www.linkedin.com"
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   className="inline-block text-white font-semibold bg-gray-900 py-2 px-4 hover:bg-gray-900/95 dark:hover:bg-white/75 rounded-md dark:bg-white dark:text-black transition-all duration-300 shadow-lg"
                                   whileTap={{ scale: 0.95 }}
                              >
                                   Connect to LinkedIn
                              </motion.a>
                         </div>
                    </div>
               </motion.section>

               {/* Technical Skills and Experiences Section */}
               <motion.section
                    ref={refSkills}
                    initial="hidden"
                    animate={isInViewSkills ? "visible" : "hidden"}
                    variants={staggerContainer}
                    id="skills"
                    className="py-12 bg-gray-200 dark:bg-gray-900 border-y border-gray-600/30 no-pattern z-50 relative"
               >
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                         <div className="flex flex-col gap-4">
                              {/* Technical Skills */}
                              <div>
                                   <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold font-poppins text-gray-900 dark:text-white mb-6">
                                        Technical Skills
                                   </motion.h2>
                                   <motion.div variants={staggerContainer} className="space-y-1">
                                        {skillsData.map((skill, index) => (
                                             <motion.div key={index} variants={fadeInUp} className="flex flex-col md:flex-row gap-1">
                                                  <motion.h3 variants={fadeInUp} className="text-base font-semibold text-gray-900 dark:text-gray-500">
                                                       {skill.category}:
                                                  </motion.h3>
                                                  <p className="text-gray-600 dark:text-gray-200 md:w-3/4">{skill.skills}</p>
                                             </motion.div>
                                        ))}
                                   </motion.div>
                              </div>

                              {/* Experiences */}
                              <div>
                                   <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold font-poppins text-gray-900 dark:text-white mb-6">
                                        Experience
                                   </motion.h2>
                                   <motion.div variants={staggerContainer} className="space-y-8">
                                        {experiences.length > 0 ? (
                                             experiences.map((experience) => (
                                                  <motion.div
                                                       key={experience.id}
                                                       variants={fadeInUp}
                                                       className="relative"
                                                  >
                                                       {/* Company and Role */}
                                                       <div className="flex items-start flex-col-reverse md:flex-row md:justify-between">
                                                            <div>
                                                                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                                      {experience.link ? (
                                                                           <a
                                                                                href={experience.link}
                                                                                target="_blank"
                                                                                rel="noopener noreferrer"
                                                                                className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
                                                                           >
                                                                                {experience.company}
                                                                           </a>
                                                                      ) : (
                                                                           experience.company
                                                                      )}
                                                                 </h3>
                                                                 <p className="text-gray-900 dark:text-white font-medium">
                                                                      {experience.role}
                                                                 </p>
                                                            </div>
                                                            <span className="text-gray-600 dark:text-gray-300 text-sm font-medium whitespace-nowrap">
                                                                 {experience.year}
                                                            </span>
                                                       </div>

                                                       {/* Description */}
                                                       {experience.description && (
                                                            <p className="text-gray-600 dark:text-gray-300 mb-3 leading-relaxed">
                                                                 {experience.description}
                                                            </p>
                                                       )}

                                                       {/* Tech Stack */}
                                                       {experience.techStack && experience.techStack.length > 0 && (
                                                            <div className="">
                                                                 <span className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                                                                      Tech Stack: {experience.techStack.join(', ')}
                                                                 </span>
                                                            </div>
                                                       )}
                                                  </motion.div>
                                             ))
                                        ) : (
                                             <motion.div variants={fadeInUp} className="text-center py-8">
                                                  <p className="text-gray-600 dark:text-gray-300">
                                                       No experience data available
                                                  </p>
                                             </motion.div>
                                        )}
                                   </motion.div>
                              </div>
                         </div>
                    </div>
               </motion.section>

               {/* Education Section */}
               <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    id="education"
                    className="py-16 relative overflow-hidden"
               >
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                         <motion.h2
                              variants={fadeInUp}
                              className="text-4xl md:text-5xl font-bold text-start font-poppins z-10 text-gray-900 dark:text-white mb-12"
                         >
                              Education
                         </motion.h2>

                         <motion.div variants={staggerContainer} className="relative space-y-12 pl-8">
                              {/* Vertical Line for Timeline */}
                              <div className="absolute left-[30px] w-1 h-full top-1 bg-gradient-to-b from-cyan-500 to-gray-500 dark:from-cyan-400 dark:to-gray-400 opacity-50"
                              />

                              {educations.length > 0 ? (
                                   educations.map((education, index) => (
                                        <div
                                             key={education.id}
                                             className="relative group"
                                             style={{ marginBottom: index < educations.length - 1 ? '3rem' : '0' }} >

                                             {/* Circle for Timeline */}
                                             <div className="w-6 h-6 bg-cyan-500 dark:bg-cyan-400 rounded-full absolute left-0 transform -translate-x-1/2 top-1 z-10 group-hover:scale-125 transition-transform duration-300" />

                                             <div className="pl-8">
                                                  <h3 className="text-xl font-semibold font-poppins text-gray-900 dark:text-white">
                                                       {education.institution}
                                                  </h3>
                                                  <p className="text-gray-600 dark:text-gray-300">
                                                       {education.major && `Major in ${education.major}`}
                                                  </p>
                                                  {education.description && (
                                                       <p className="text-gray-600 dark:text-gray-300 mt-1">
                                                            {education.description}
                                                       </p>
                                                  )}
                                                  <p className="text-gray-600 dark:text-gray-300 font-semibold mt-2">
                                                       {education.region} / {education.year}
                                                  </p>
                                             </div>
                                        </div>
                                   ))
                              ) : (
                                   <motion.div variants={fadeInUp} className="text-center">
                                        <p className="text-gray-600 dark:text-gray-300">
                                             No education data available
                                        </p>
                                   </motion.div>
                              )}
                         </motion.div>
                    </div>
               </motion.section>
          </>
     );
}