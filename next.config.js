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
    domains: ['127.0.0.1', 'placehold.co', 'strapi-app-tntk.onrender.com'], // Add your Strapi domain as well
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'strapi-app-tntk.onrender.com', // Your Strapi domain for images
        port: '',
        pathname: '/uploads/**', // Ensure this matches the exact path
        // protocol: 'http', // Use http or https as per your setup
        // hostname: '127.0.0.1', // The hostname only, without port
        // port: '1337', // Specify the port separately
        // pathname: '/uploads/**', // Ensure this matches the exact path
      },
    ],
  },
};

module.exports = nextSettings;
