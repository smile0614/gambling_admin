/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: false,
    output: 'export',
    images: {
        disableStaticImages: true,
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.softswiss.net',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
