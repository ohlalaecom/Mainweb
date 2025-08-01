const nextSettings = {
  optimizeFonts: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    title: 'Jacobs Electronics',
    titleDescription: 'Elevate Everyday',
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    domains: [
      '127.0.0.1',
      'placehold.co',
      'admin.jacobs-electronics.com', 
    ],
    remotePatterns: [
      {
        protocol: 'https', 
        hostname: 'admin.jacobs-electronics.com',
        pathname: '/uploads/**',
      },
    ],
  },
};

module.exports = nextSettings;
