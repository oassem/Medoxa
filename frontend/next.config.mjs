import i18nextConfig from './next-i18next.config.js';

/**
 * @type {import('next').NextConfig}
 */

const output = process.env.NODE_ENV === 'production' ? 'standalone' : 'standalone';
const nextConfig = {
  i18n: i18nextConfig.i18n,
  trailingSlash: true,
  distDir: 'build',
  output,
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

  async rewrites() {
    return [
      {
        source: '/home',
        destination: '/web_pages/home',
      },

      {
        source: '/about',
        destination: '/web_pages/about',
      },

      {
        source: '/services',
        destination: '/web_pages/services',
      },

      {
        source: '/contact',
        destination: '/web_pages/contact',
      },

      {
        source: '/faq',
        destination: '/web_pages/faq',
      },
    ];
  },
};

export default nextConfig;
