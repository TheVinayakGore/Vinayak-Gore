/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['avatars.githubusercontent.com', 'cdn.sanity.io', 'via.placeholder.com'],
    },
    experimental: {
        appDir: true, // ✅ Ensures App Router works properly
    },
    basePath: "", // Keep empty or remove to prevent conflicts
};

export default nextConfig;
