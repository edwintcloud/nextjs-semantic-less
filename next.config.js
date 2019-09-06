require('dotenv').config();
const withPlugins = require('next-compose-plugins');
const withOffline = require('next-offline');
const withLess = require('@zeit/next-less');
const path = require('path');
const webpack = require('webpack');

const nextConfig = {
  target: 'serverless',
  webpack(config) {
    /* eslint-disable no-param-reassign */
    config.plugins.push(new webpack.EnvironmentPlugin(process.env));
    config.resolve.alias['../../theme.config$'] = path.join(
      __dirname,
      '/semantic-ui/theme.config',
    );
    config.resolve.alias['../semantic-ui/site'] = path.join(
      __dirname,
      '/semantic-ui/site',
    );
    /* eslint-enable no-param-reassign */
    config.module.rules.push({
      test: /\.(png|svg|eot|otf|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 8192,
          publicPath: '/_next/static/',
          outputPath: 'static/',
          name: '[name].[ext]',
        },
      },
    });
    return config;
  },
  workboxOpts: {
    swDest: 'static/service-worker.js',
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'https-calls',
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
};

module.exports = withPlugins([[withOffline], [withLess]], nextConfig);
