/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'darak-book-bucket.s3.ap-northeast-2.amazonaws.com',
      },
      { protocol: 'https', hostname: 'via.placeholder.com' },
      // {
      //   domains: ['via.placeholder.com'],
      //   formats: ['image/webp'],
      // },
    ],
  },
};

module.exports = nextConfig;
