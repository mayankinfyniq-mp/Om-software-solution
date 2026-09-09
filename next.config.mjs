/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Linting is run separately in CI; don't block production builds.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
