"use client";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import ProjectCard from "./ui/ProjectCard";

export default function Projects() {
     const [projects, setProjects] = useState<{ title: string; description: string; link: string }[]>([]);

     useEffect(() => {
          async function fetchProjects() {
               const querySnapshot = await getDocs(collection(db, "projects"));
               const projectList = querySnapshot.docs.map((doc) => {
                    const data = doc.data();
                    return {
                         title: data.title || "",
                         description: data.description || "",
                         link: data.link || "",
                    };
               });
               setProjects(projectList);
          }
          fetchProjects();
     }, []);

     return (
          <div className="flex flex-wrap gap-4 justify-center mt-6">
               {projects.length > 0 ? (
                    projects.map((project, index) => <ProjectCard image={""} technology={[]} key={index} {...project} />)
               ) : (
                    <p className="text-gray-400">Loading projects...</p>
               )}
          </div>
     );
}
