/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'lh4.googleusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
            {
                protocol: 'https',
                hostname: 'drive.google.com',
            },
        ],
    },
    serverExternalPackages: ['cloudinary', 'graphql-request', 'mongodb', 'mongoose'],
    transpilePackages: ['three'],
};

module.exports = nextConfig;
