import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Dot to Dot | 제47회 동덕여자대학교 실내디자인 졸업전시', description: '각자의 점이 만나, 새로운 공간으로. 2026.10.08–10.18, 동덕여자대학교 디자인 허브.' };
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {return <html lang="ko"><body>{children}</body></html>}
