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
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'strapi-app-tntk.onrender.com', // Your Strapi domain for images
        port: '',
        pathname: '/uploads/**', // Ensure this matches the exact path
      },
    ],
  },
};

module.exports = nextSettings;
