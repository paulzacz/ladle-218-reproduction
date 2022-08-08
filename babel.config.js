module.exports = function (api) {
  // Only execute this file once and cache the resulted config object below for the next babel uses.
  // more info about the babel config caching can be found here: https://babeljs.io/docs/en/config-files#apicache
  api.cache.using(() => process.env.NODE_ENV === 'development');

  return {
    plugins: [
      /**
       * Auto-imports 'React' where necessary.
       * Required so long as we're using @babel/preset-react, runtime: 'classic'
       * The plugin must be first (which is why our spread operator is after, not before)
       */
      'react-require',
      /** Necessary while we still have class based components
       *
       * Otherwise, will get a syntax error in client applications like:
       *
       * Module parse failed: Unexpected token (64:21)
       * File was processed with these loaders:
       * * ./node_modules/babel-loader/lib/index.js
       * You may need an additional loader to handle the result of these loaders.
       * |
       * | class Overlay extends _react.default.Component {
       * >   static contextType = _ThemeContext.default;
       */
      '@babel/plugin-proposal-class-properties',
      /** A plugin that enables the re-use of Babel's injected helper code to
       * save on code size.
       */
      '@babel/plugin-transform-runtime',
      /** Instead of emitting .svg files, componentize svg files and inline
       * them where they are imported.
       */
      'inline-react-svg',
    ],
    presets: [
      /** The standard catch-all of recommended babel configurations */
      '@babel/preset-env',
      /**
       * Recommended react configurations
       * Note that the default jsx runtime for @babel/preset-react is "classic"
       * Currently nimbus does not support "react-jsx" runtime. When it eventually
       * becomes supported, this preset will need to be configured.
       */
      '@babel/preset-react',
      /** Transpile typescript */
      ['@babel/preset-typescript', { allExtensions: true, isTSX: true }],
    ],
  };
};
