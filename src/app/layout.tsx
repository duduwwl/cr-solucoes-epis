import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'CR Soluções em EPIs — Lavras, MG', description: 'Equipamentos de proteção individual para quem faz acontecer. Consulte a equipe CR Soluções em EPIs, em Lavras e região.' };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="pt-BR"><body>{children}</body></html> }

