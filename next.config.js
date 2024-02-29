/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    DISCOVERY_PREVIEW_TOKEN: process.env.DISCOVERY_PREVIEW_TOKEN,
    NEXT_PUBLIC_DISCOVERY_API_ROOT: process.env.NEXT_PUBLIC_DISCOVERY_API_ROOT,
    NEXT_PUBLIC_DISCOVERY_API_TOKEN:
      process.env.NEXT_PUBLIC_DISCOVERY_API_TOKEN,
    NEXT_PUBLIC_PROPERTY_TITLE: process.env.NEXT_PUBLIC_PROPERTY_TITLE,
  },
  images: {
    loader: "custom",
    loaderFile: "./src/utils/akamaiImageloader.js",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "demo.discoveryreplymedia.com",
      },
    ],
  },
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/flixole-v-1-1",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
