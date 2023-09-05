import { Inter } from 'next/font/google';
import { SyntheticSpace } from '@/components';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Cube',
  description: '',
};

const RootLayout = ({ children }) => (
  <html lang="en" className="h-full">
    <head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <link rel="icon" href="/favicon.png" sizes="any" />
    </head>
    <body className={`${inter.className} relative h-full`}>
      {children}
      <SyntheticSpace />
    </body>
  </html>
);

export default RootLayout;
