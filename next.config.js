/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')([
  '@triplit/react',
  '@triplit/client',
  '@triplit/db',
]);
module.exports = withTM({
  reactStrictMode: true,
  swcMinify: true,
});

// module.exports = nextConfig;
