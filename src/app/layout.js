import SyntheticSpace from '@/components/syntheticSpace';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Cube',
  description: '',
};

const RootLayout = ({ children }) => (
  <html lang="en">
    <body className={`${inter.className} relative`}>
      {children}
      <SyntheticSpace />
    </body>
  </html>
);

export default RootLayout;
