import type { NextConfig } from 'next';
import withFlowbiteReact from 'flowbite-react/plugin/nextjs';

const nextConfig: NextConfig = {
    output: 'standalone',
    cacheMaxMemorySize: 500 * 1024 * 1024
};

export default withFlowbiteReact(nextConfig);
