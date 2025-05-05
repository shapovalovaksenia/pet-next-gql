/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rickandmortyapi.com",
        port: "",
        pathname: "/api/character/avatar/**",
      },
      {
        protocol: "https",
        hostname: "s4.anilist.co",
        port: "",
        pathname: "/file/anilistcdn/media/anime/cover/**",
      },
    ],
  },
};

module.exports = nextConfig;
