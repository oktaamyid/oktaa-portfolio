import { db } from "../../firebaseConfig";
import {
     collection,
     getDocs,
     QueryDocumentSnapshot,
     Timestamp,
} from "firebase/firestore";
import { Link } from "@/lib/types";
import { format } from 'date-fns';

// Convert Firestore document to Link type
const convertDoc = (doc: QueryDocumentSnapshot): Link => {
     const data = doc.data();
     return {
          id: doc.id,
          originalUrl: data.originalUrl,
          shortUrl: data.shortUrl,
          multipleUrls: data.multipleUrls || [],
          useMultipleUrls: data.useMultipleUrls || false,
          createdAt: data.createdAt instanceof Timestamp
               ? format(data.createdAt.toDate(), "dd MMM yyyy HH:mm:ss")
               : data.createdAt,
          updatedAt: data.updatedAt instanceof Timestamp
               ? format(data.updatedAt.toDate(), "dd MMM yyyy HH:mm:ss")
               : data.updatedAt,
          clicks: data.clicks || 0,
          showToPortal: data.showToPortal || false,
          nameUrl: data.nameUrl || "",
          category: data.category || "",
          description: data.description || "",
          price: data.price || 0, // Include price
          deviceStats: data.deviceStats || {},
          browserStats: data.browserStats || {},
          geoStats: data.geoStats || {},
          refererStats: data.refererStats || {},
          showConfirmationPage: data.showConfirmationPage || false,
          confirmationPageSettings: data.confirmationPageSettings || {},
     };
};

// Get all links
export const getLinks = async (): Promise<Link[]> => {
     const querySnapshot = await getDocs(collection(db, "links"));
     return querySnapshot.docs.map(convertDoc);
};