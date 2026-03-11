import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kairen Market',
  description: 'Marketplace and service discovery layer for autonomous AI agents in the Kairen ecosystem.',
  metadataBase: new URL('https://market.kairen.xyz'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
