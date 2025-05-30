import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
     title: '404 - Page Not Found | OKTAA~',
     description: "The page you're looking for doesn't exist. Return to the homepage to explore more."
}

export default function NotFoundCatchAll() {
     notFound(); 
}