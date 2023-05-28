import '@/styles/globals.css';

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import React, { ReactElement } from 'react';
import { RecoilRoot } from 'recoil';

import LoginModal from '@/components/auth/LoginModal';
import Layout from '@/layout/Layout';
import { NextPageWithLayout } from '@/types/layout';

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = React.useState(
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
  const getLayout =
    Component.getLayout || ((page: ReactElement) => <Layout>{page}</Layout>);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <RecoilRoot>
          {getLayout(<Component {...pageProps} />)}
          <LoginModal />
        </RecoilRoot>
      </Hydrate>
    </QueryClientProvider>
  );
}
