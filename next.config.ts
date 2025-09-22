/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/_api/:path*',
        destination: 'http://52.77.238.249:3001/:path*',
      },
    ];
  },
};
module.exports = nextConfig;
