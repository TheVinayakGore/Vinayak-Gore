/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, 
    images: {
        domains: ['avatars.githubusercontent.com', 'cdn.sanity.io', 'via.placeholder.com'],
    },
    basePath: "", // Keep empty or remove to prevent conflicts
};

export default nextConfig;
