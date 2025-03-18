import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { SOCIAL_MEDIA } from "@/lib/constants";

const SidebarSocials = () => {
    return (
        <>
            {/* Sidebar untuk layar besar */}
            <div className="hidden md:flex fixed left-6 top-1/2 transform -translate-y-1/2 flex-col space-y-4 text-gray-400 text-2xl">
                {Object.entries(SOCIAL_MEDIA).map(([key, link]) => {
                    const Icon = key === "github" ? FaGithub 
                                : key === "linkedin" ? FaLinkedin 
                                : key === "twitter" ? FaXTwitter
                                : key === "instagram" ? FaInstagram 
                                : IoIosMail;

                    return (
                        <a key={key} href={link} target="_blank" className="hover:text-blue-400 transition">
                            <Icon />
                        </a>
                    );
                })}
            </div>

            {/* Bottom bar untuk layar kecil */}
            <div className="md:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 bg-opacity-90 rounded-full px-6 py-3 flex space-x-4 shadow-lg">
                {Object.entries(SOCIAL_MEDIA).map(([key, link]) => {
                    const Icon = key === "github" ? FaGithub 
                                : key === "linkedin" ? FaLinkedin 
                                : key === "twitter" ? FaXTwitter
                                : key === "instagram" ? FaInstagram 
                                : IoIosMail;

                    return (
                        <a key={key} href={link} target="_blank" className="text-gray-400 text-xl hover:text-blue-400 transition">
                            <Icon />
                        </a>
                    );
                })}
            </div>
        </>
    );
};

export default SidebarSocials;
