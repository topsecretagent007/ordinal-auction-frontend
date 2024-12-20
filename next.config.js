/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.unisat.io',
        pathname: '/content/**',
      },
    ],
  },
}

module.exports = nextConfig
