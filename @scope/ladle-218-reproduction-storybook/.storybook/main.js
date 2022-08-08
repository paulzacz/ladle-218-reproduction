const path = require('path');

module.exports = {
  stories: ['../../ladle-218-reproduction/src/**/*.stories.tsx'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-essentials', '@storybook/addon-links'],
  features: {
    postcss: false,
  },
  reactOptions: {
    strictMode: true,
  },
  babel: async (options) => {
    options.plugins = [...options.plugins, 'react-require'];
    return options;
  },
  webpackFinal: async (config) => {
    // Handles our scss files
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../..'),
    });

    // Return the altered config
    return config;
  },
};
