import type { Metadata } from 'next';
import './globals.css';
const title = 'Dot to Dot | 제47회 동덕여자대학교 실내디자인 졸업전시';
const description = '각자의 점이 만나, 새로운 공간으로. 2026.10.08–10.18, 동덕여자대학교 디자인 허브.';

export const metadata: Metadata = {
  metadataBase: new URL('https://47thdongduk-interior.art'),
  title,
  description,
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Dot to Dot',
    title,
    description,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-image.png'],
  },
};
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {return <html lang="ko"><body>{children}</body></html>}
