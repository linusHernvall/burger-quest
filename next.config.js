/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Accepts images from the following domain (my domain at Supabase).
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xqzmstpehsjsosapiiew.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

module.exports = nextConfig;
