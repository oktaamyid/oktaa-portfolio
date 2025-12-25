import { useState, useEffect } from 'react';
import { collection, getDocs, QueryConstraint, query } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';

export function useCollection<T>(collectionName: string, ...queryConstraints: QueryConstraint[]) {
     const [data, setData] = useState<T[]>([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState<Error | null>(null);

     useEffect(() => {
          const fetchData = async () => {
               try {
                    const ref = collection(db, collectionName);
                    const q = query(ref, ...queryConstraints);
                    const querySnapshot = await getDocs(q);
                    const docs = querySnapshot.docs.map(doc => ({
                         id: doc.id,
                         ...doc.data()
                    })) as T[];
                    setData(docs);
               } catch (err) {
                    setError(err as Error);
                    console.error(`Error fetching collection ${collectionName}:`, err);
               } finally {
                    setLoading(false);
               }
          };

          fetchData();
     }, [collectionName]); // eslint-disable-line react-hooks/exhaustive-deps

     return { data, loading, error };
}
