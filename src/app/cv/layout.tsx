import { metadata } from "./metadata";

export { metadata }; // Pastikan ini diekspor agar Next.js membacanya

export default function Portfolio({ children }: { children: React.ReactNode }) {
     return <>{children}</>;
}
