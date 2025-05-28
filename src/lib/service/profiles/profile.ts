import { db } from "../../firebaseConfig";
import { 
     doc, 
     getDoc 
} from "firebase/firestore";

import { Profile } from "@/lib/types";

const PROFILE_COLLECTION = "profile"; // atau "profiles" - pilih satu dan konsisten
const PROFILE_ID = "Z1EYXQESzJttuFME0wuT";

export async function getProfile(): Promise<Profile | null> {
     try {
          const profileRef = doc(db, PROFILE_COLLECTION, PROFILE_ID);
          const profileSnap = await getDoc(profileRef);

          if (profileSnap.exists()) {
               return { id: profileSnap.id, ...profileSnap.data() } as Profile;
          }
          return null;
     } catch (error) {
          console.error("Error getting profile:", error);
          throw new Error("Failed to fetch profile");
     }
}