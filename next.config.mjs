/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "icon-sets.iconify.design",
        //port: "",
      },
    ],
  },
};

export default nextConfig;
