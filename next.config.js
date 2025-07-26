const nextSettings = {
  optimizeFonts: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    title: 'Ohlala Online Shop',
    titleDescription: 'Elevate Everyday',
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    domains: [
      '127.0.0.1',
      'placehold.co',
      '157.230.29.110', // ✅ New IP for your Strapi server
    ],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '157.230.29.110', // ✅ Matches your DigitalOcean backend
        port: '1337',
        pathname: '/uploads/**', // ✅ Typical upload path in Strapi
      },
    ],
  },
};

module.exports = nextSettings;
