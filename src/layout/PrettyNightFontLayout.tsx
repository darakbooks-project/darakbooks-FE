import localFont from 'next/font/local';
import { ReactNode } from 'react';

const prettyNight = localFont({
  src: '../../public/fonts/Cafe24Oneprettynight-v2.0.woff2',
  weight: '400',
  variable: '--prettyNight',
});

function PrettyNightFontLayout({ children }: { children: ReactNode }) {
  return <div className={`${prettyNight.variable}`}>{children}</div>;
}

export default PrettyNightFontLayout;
