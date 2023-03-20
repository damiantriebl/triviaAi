import '@/styles/globals.css';
import React from 'react';
import { Press_Start_2P } from 'next/font/google';

const press2p = Press_Start_2P({
  weight: '400',
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log('enviroment Variable', process.env.apiKEY)
  return (
    <html className={press2p.className}>
      <head>
        <title>IA Trivia</title>
      </head>
      <body className={`${press2p.className} overflow-hidden bg-zinc-900`}>
        <div className="absolute h-fit w-fit bg-[url('./background.svg')] bg-cover 		">
          {children}
        </div>
      </body>
    </html>
  );
}
