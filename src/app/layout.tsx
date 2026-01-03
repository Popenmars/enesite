import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/layout/Navbar';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ene.tr | Music Producer & Artist',
  description: 'Multi-genre producer and artist specializing in atmospheric soundscapes, hard-hitting beats, and emotionally resonant compositions.',
  keywords: ['music producer', 'artist', 'song writer'],
  authors: [{ name: 'Ene.tr' }],
  openGraph: {
    title: 'Ene.tr | Music Producer & Artist',
    description: 'Recording Artist, Mix and Mastering Engineer.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ene.tr | Music Producer & Artist',
    description: 'Recording Artist, Mix and Mastering Engineer.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=bespoke-stencil@701&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
