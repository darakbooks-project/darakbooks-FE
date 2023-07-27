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
      <meta
        property='og:image'
        content={
          image ||
          '로컬 이미지를 웹 페이지에 추가하려면 이미지를 웹 서버에 업로드하고 해당 이미지의 URL을 meta 태그의 content 속성에 지정해야 합니다.'
        }
      />
      <meta
        property='og:description'
        content={description || '반갑습니다. 다락책방입니다.'}
      />
    </Head>
  );
}

export default Seo;
