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
      'admin.jacobs-electronics.com', // ✅ Only the domain, no protocol
    ],
    remotePatterns: [
      {
        protocol: 'https', // ✅ Correct protocol
        hostname: 'admin.jacobs-electronics.com', // ✅ No https://
        pathname: '/uploads/**', // ✅ Correct path
      },
    ],
  },
};

module.exports = nextSettings;
