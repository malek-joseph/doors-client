


const nextConfig = {
  webpack: (config) => {
    const rules = config.module.rules
      .find((rule) => typeof rule.oneOf === 'object').oneOf.filter((rule) => Array.isArray(rule.use));
    rules.forEach((rule) => {
      rule.use.forEach((moduleLoader) => {
        if (
          moduleLoader.loader !== undefined
          && moduleLoader.loader.includes('css-loader')
          && typeof moduleLoader.options.modules === 'object'
        ) {
          moduleLoader.options = {
            ...moduleLoader.options,
            modules: {
              ...moduleLoader.options.modules,
              exportLocalsConvention: 'camelCase'
            }
          };
        }
      });
    });

    return config;
  },
  images: {
    domains: ['localhost', 'doors-286ff.appspot.com', 'doors-server.vercel.app', 'firebasestorage.googleapis.com', 'lh3.googleusercontent.com'],
    remotePatterns: [
      { protocol: 'https', hostname: 'storage.googleapis.com', pathname: '/doors-286ff.appspot.com/*' }
    ],
  },
};

module.exports = nextConfig;
