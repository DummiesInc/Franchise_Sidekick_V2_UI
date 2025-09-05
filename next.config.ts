import type { NextConfig } from 'next';
import withFlowbiteReact from 'flowbite-react/plugin/nextjs';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  env: {
    // baseUrl: 'http://localhost:3001'
    baseUrl: 'https://blooming-journey-74292-81647ffdeaf4.herokuapp.com'
  }
};

export default withFlowbiteReact(nextConfig);
