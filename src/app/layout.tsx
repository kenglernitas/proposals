import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Keng Lernitas Ekosistem Proposals',
  description: 'Keng Lernitas Ekosistem Governance Proposals (KLEIPs)',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#07171a] text-slate-200`}>
        {children}
      </body>
    </html>
  );
}
