import type { NextConfig } from 'next';
import withFlowbiteReact from 'flowbite-react/plugin/nextjs';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  env: {
    baseUrl: 'http://localhost:3001'
  }
};

export default withFlowbiteReact(nextConfig);
