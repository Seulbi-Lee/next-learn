/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'health.chosun.com',
        port: '',
        pathname: '/site/data/**',
      },
    ]
  }
};

export default nextConfig;
