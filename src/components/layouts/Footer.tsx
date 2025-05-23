/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Profile } from '@/lib/types';
import { db } from "@/lib/firebaseConfig";
import { collection, QueryDocumentSnapshot, DocumentData, getDocs } from 'firebase/firestore';
export default function Footer() {
     const { resolvedTheme } = useTheme();
     const [profile, setProfile] = useState<Profile[]>([]);

     useEffect(() => {
          const fetchData = async <T,>(collectionName: string, setter: (data: T[]) => void) => {
               try {
                    const querySnapshot = await getDocs(collection(db, collectionName));
                    const data = querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
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
                    fetchData<Profile>("profile", setProfile),
               ]);
          };

          loadAllData();
     }, []);
     return (
          <footer className="bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 from-1% backdrop-blur-2xl relative overflow-hidden default-pattern">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 mb-5 md:mb-0">
                    <div className="flex flex-col items-start p-2 md:p-8 space-y-5 md:space-y-0 md:flex-row md:justify-between">
                         <div className="flex flex-col items-start md:space-y-0 md:flex-row md:items-center md:space-x-6">
                              <div className="flex items-start justify-start md:items-center md:justify-center text-lg gap-4 md:gap-6 flex-wrap">
                                   <div className="flex flex-row gap-2">
                                        <div className="relative inline-flex md:mb-2 md:mt-1">
                                             <div className="w-6 h-6 bg-emerald-400 rounded-full" />
                                             <div className="w-6 h-6 bg-emerald-400/50 rounded-full absolute top-0 left-0 animate-ping" />
                                             <div className="w-6 h-6 bg-emerald-400/70 rounded-full absolute top-0 left-0 animate-pulse" />
                                        </div>
                                        <div className="flex flex-wrap md:flex-row items-center gap-2 md:gap-4">
                                             <h3 className="text-lg md:text-2xl md:mb-2 font-semibold font-poppins bg-gradient-to-r from-cyan-500 to-blue-500 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">
                                                  Follow My Journey
                                             </h3>
                                             <span className="text-sm md:text-lg text-gray-600 dark:text-gray-300 font-light font-poppins">Stay in Touch</span>
                                        </div>
                                   </div>
                                   {profile[0]?.socialMedia?.linkedin && (
                                        <a href={profile[0].socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="social-link group relative overflow-hidden">
                                             <span className="text-gray-600 font-semibold dark:text-gray-300 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-all duration-300 group-hover:-translate-y-1 inline-block">LinkedIn</span>
                                             <span className="block h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-cyan-500 to-blue-500 dark:from-cyan-400 dark:to-blue-500 transition-all duration-300 absolute bottom-0 left-0" />
                                        </a>
                                   )}
                                   {profile[0]?.socialMedia?.github && (
                                        <a href={profile[0].socialMedia.github} target="_blank" rel="noopener noreferrer" className="social-link group relative overflow-hidden">
                                             <span className="text-gray-600 font-semibold dark:text-gray-300 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-all duration-300 group-hover:-translate-y-1 inline-block">GitHub</span>
                                             <span className="block h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-cyan-500 to-blue-500 dark:from-cyan-400 dark:to-blue-500 transition-all duration-300 absolute bottom-0 left-0" />
                                        </a>
                                   )}
                                   {profile[0]?.socialMedia?.instagram && (
                                        <a href={profile[0].socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="social-link group relative overflow-hidden">
                                             <span className="text-gray-600 font-semibold dark:text-gray-300 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-all duration-300 group-hover:-translate-y-1 inline-block">Instagram</span>
                                             <span className="block h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-cyan-500 to-blue-500 dark:from-cyan-400 dark:to-blue-500 transition-all duration-300 absolute bottom-0 left-0" />
                                        </a>
                                   )}
                                   {profile[0]?.socialMedia?.mail && (
                                        <a href={`mailto:${profile[0].socialMedia.mail}`} className="social-link group relative overflow-hidden">
                                             <span className="text-gray-600 font-semibold dark:text-gray-300 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-all duration-300 group-hover:-translate-y-1 inline-block">Email</span>
                                             <span className="block h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-cyan-500 to-blue-500 dark:from-cyan-400 dark:to-blue-500 transition-all duration-300 absolute bottom-0 left-0" />
                                        </a>
                                   )}
                              </div>
                         </div>
                         <div className="flex items-start justify-center text left md:mt-2">
                              <p className="text-gray-500 dark:text-gray-400 md:text-right font-semibold">Copyright {new Date().getFullYear()} - <span className="font-semibold">oktaa.my.id</span></p>
                         </div>
                    </div>
               </div>
                  <div className="mx-auto w-full relative z-10 flex justify-center items-center md:pt-20 -bottom-2 backdrop-blur-lg">
                         {resolvedTheme === 'dark' ? (
                               <img
                                     src="https://cdn.oktaa.my.id/banner-footer-light.svg"
                                     alt="Banner Footer Light"
                                     className="w-full"
                               />
                         ) : (
                               <img
                                     src="https://cdn.oktaa.my.id/banner-footer-dark.svg"
                                     alt="Banner Footer Dark"
                                     className="w-full"
                               />
                         )}
                  </div>
          </footer>
     );
}