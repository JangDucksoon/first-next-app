import type { NextConfig } from 'next';
import withFlowbiteReact from 'flowbite-react/plugin/nextjs';

const nextConfig: NextConfig = {
    images: {
        domains: ['placehold.co', 'cdn.jsdelivr.net', 'img.icons8.com']
    }
};

export default withFlowbiteReact(nextConfig);
