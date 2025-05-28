import React from "react";
import { metadata } from './metadata';
import PublicTemplate from '@/components/layouts/MainLayout';

export { metadata };

export default function AboutLayout({ children }: { children: React.ReactNode }) {
     return (
          <PublicTemplate>
               {children}
          </PublicTemplate>
     )
}