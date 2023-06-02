/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'darak-book-bucket.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'darak-book-bucket.s3.ap-northeast-2.amazonaws.com',
      },
      { protocol: 'https', hostname: 'via.placeholder.com' },
      { protocol: 'https', hostname: 'search1.kakaocdn.net' },
    ],
  },
};

module.exports = nextConfig;
