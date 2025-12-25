import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';
import { Project } from '@/lib/types';

export function useProjects() {
     const [projects, setProjects] = useState<Project[]>([]);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
          const fetchProjects = async () => {
               try {
                    const querySnapshot = await getDocs(collection(db, 'projects'));
                    const projectsData = await Promise.all(
                         querySnapshot.docs.map(async (doc) => {
                              const project = { id: doc.id, ...doc.data() } as Project;


                              if (project.link && project.link !== '-' && (!project.image || project.image === '')) {
                                   try {
                                        const response = await fetch(`/api/screenshot?url=${encodeURIComponent(project.link)}`);
                                        if (response.ok) {
                                             const data = await response.json();
                                             project.image = data.screenshotUrl;
                                        }
                                   } catch (error) {
                                        console.error(`Error fetching screenshot:`, error);
                                        project.image = '';
                                   }
                              }

                              return project;
                         })
                    );
                    setProjects(projectsData);
               } catch (error) {
                    console.error('Error fetching projects:', error);
               } finally {
                    setLoading(false);
               }
          };

          fetchProjects();
     }, []);

     return { projects, loading };
}
