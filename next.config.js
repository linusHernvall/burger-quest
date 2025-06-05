/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  // Accepts images from the following domain (my domain at Supabase).
  images: {
    domains: ["xqzmstpehsjsosapiiew.supabase.co"],
  },
};

module.exports = nextConfig;
