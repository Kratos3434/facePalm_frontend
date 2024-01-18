/** @type {import('next').NextConfig} */
const nextConfig = {}

// module.exports = nextConfig

module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'res.cloudinary.com',
          // You can add these as well
          // port: '',
          // pathname: 'arifscloud/image/upload/**',
        },
      ],
    },
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://extinct-teal-coveralls.cyclic.app/:path*'
        }
      ]
    }
  }
