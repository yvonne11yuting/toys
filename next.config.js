/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "lh4.googleusercontent.com",
      "res.cloudinary.com",
      "drive.google.com",
    ],
  },
  experimental: {
    serverComponentsExternalPackages: [
      "cloudinary",
      "graphql-request",
      "mongodb",
      "mongoose",
    ],
  },
  transpilePackages: ["three"],
};

module.exports = nextConfig;
