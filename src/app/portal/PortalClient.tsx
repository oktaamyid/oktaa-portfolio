"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { FiExternalLink, FiGithub, FiLinkedin, FiInstagram, FiMail, FiGlobe, FiChevronDown, FiChevronUp, FiShare2 } from 'react-icons/fi';
import { FaSpotify, FaTiktok } from 'react-icons/fa';
import { TbPinned } from 'react-icons/tb';
import { Profile, Link } from '@/lib/types';
import { AnimatePresence, motion } from 'framer-motion';
import { usePortalData } from "@/hooks/usePortalData";

interface Category {
     id: string;
     name: string;
}

interface PortalClientProps {
     initialProfile: Profile | null;
     initialLinks: Link[];
}

const sortLinks = (links: Link[], sortSettings?: { type?: "field" | "manual"; field?: string; direction?: "asc" | "desc"; order?: string[] }): Link[] => {
     if (!sortSettings || sortSettings.type === "manual" || !sortSettings.field) {
          return [...links].sort((a, b) => {
               if (a.isPinned && !b.isPinned) return -1;
               if (!a.isPinned && b.isPinned) return 1;

               const dateA = new Date(a.createdAt || '').getTime() || 0;
               const dateB = new Date(b.createdAt || '').getTime() || 0;
               return dateB - dateA;
          });
     }

     return [...links].sort((a, b) => {
          if (a.isPinned && !b.isPinned) return -1;
          if (!a.isPinned && b.isPinned) return 1;

          const { field, direction } = sortSettings;
          let valueA = a[field as keyof Link];
          let valueB = b[field as keyof Link];

          if (field === "price" || field === "clicks") {
               valueA = valueA ?? 0;
               valueB = valueB ?? 0;
               return direction === "asc" ? (valueA as number) - (valueB as number) : (valueB as number) - (valueA as number);
          } else if (field === "createdAt" || field === "updatedAt") {
               valueA = new Date(valueA as string).getTime() || 0;
               valueB = new Date(valueB as string).getTime() || 0;
               return direction === "asc" ? valueA - valueB : valueB - valueA;
          } else {
               valueA = (valueA as string)?.toLowerCase() || "";
               valueB = (valueB as string)?.toLowerCase() || "";
               return direction === "asc"
                    ? valueA.localeCompare(valueB)
                    : valueB.localeCompare(valueA);
          }
     });
};

const generateCategories = (links: Link[]): Category[] => {
     const uniqueCategories = Array.from(
          new Set(links.map(link => link.category).filter(category => category))
     );

     return [
          { id: 'all', name: 'All' },
          ...uniqueCategories.map(category => ({
               id: category!.toLowerCase().replace(/\s+/g, '-'),
               name: category!
          }))
     ];
};

