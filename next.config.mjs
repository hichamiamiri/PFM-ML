/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites: async () => [
        { source: '/', destination: '/nonexistent' } // -> will 404
    ],
};

export default nextConfig;
