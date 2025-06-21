"use client";

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { FiExternalLink, FiGithub, FiLinkedin, FiInstagram, FiMail, FiGlobe, FiChevronDown, FiChevronUp, FiShare2 } from 'react-icons/fi';
import { FaSpotify, FaTiktok } from 'react-icons/fa';
import { TbPinned } from 'react-icons/tb';
import { Profile, Link } from '@/lib/types';
import { AnimatePresence, motion } from 'framer-motion';
import { onSnapshot, collection } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';
import { getLinks, getProfile } from '@/lib/service';

interface Category {
     id: string;
     name: string;
}

interface PortalClientProps {
     initialProfile: Profile;
     initialLinks: Link[];
}

const sortLinks = (links: Link[], sortSettings?: { type?: "field" | "manual"; field?: string; direction?: "asc" | "desc"; order?: string[] }): Link[] => {
     if (!sortSettings || sortSettings.type === "manual" || !sortSettings.field) {
          // Sort by pinned first, then by creation date
          return [...links].sort((a, b) => {
               // Pinned links always come first
               if (a.isPinned && !b.isPinned) return -1;
               if (!a.isPinned && b.isPinned) return 1;

               // If both are pinned or both are not pinned, sort by creation date (newest first)
               const dateA = new Date(a.createdAt || '').getTime() || 0;
               const dateB = new Date(b.createdAt || '').getTime() || 0;
               return dateB - dateA;
          });
     }

     return [...links].sort((a, b) => {
          // Always prioritize pinned links first
          if (a.isPinned && !b.isPinned) return -1;
          if (!a.isPinned && b.isPinned) return 1;

          // Then apply custom sorting
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
     // Initialize state dengan initial data (NO LOADING STATE)
     const [profile, setProfile] = useState<Profile>(initialProfile);
     const [links, setLinks] = useState<Link[]>(initialLinks);
     const [activeTab, setActiveTab] = useState<string>('all');
     const [filteredLinks, setFilteredLinks] = useState<Link[]>(initialLinks);
     const [categories, setCategories] = useState<Category[]>(generateCategories(initialLinks));
     const [expandedCard, setExpandedCard] = useState<string | null>(null);

     const filterLinksByCategory = useCallback((category: string, linksList = links) => {
          let filtered: Link[] = [];
          if (category === 'all') {
               filtered = linksList;
          } else {
               filtered = linksList.filter(link =>
                    link.category && link.category.toLowerCase().replace(/\s+/g, '-') === category
               );
          }

          const sortSettings = category === 'all'
               ? profile?.sortSettings
               : profile?.categorySortSettings?.[category] || profile?.sortSettings || { field: "createdAt", direction: "desc" };

          setFilteredLinks(sortLinks(filtered, sortSettings));
     }, [links, profile?.sortSettings, profile?.categorySortSettings]);

     // Setup real-time listeners
     useEffect(() => {
          const profileRef = collection(db, 'profiles');
          const linksRef = collection(db, 'links');

          const unsubscribeProfile = onSnapshot(profileRef, (snapshot) => {
               snapshot.docChanges().forEach((change) => {
                    if (change.type === 'modified' || change.type === 'added') {
                         getProfile().then(profileData => {
                              if (profileData) {
                                   setProfile(profileData);
                              }
                         }).catch(error => {
                              console.error("Error updating profile:", error);
                         });
                    }
               });
          }, (error) => {
               console.error("Profile listener error:", error);
          });

          const unsubscribeLinks = onSnapshot(linksRef, (snapshot) => {
               snapshot.docChanges().forEach((change) => {
                    if (change.type === 'modified' || change.type === 'added' || change.type === 'removed') {
                         getLinks().then(linksData => {
                              const portalLinks = linksData.filter(link => link.showToPortal);
                              setLinks(portalLinks);
                              setCategories(generateCategories(portalLinks));
                              filterLinksByCategory(activeTab, portalLinks);
                         }).catch(error => {
                              console.error("Error updating links:", error);
                         });
                    }
               });
          }, (error) => {
               console.error("Links listener error:", error);
          });

          return () => {
               unsubscribeProfile();
               unsubscribeLinks();
          };
     }, [activeTab, filterLinksByCategory]);

     // Handle URL hash changes
     useEffect(() => {
          const handleHashChange = () => {
               const hash = window.location.hash.slice(1);
               if (hash) {
                    const normalizedHash = hash.toLowerCase().replace(/\s+/g, '-');
                    const categoryExists = categories.some(cat => cat.id === normalizedHash);
                    if (categoryExists) {
                         setActiveTab(normalizedHash);
                         filterLinksByCategory(normalizedHash);
                    }
               }
          };

          handleHashChange();
          window.addEventListener('hashchange', handleHashChange);
          return () => window.removeEventListener('hashchange', handleHashChange);
     }, [categories, filterLinksByCategory]);

     // Update filtered links when profile or activeTab changes
     useEffect(() => {
          filterLinksByCategory(activeTab);
     }, [activeTab, filterLinksByCategory]);

     const handleTabChange = (tabId: string) => {
          setActiveTab(tabId);
          filterLinksByCategory(tabId);

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
          { icon: <FiGithub className="w-5 h-5" />, url: profile?.socialMedia?.github, visible: !!profile?.socialMedia?.github, label: 'GitHub' },
          { icon: <FiLinkedin className="w-5 h-5" />, url: profile?.socialMedia?.linkedin, visible: !!profile?.socialMedia?.linkedin, label: 'LinkedIn' },
          { icon: <FiInstagram className="w-5 h-5" />, url: profile?.socialMedia?.instagram, visible: !!profile?.socialMedia?.instagram, label: 'Instagram' },
          { icon: <FaSpotify className="w-5 h-5" />, url: profile?.socialMedia?.spotify, visible: !!profile?.socialMedia?.spotify, label: 'Spotify' },
          { icon: <FaTiktok className="w-5 h-5" />, url: profile?.socialMedia?.tiktok, visible: !!profile?.socialMedia?.tiktok, label: 'Tiktok' },
          { icon: <FiMail className="w-5 h-5" />, url: profile?.socialMedia?.mail ? `mailto:${profile.socialMedia.mail}` : '', visible: !!profile?.socialMedia?.mail, label: 'Email' },
          { icon: <FiGlobe className="w-5 h-5" />, url: profile?.website, visible: !!profile?.website, label: 'Website' }
     ].filter(link => link.visible);

     return (
          <div className="flex flex-col min-h-screen items-center justify-center">
               <h1 className="sr-only">
                    Tautan penting milik Firtiansyah Okta | OKTAA~ Portal | Discover links to connect with Firtiansyah Okta.
                    {profile?.name ? `Tautan Penting Milik ${profile.name}` : (profile?.username ? `Tautan Penting Milik @${profile.username}` : 'Kumpulan Tautan Penting')}
               </h1>

               <div className="w-full md:max-w-xl overflow-hidden shadow-lg flex flex-col flex-grow mx-auto">
                    <div className="relative h-40 bg-cover object-cover bg-center bg-[url('https://cdn.oktaa.my.id/banner-1200-160.svg')] flex items-center justify-center">
                         {profile?.profilePicture && (
                              <div className="absolute -bottom-10">
                                   <div className="flex relative w-20 h-20 rounded-full border-4 items-center justify-center border-gray-700 overflow-hidden">
                                        <Image
                                             src={profile.profilePicture}
                                             alt={profile.name || "Profile"}
                                             width={80}
                                             height={80}
                                             className="object-cover rounded-full"
                                             priority
                                        />
                                   </div>
                              </div>
                         )}
                         <button onClick={handleShare} aria-label='Share' className="absolute top-3 right-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2 transition-all">
                              <FiShare2 className="w-4 h-4 text-black" />
                         </button>
                    </div>

                    <div className="pt-12 pb-5">
                         <div className="text-center mb-6">
                              <h1 className="text-xl font-bold text-white">@{profile?.username}</h1>
                              <p className="text-gray-500 text-sm my-1">{profile?.name}</p>
                              {profile?.bio && (
                                   <p className="text-gray-400 mt-1 text-sm">{profile.bio}</p>
                              )}
                         </div>

                         <div className="mb-6">
                              <div className="flex p-1 overflow-x-auto pb-3 gap-1">
                                   {categories.map((category) => (
                                        <button
                                             key={category.id}
                                             onClick={() => handleTabChange(category.id)}
                                             className={`flex min-w-12 items-center justify-center shrink-0 px-5 py-2 mx-1 md:px-4 md:py-2 md:mx-1 rounded-full transition-all duration-100 text-sm font-semibold capitalize ${activeTab === category.id
                                                  ? 'bg-white text-black'
                                                  : 'border border-gray-400 text-gray-400 hover:border-white hover:text-white'
                                                  }`}
                                        >
                                             <span>{category.name}</span>
                                        </button>
                                   ))}
                              </div>
                         </div>

                         <div className="space-y-3 mb-6 min-h-56 px-3">
                              {filteredLinks.length > 0 ? (filteredLinks.map((link, index) => (
                                   <motion.div
                                        key={link.id}
                                        initial={{ opacity: 0, x: -20, scale: 0.95 }}
                                        animate={{ opacity: 1, x: 0, scale: 1 }}
                                        transition={{ delay: index * 0.05, type: "spring", stiffness: 100 }}
                                        className="relative border border-gray-700 rounded-lg px-4 py-3 md:py-5 hover:shadow-md hover:border-gray-500 transition-all duration-300 group overflow-hidden shimmer-effect"
                                        role="button"
                                        tabIndex={0}
                                        onKeyDown={(e) => {
                                             if (e.key === 'Enter' || e.key === ' ') {
                                                  e.preventDefault();
                                                  if (link.useMultipleUrls) {
                                                       toggleCard(link.id);
                                                  } else {
                                                       window.open(link.originalUrl, '_blank', 'noopener,noreferrer');
                                                  }
                                             }
                                        }}                                   >
                                        {link.useMultipleUrls ? (
                                             <div
                                                  className="flex items-center justify-between relative z-10 cursor-pointer"
                                                  onClick={() => toggleCard(link.id)}
                                                  aria-expanded={expandedCard === link.id}
                                                  aria-label={`Expand ${link.nameUrl || link.shortUrl} details`}
                                             >
                                                  <div className="flex items-center gap-2">
                                                       {link.isPinned && (
                                                            <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-full p-1 backdrop-blur-sm">
                                                                 <TbPinned className="w-3 h-3 text-yellow-400" />
                                                            </div>
                                                       )}
                                                       <div className="flex flex-col">
                                                            <span className="text-white text-base font-medium truncate">
                                                                 {link.nameUrl || link.shortUrl}
                                                            </span>
                                                       </div>
                                                  </div>
                                                  <motion.div
                                                       animate={{ rotate: expandedCard === link.id ? 180 : 0 }}
                                                       transition={{ duration: 0.3 }}
                                                  >
                                                       {expandedCard === link.id ? (
                                                            <FiChevronUp className="text-gray-400 group-hover:text-white w-5 h-5" />
                                                       ) : (
                                                            <FiChevronDown className="text-gray-400 group-hover:text-white w-5 h-5" />
                                                       )}
                                                  </motion.div>
                                             </div>
                                        ) : (
                                             <a
                                                  href={link.originalUrl}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  className="flex items-center justify-between relative z-10"
                                                  aria-label={`Visit ${link.nameUrl || link.shortUrl}`}
                                             >
                                                  <div className="flex items-center gap-2">
                                                       {link.isPinned && (
                                                            <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-full p-1 backdrop-blur-sm rotate-45">
                                                                 <TbPinned className="w-3 h-3 text-yellow-400" />
                                                            </div>
                                                       )}
                                                       <div className="flex flex-col">
                                                            <span className="text-white text-base font-medium truncate">
                                                                 {link.nameUrl || link.shortUrl}
                                                            </span>
                                                            <span className="text-gray-400 text-sm mt-1">
                                                                 {link.description || ""}
                                                            </span>
                                                       </div>
                                                  </div>
                                                  <FiExternalLink className="text-gray-400 group-hover:text-white w-5 h-5" />
                                             </a>
                                        )}
                                        <AnimatePresence>
                                             {expandedCard === link.id && link.useMultipleUrls && (
                                                  <motion.div
                                                       initial={{ height: 0, opacity: 0 }}
                                                       animate={{ height: "auto", opacity: 1 }}
                                                       exit={{ height: 0, opacity: 0 }}
                                                       transition={{ duration: 0.3, ease: "easeInOut" }}
                                                       className="mt-3 border-t border-gray-600/50 pt-3"
                                                  >
                                                       {link.description && (
                                                            <p className="text-gray-300 text-sm mb-3 px-2">{link.description}</p>
                                                       )}
                                                       {link.price !== undefined && link.price > 0 && (
                                                            <p className="text-white font-normal mb-3 px-2">
                                                                 Harga: <span className='font-bold'>Rp {link.price.toLocaleString('id-ID')}</span>
                                                            </p>
                                                       )}
                                                       {link.multipleUrls && link.multipleUrls.length > 0 && (
                                                            <div className="space-y-2 px-2">
                                                                 {link.multipleUrls.map((urlObj, idx) => (
                                                                      <a
                                                                           key={idx}
                                                                           href={urlObj.url}
                                                                           target="_blank"
                                                                           rel="noopener noreferrer"
                                                                           className="flex items-center text-cyan-500 hover:text-cyan-600 text-sm transition-colors"
                                                                           aria-label={`Visit ${urlObj.name || urlObj.url}`}
                                                                      >
                                                                           <FiExternalLink className="mr-2 w-4 h-4" />
                                                                           <span className="truncate">{urlObj.name || urlObj.url}</span>
                                                                      </a>
                                                                 ))}
                                                            </div>
                                                       )}
                                                  </motion.div>
                                             )}
                                        </AnimatePresence>
                                   </motion.div>
                              ))
                              ) : (
                                   <div className="flex flex-col items-center justify-center h-40 text-gray-400">
                                        <p>No links found in this category</p>
                                   </div>
                              )}
                         </div>

                         {socialLinks.length > 0 && (
                              <div className="flex justify-center space-x-5 mb-5">
                                   {socialLinks.map((social, index) => (
                                        <motion.a
                                             key={index}
                                             href={social.url}
                                             target="_blank"
                                             rel="noopener noreferrer"
                                             initial={{ opacity: 0, y: 20 }}
                                             animate={{
                                                  opacity: 1,
                                                  y: 0,
                                                  transition: { delay: 0.5 + index * 0.1 }
                                             }}
                                             whileHover={{
                                                  scale: 1.2,
                                                  rotate: [0, -10, 10, 0],
                                                  transition: { duration: 0.3 }
                                             }}
                                             className="text-gray-400 hover:text-white transition-colors"
                                             aria-label={`Social link ${index}`}
                                        >
                                             {social.icon}
                                        </motion.a>
                                   ))}
                              </div>
                         )}

                         <div className="flex flex-col items-center">
                              <p className="text-gray-500 text-xs font-semibold">
                                   Copyright {new Date().getFullYear()} - oktaa.my.id
                              </p>
                         </div>
                    </div>
               </div>
          </div>
     );
}