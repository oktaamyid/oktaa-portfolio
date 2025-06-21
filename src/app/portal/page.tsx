import { getLinks, getProfile } from '@/lib/service';
import PortalClient from './PortalClient';
import ErrorFallback from './ErrorFallback';

export default async function PortalPage() {
     try {
          const [profileData, linksData] = await Promise.all([
               getProfile(),
               getLinks()
          ]);

          if (!profileData) {
               return (
                    <div className="flex flex-col min-h-screen items-center justify-center">
                         <div className="text-center text-gray-400">
                              <p>Profile not found</p>
                         </div>
                    </div>
               );
          }

          const portalLinks = linksData.filter(link => link.showToPortal);

          const serializedProfile = JSON.parse(JSON.stringify(profileData));
          const serializedLinks = JSON.parse(JSON.stringify(portalLinks));

          return (
               <PortalClient
                    initialProfile={serializedProfile}
                    initialLinks={serializedLinks}
               />
          );     } catch (error) {
          console.error("Error fetching portal data:", error);
          
          return <ErrorFallback />;
     }
}
