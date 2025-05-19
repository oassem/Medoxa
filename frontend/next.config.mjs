import i18nextConfig from './next-i18next.config.js';

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  i18n: i18nextConfig.i18n,
  trailingSlash: true,
  distDir: 'build',
  output: 'standalone', // compatible with i18n
  basePath: '',
  devIndicators: {
    position: 'bottom-left',
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Optional rewrites can be uncommented if needed
  // async rewrites() {
  //   return [
  //     { source: '/', destination: '/web_pages/home' },
  //     { source: '/home', destination: '/web_pages/home' },
  //     { source: '/about', destination: '/web_pages/about' },
  //     { source: '/services', destination: '/web_pages/services' },
  //     { source: '/contact', destination: '/web_pages/contact' },
  //     { source: '/faq', destination: '/web_pages/faq' },
  //   ];
  // },
};

export default nextConfig;
