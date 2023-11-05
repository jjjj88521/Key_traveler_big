/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  ignoreDuringBuilds: true,
  images: {
    domains: ['via.placeholder.com', 'localhost', 'tamilnaducouncil.ac.in'],
  },
  // comment for render twice issue
  // avoid cors with proxy
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'http://localhost:3005/:path*', // Proxy to Backend
  //     },
  //   ]
  // },
}

// const withSass = require('@zeit/next-sass')

// module.exports = withSass({
//   cssModules: true,
//   cssLoaderOptions: {
//     importLoaders: 1,
//     localIdentName: '[local]___[hash:base64:5]',
//     modules: true,
//   },
// })

module.exports = nextConfig
