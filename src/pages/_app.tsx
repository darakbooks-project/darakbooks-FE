import '@/styles/globals.css';

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { Lato, Noto_Sans_KR } from 'next/font/google';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { ReactElement, useEffect, useState } from 'react';
import { RecoilRoot } from 'recoil';

import { useLoading } from '@/hooks/useRouterLoading';
import { GA_TRACKING_ID, pageview } from '@/lib/gtag';
import { NextPageWithLayout } from '@/types/layout';

const LoginModal = dynamic(() => import('@/components/auth/LoginModal'));
const LoadingSpinner = dynamic(
  () => import('@/components/common/LoadingSpinner'),
);

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}

const notoSans = Noto_Sans_KR({
  preload: false,
  weight: ['400', '500', '700'],
});

const lato = Lato({
  preload: false,
  weight: ['400', '700'],
  variable: '--lato',
});

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const { nowLoading } = useLoading();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  );
  const [hydrated, setHydrated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  if (!hydrated) return null;

  const getLayout =
    Component.getLayout || ((page: ReactElement) => <>{page}</>);

  return (
    <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
      </Head>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy='afterInteractive'
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <RecoilRoot>
            <main className={`${notoSans.className} ${lato.variable} h-full`}>
              {nowLoading && <LoadingSpinner />}
              {getLayout(<Component {...pageProps} />)}
              <LoginModal />
            </main>
          </RecoilRoot>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}
