/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["visionz-upload-07e1217f1104513b7d9dc240b45787b20a9aeadd.s3.us-west-2.amazonaws.com"],
    
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