export default function PortalClient({ initialProfile, initialLinks }: PortalClientProps) {
     const { profile, links, loading } = usePortalData();

     const activeProfile = profile || initialProfile;
     const activeLinks = links.length > 0 ? links : initialLinks;

     // Local state
     const [activeTab, setActiveTab] = useState<string>('all');
     const [expandedCard, setExpandedCard] = useState<string | null>(null);

     const categories = useMemo(() => generateCategories(activeLinks), [activeLinks]);

     const filterLinksByCategory = useCallback((category: string, linksList = activeLinks) => {
          let filtered: Link[] = [];
          if (category === 'all') {
               filtered = linksList;
          } else {
               filtered = linksList.filter(link =>
                    link.category && link.category.toLowerCase().replace(/\s+/g, '-') === category
               );
          }

          const sortSettings = category === 'all'
               ? activeProfile?.sortSettings
               : activeProfile?.categorySortSettings?.[category] || activeProfile?.sortSettings || { field: "createdAt", direction: "desc" };

          return sortLinks(filtered, sortSettings);
     }, [activeLinks, activeProfile]);

     const filteredLinks = useMemo(() => filterLinksByCategory(activeTab), [activeTab, filterLinksByCategory]);

     // Handle URL hash changes
     useEffect(() => {
          const handleHashChange = () => {
               const hash = window.location.hash.slice(1);
               if (hash) {
                    const normalizedHash = hash.toLowerCase().replace(/\s+/g, '-');
                    const categoryExists = categories.some(cat => cat.id === normalizedHash);
                    if (categoryExists) {
                         setActiveTab(normalizedHash);
                    }
               }
          };

          handleHashChange();
          window.addEventListener('hashchange', handleHashChange);
          return () => window.removeEventListener('hashchange', handleHashChange);
     }, [categories]); // filterLinksByCategory removed as it's now handled by useMemo

     const handleTabChange = (tabId: string) => {
          setActiveTab(tabId);
          if (tabId === 'all') {
               history.pushState(null, '', window.location.pathname);
          } else {
               window.location.hash = tabId;
          }
     };

     const handleShare = async () => {
          try {
               const shareData = {
                    title: 'Share Portal',
                    text: 'Check out this interesting profile!',
                    url: window.location.href,
               };

               if (navigator.share) {
                    await navigator.share(shareData);
               } else {
                    await navigator.clipboard.writeText(window.location.href);
                    alert('Link has been copied to clipboard!');
               }
          } catch (error) {
               console.error('Error share: ', error);
               if (error instanceof Error && error.name !== 'AbortError') {
                    alert('Failed to share, try again later.');
               }
          }
     };

     const toggleCard = (linkId: string) => {
          setExpandedCard(expandedCard === linkId ? null : linkId);
     };

     const socialLinks = [
          { icon: <FiGithub className="w-5 h-5" />, url: activeProfile?.socialMedia?.github, visible: !!activeProfile?.socialMedia?.github, label: 'GitHub' },
          { icon: <FiLinkedin className="w-5 h-5" />, url: activeProfile?.socialMedia?.linkedin, visible: !!activeProfile?.socialMedia?.linkedin, label: 'LinkedIn' },
          { icon: <FiInstagram className="w-5 h-5" />, url: activeProfile?.socialMedia?.instagram, visible: !!activeProfile?.socialMedia?.instagram, label: 'Instagram' },
          { icon: <FaSpotify className="w-5 h-5" />, url: activeProfile?.socialMedia?.spotify, visible: !!activeProfile?.socialMedia?.spotify, label: 'Spotify' },
          { icon: <FaTiktok className="w-5 h-5" />, url: activeProfile?.socialMedia?.tiktok, visible: !!activeProfile?.socialMedia?.tiktok, label: 'Tiktok' },
          { icon: <FiMail className="w-5 h-5" />, url: activeProfile?.socialMedia?.mail ? `mailto:${activeProfile.socialMedia.mail}` : '', visible: !!activeProfile?.socialMedia?.mail, label: 'Email' },
          { icon: <FiGlobe className="w-5 h-5" />, url: activeProfile?.website, visible: !!activeProfile?.website, label: 'Website' }
     ].filter(link => link.visible);

     return (
          <div className="flex flex-col min-h-screen items-center justify-center bg-black text-white selection:bg-cyan-500/30">
               <h1 className="sr-only">
                    {activeProfile?.username ? `Tautan Penting Milik @${activeProfile.username}` : 'Portal Link'}
               </h1>

               <div className="w-full md:max-w-xl overflow-hidden shadow-2xl flex flex-col grow mx-auto bg-black">
                    <div className="relative h-48 bg-cover object-cover bg-center bg-[url('https://cdn.oktaa.my.id/banner-1200-160.svg')] flex items-center justify-center">
                         <div className="absolute inset-0 bg-black/40 backdrop-blur-xs" />

                         {activeProfile?.profilePicture && (
                              <div className="absolute -bottom-12 z-10">
                                   <div className="flex relative w-24 h-24 rounded-full border-4 items-center justify-center border-black overflow-hidden shadow-2xl">
                                        <Image
                                             src={activeProfile.profilePicture}
                                             alt={activeProfile.name || "Profile"}
                                             width={96}
                                             height={96}
                                             className="object-cover rounded-full"
                                             priority
                                        />
                                   </div>
                              </div>
                         )}
                         <button onClick={handleShare} aria-label='Share' className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 backdrop-blur-md rounded-full p-2.5 transition-all text-white border border-white/10">
                              <FiShare2 className="w-4 h-4" />
                         </button>
                    </div>

                    <div className="pt-16 pb-8 px-6">
                         <div className="text-center mb-8">
                              <h1 className="text-2xl font-bold text-white tracking-tight">@{activeProfile?.username}</h1>
                              <p className="text-zinc-400 text-sm mt-1 mb-2 font-medium tracking-wide">{activeProfile?.name}</p>
                              {activeProfile?.bio && (
                                   <p className="text-zinc-500 text-sm leading-relaxed max-w-sm mx-auto">{activeProfile.bio}</p>
                              )}
                         </div>

                         <div className="mb-8">
                              <div className="flex justify-center flex-wrap gap-2">
                                   {categories.map((category) => (
                                        <button
                                             key={category.id}
                                             onClick={() => handleTabChange(category.id)}
                                             className={`px-4 py-1.5 rounded-full transition-all duration-300 text-xs font-semibold uppercase tracking-wider ${activeTab === category.id
                                                  ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                                                  : 'bg-zinc-900 text-zinc-500 hover:text-white border border-zinc-800 hover:border-zinc-700'
                                                  }`}
                                        >
                                             {category.name}
                                        </button>
                                   ))}
                              </div>
                         </div>

                         <div className="space-y-3 mb-8 min-h-56">
                              {filteredLinks.length > 0 ? (filteredLinks.map((link, index) => (
                                   <motion.div
                                        key={link.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05, ease: "easeOut" }}
                                        className="relative group"
                                   >
                                        <div
                                             className="relative overflow-hidden bg-zinc-900/40 border border-white/5 rounded-xl transition-all duration-300 hover:bg-zinc-900/80 hover:border-white/20 hover:shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                                        >
                                             {link.useMultipleUrls ? (
                                                  <div
                                                       className="flex items-center justify-between p-4 cursor-pointer"
                                                       onClick={() => toggleCard(link.id)}
                                                       role="button"
                                                       tabIndex={0}
                                                  >
                                                       <div className="flex items-center gap-4">
                                                            {link.isPinned && (
                                                                 <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 backdrop-blur-sm">
                                                                      <TbPinned className="w-4 h-4" />
                                                                 </div>
                                                            )}
                                                            <div className="flex flex-col">
                                                                 <span className="text-white font-medium text-sm tracking-wide">
                                                                      {link.nameUrl || link.shortUrl}
                                                                 </span>
                                                            </div>
                                                       </div>
                                                       <motion.div
                                                            animate={{ rotate: expandedCard === link.id ? 180 : 0 }}
                                                            transition={{ duration: 0.3 }}
                                                       >
                                                            <FiChevronDown className="text-zinc-500 group-hover:text-white transition-colors" />
                                                       </motion.div>
                                                  </div>
                                             ) : (
                                                  <a
                                                       href={link.originalUrl}
                                                       target="_blank"
                                                       rel="noopener noreferrer"
                                                       className="flex items-center justify-between p-4"
                                                  >
                                                       <div className="flex items-center gap-4 min-w-0">
                                                            {link.isPinned && (
                                                                 <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 backdrop-blur-sm">
                                                                      <TbPinned className="w-4 h-4" />
                                                                 </div>
                                                            )}
                                                            <div className="flex flex-col min-w-0">
                                                                 <span className="text-white font-medium text-sm tracking-wide truncate pr-2">
                                                                      {link.nameUrl || link.shortUrl}
                                                                 </span>
                                                                 {link.description && (
                                                                      <span className="text-zinc-500 text-xs mt-0.5 truncate">
                                                                           {link.description}
                                                                      </span>
                                                                 )}
                                                            </div>
                                                       </div>
                                                       <FiExternalLink className="shrink-0 text-zinc-600 group-hover:text-white transition-colors w-4 h-4" />
                                                  </a>
                                             )}

                                             <AnimatePresence>
                                                  {expandedCard === link.id && link.useMultipleUrls && (
                                                       <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.3 }}
                                                            className="border-t border-white/5 bg-black/20"
                                                       >
                                                            <div className="p-4 pt-3">
                                                                 {link.description && (
                                                                      <p className="text-zinc-400 text-xs mb-4 leading-relaxed">{link.description}</p>
                                                                 )}
                                                                 {link.price !== undefined && link.price > 0 && (
                                                                      <p className="text-zinc-300 text-xs mb-3">
                                                                           Price: <span className='font-bold text-white'>Rp {link.price.toLocaleString('id-ID')}</span>
                                                                      </p>
                                                                 )}
                                                                 {link.multipleUrls && link.multipleUrls.length > 0 && (
                                                                      <div className="flex flex-col gap-2">
                                                                           {link.multipleUrls.map((urlObj, idx) => (
                                                                                <a
                                                                                     key={idx}
                                                                                     href={urlObj.url}
                                                                                     target="_blank"
                                                                                     rel="noopener noreferrer"
                                                                                     className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-zinc-300 hover:text-white transition-all group/sub border border-white/5 hover:border-white/10"
                                                                                >
                                                                                     <span className="truncate mr-2">{urlObj.name || urlObj.url}</span>
                                                                                     <FiExternalLink className="w-3 h-3 text-zinc-600 group-hover/sub:text-white" />
                                                                                </a>
                                                                           ))}
                                                                      </div>
                                                                 )}
                                                            </div>
                                                       </motion.div>
                                                  )}
                                             </AnimatePresence>
                                        </div>
                                   </motion.div>
                              ))
                              ) : (
                                   <div className="flex flex-col items-center justify-center py-12 text-zinc-600">
                                        <p className="text-sm">No links found in this category</p>
                                   </div>
                              )}
                         </div>

                         {socialLinks.length > 0 && (
                              <div className="flex justify-center gap-6 mb-8">
                                   {socialLinks.map((social, index) => (
                                        <motion.a
                                             key={index}
                                             href={social.url}
                                             target="_blank"
                                             rel="noopener noreferrer"
                                             whileHover={{ y: -3, scale: 1.1 }}
                                             className="text-zinc-600 hover:text-white transition-colors"
                                             aria-label={social.label}
                                        >
                                             {social.icon}
                                        </motion.a>
                                   ))}
                              </div>
                         )}

                         <div className="flex flex-col items-center">
                              <p className="text-zinc-700 text-[10px] uppercase tracking-widest font-medium">
                                   © {new Date().getFullYear()} oktaa.my.id
                              </p>
                         </div>
                    </div>
               </div>
          </div>
     );
}