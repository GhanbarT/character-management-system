import { Playfair_Display, Vazirmatn } from 'next/font/google';

export const VazirmatnFont = Vazirmatn({
  subsets: ['arabic', 'latin'],
});

export const Playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});
