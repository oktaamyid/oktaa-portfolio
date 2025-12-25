import { useState, useEffect } from 'react';
import { doc, onSnapshot, collection, query, orderBy, where } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';
import { Profile, Link } from '@/lib/types';

export function usePortalData() {
     const [profile, setProfile] = useState<Profile | null>(null);
     const [links, setLinks] = useState<Link[]>([]);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
          // 1. Subscribe to Profile
          const profileRef = doc(db, 'settings', 'profile');
          const unsubscribeProfile = onSnapshot(profileRef, (docSnap) => {
               if (docSnap.exists()) {
                    setProfile({ id: docSnap.id, ...docSnap.data() } as Profile);
               }
          });

          // 2. Subscribe to Links (showing only visible ones)
          const linksRef = collection(db, 'links');
          const q = query(
               linksRef,
               where('showToPortal', '==', true),
               orderBy('createdAt', 'desc')
          );

          const unsubscribeLinks = onSnapshot(q, (snapshot) => {
               const fetchedLinks = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
               })) as Link[];
               setLinks(fetchedLinks);
               setLoading(false);
          });

          return () => {
               unsubscribeProfile();
               unsubscribeLinks();
          };
     }, []);

     return { profile, links, loading };
}
