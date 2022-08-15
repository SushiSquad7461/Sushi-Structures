/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://sushi-structeres.herokuapp.com/:path*',
      },
    ]
  },
}

module.exports = nextConfig
