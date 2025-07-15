/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/home',
                permanent: true, // Indica que é um redirecionamento permanente (HTTP 308)
            },
        ];
    },
};

export default nextConfig;
