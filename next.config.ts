import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  // Suppress React StrictMode warnings from third-party libraries
  reactStrictMode: true,
  
  webpack: (config) => {
    // Ignore warnings from swagger-ui-react about deprecated lifecycle methods
    config.ignoreWarnings = [
      {
        module: /node_modules\/swagger-ui-react/,
        message: /UNSAFE_componentWillReceiveProps/,
      },
    ];
    return config;
  },
};

export default nextConfig;
