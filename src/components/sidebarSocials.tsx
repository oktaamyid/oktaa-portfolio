import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { SOCIAL_MEDIA } from '@/lib/constants';

const SidebarSocials = () => {
    return (
        <div className="fixed left-6 top-1/2 transform -translate-y-1/2 flex flex-col space-y-5 text-gray-400 text-2xl">
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
    );
};

export default SidebarSocials;
