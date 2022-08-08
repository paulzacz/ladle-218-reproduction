const baseConfigFunction = require('./babel.config');

module.exports = function (api) {
  const baseConfig = baseConfigFunction(api);

  return {
    ...baseConfig,
    ignore: [
      /** Babel's glob implementation doesn't support the full specification.
       * Specifically, a * cannot match a filename twice.
       * Work around this by explicitly listing both js and tsx extensions.
       */
      '**/*.stories.js',
      '**/*.stories.tsx',
      '**/*.d.ts',
      '**/storybook/**/*',
    ],
  };
};
