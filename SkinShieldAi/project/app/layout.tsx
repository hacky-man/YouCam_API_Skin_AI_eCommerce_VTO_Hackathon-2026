import './globals.css';
import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  title: 'SkinShield AI | Skin health for outdoor athletes',
  description:
    'Scan your skin in seconds and get a daily skincare routine built for training outdoors.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${fraunces.variable}`}>{children}</body>
    </html>
  );
}
