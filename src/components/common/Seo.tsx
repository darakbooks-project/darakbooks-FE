import Head from 'next/head';
import React from 'react';

interface SeoProps {
  title?: string;
  description?: string;
  image?: string;
}

function Seo({ title, description, image }: SeoProps) {
  return (
    <Head>
      <title>{title || '다락책방'}</title>
      <meta
        name='description'
        content={description || '반갑습니다. 다락책방입니다.'}
      />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <meta
        name='keywords'
        content='책, 추천, 책추천, 독서, 독서모임, ChatGPT '
      />
      <meta name='author' content='다락책방' />
      <meta property='og:title' content={title || '다락책방'} />
      <meta property='og:type' content='website' />
      <meta property='og:url' content='darakbooks.vercel.app/' />
      <meta property='og:image' content={image || '/images/seo/og-image.png'} />
      <meta
        property='og:description'
        content={description || '반갑습니다. 다락책방입니다.'}
      />
    </Head>
  );
}

export default Seo;
