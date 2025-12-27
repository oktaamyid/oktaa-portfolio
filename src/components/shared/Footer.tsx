/* eslint-disable @next/next/no-img-element */
'use client';

import Link from 'next/link';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Profile } from '@/lib/types';
import { db } from "@/lib/firebaseConfig";
import { collection, QueryDocumentSnapshot, DocumentData, getDocs } from 'firebase/firestore';
import Magnetic from '../ui/Magnetic';
import { useLanguage } from '@/contexts/LanguageContext';


export function Footer() {
     const { t } = useLanguage();
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

     const socialLinks = [
          {
               name: 'GitHub',
               href: profile[0]?.socialMedia?.github || 'https://github.com/Tayen15',
               enabled: !!profile[0]?.socialMedia?.github || true,
               icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                         <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
               )
          },
          {
               name: 'LinkedIn',
               href: profile[0]?.socialMedia?.linkedin || '#',
               enabled: !!profile[0]?.socialMedia?.linkedin,
               icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                         <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
               )
          },
          {
               name: 'Instagram',
               href: profile[0]?.socialMedia?.instagram || '#',
               enabled: !!profile[0]?.socialMedia?.instagram,
               icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                         <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
               )
          },
          {
               name: 'Email',
               href: profile[0]?.socialMedia?.mail ? `mailto:${profile[0].socialMedia.mail}` : '#',
               enabled: !!profile[0]?.socialMedia?.mail,
               icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
               )
          },
          {
               name: 'Portal',
               href: '/portal',
               enabled: true,
               icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
               )
          },
     ];

     const menuLinks = [
          { name: t('HOME', 'BERANDA'), href: '/' },
          { name: t('ABOUT', 'TENTANG'), href: '/about' },
          { name: t('PROJECTS', 'PROYEK'), href: '/projects' },
          { name: t('SONGS', 'LAGU'), href: '/songs' },
     ];

     return (
          <footer
               className="relative overflow-hidden text-white bg-black"
          >
               {/* Glassmorphism Content Container */}
               <div
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col md:flex-row items-center text-center md:items-start md:text-left md:justify-between p-4 md:p-8 gap-8">
                         {/* Left Section - CTA */}
                         <div className="flex flex-col gap-6 max-w-lg items-center md:items-start">
                              <h3
                                   className="text-3xl md:text-5xl font-bold font-poppins uppercase leading-snug text-center md:text-left"
                              >
                                   {t("Let's Build Something Amazing Together!", "Mari Membangun Sesuatu yang Luar Biasa Bersama!")}
                              </h3>
                              {/* Social Icons */}
                              <div className="flex gap-4 justify-center md:justify-start">
                                   {socialLinks.filter(link => link.enabled).map((social) => (
                                        <Magnetic key={social.name} strength={0.4}>
                                             <a
                                                  href={social.href}
                                                  target={social.href.startsWith('http') ? '_blank' : undefined}
                                                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                                  className="w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group relative"
                                                  style={{
                                                       backdropFilter: 'blur(20px) saturate(180%)',
                                                       WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                                                       background: 'rgba(var(--surface-rgb), 0.8)',
                                                       border: '1px solid rgba(var(--border-rgb), 0.3)',
                                                       color: 'rgb(var(--text))',
                                                  }}
                                                  aria-label={social.name}
                                             >
                                                  <div className="w-6 h-6 flex items-center justify-center">
                                                       {social.icon}
                                                  </div>
                                             </a>
                                        </Magnetic>
                                   ))}
                              </div>

                              {/* Copyright Only (Simplified) */}
                              <div className="flex flex-col gap-2 text-sm font-light text-zinc-500">
                                   <p className="text-xs font-bold">
                                        © {new Date().getFullYear()} OKTAAMYID. {t("All Rights Reserved.", "Hak Cipta Dilindungi.")}
                                   </p>
                              </div>
                         </div>

                         {/* Right Section - Menu Navigation */}
                         <div className="hidden md:flex flex-col items-start md:items-end gap-6">
                              <h4
                                   className="text-3xl md:text-5xl font-semibold font-poppins"
                              >
                                   MENU
                              </h4>
                              <nav className="flex flex-col items-start md:items-end gap-4">
                                   {menuLinks.map((link) => (
                                        <Link
                                             key={link.name}
                                             href={link.href}
                                        >
                                             <motion.span
                                                  initial="initial"
                                                  whileHover="hover"
                                                  whileTap="hover"
                                                  whileFocus="hover"
                                                  className="text-lg md:text-2xl font-light relative uppercase tracking-wider inline-block text-zinc-400 hover:text-white transition-colors duration-300"
                                             >
                                                  {link.name}
                                                  <motion.span
                                                       variants={{
                                                            initial: { scaleX: 0, originX: 1 },
                                                            hover: { scaleX: 1, originX: 0 }
                                                       }}
                                                       transition={{ duration: 0.5, ease: "easeOut", originX: { duration: 0 } }}
                                                       className="absolute -bottom-1 left-0 w-full h-0.5 bg-white"
                                                  />
                                             </motion.span>
                                        </Link>
                                   ))}
                              </nav>
                         </div>
                    </div>
               </div>

               {/* Banner Image with Glassmorphism Effect */}
               <div
                    className="mx-auto w-full relative z-10 flex justify-center items-center md:pt-10 -bottom-2 px-6"
               >
                    <img
                         src="https://cdn.oktaa.my.id/banner-footer-dark.svg"
                         alt="Banner Footer Dark"
                         className="max-w-6xl w-full mix-blend-screen"
                         loading="lazy"
                    />
               </div>
          </footer>
     );
}
