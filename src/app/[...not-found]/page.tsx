import Link from "next/link";
import { Button } from "@/components/ui/button";
import PublicTemplate from '@/components/layouts/MainLayout';

export default function NotFound() {
     return (
          <PublicTemplate>
               <div className="min-h-screen flex flex-col items-center justify-center  relative overflow-hidden">
                    <div className="text-center z-10">
                         <h1 className="text-9xl md:text-[12rem] font-extrabold font-poppins text-cyan-400 dark:text-cyan-300 mb-4">
                              404
                         </h1>
                         <h2 className="text-2xl md:text-4xl font-semibold text-gray-900 dark:text-gray-200 mb-6">
                              Oops! Page Not Found
                         </h2>
                         <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl mb-8 max-w-md mx-auto">
                              Whoops! Looks like you took a wrong turn. This page is playing hide and seek, and it&apos;s winning! Let&apos;s head back home before we get more lost. 🏃‍♂️
                         </p>
                         <Link href="/">
                              <Button className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300">
                                   Back to Home
                              </Button>
                         </Link>
                    </div>
               </div>
          </PublicTemplate>
     );
}