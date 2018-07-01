'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var config = _ref.config,
      isNode = _ref.isNode;

  var result = common(config);
  if (!isNode) return result;
  result.output.filename = 'static.[chunkHash:8].js';
  result.output.libraryTarget = 'umd';
  result.optimization.minimize = false;
  result.optimization.minimizer = [];
  result.target = 'node';
  result.externals = [(0, _webpackNodeExternals2.default)({
    whitelist: ['react-universal-component', 'webpack-flush-chunks', 'react-static-routes']
  })];
  //
  // module.rules
  result.module.rules = (0, _rules2.default)({ config: config, stage: 'prod', isNode: true });
  result.plugins = [new _webpack2.default.EnvironmentPlugin(process.env), new _caseSensitivePathsWebpackPlugin2.default(), new _webpack2.default.optimize.LimitChunkCountPlugin({
    maxChunks: 1
  })];
  return result;
};

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _caseSensitivePathsWebpackPlugin = require('case-sensitive-paths-webpack-plugin');

var _caseSensitivePathsWebpackPlugin2 = _interopRequireDefault(_caseSensitivePathsWebpackPlugin);

var _webpackBundleAnalyzer = require('webpack-bundle-analyzer');

var _uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

var _uglifyjsWebpackPlugin2 = _interopRequireDefault(_uglifyjsWebpackPlugin);

var _webpackNodeExternals = require('webpack-node-externals');

var _webpackNodeExternals2 = _interopRequireDefault(_webpackNodeExternals);

var _extractCssChunksWebpackPlugin = require('extract-css-chunks-webpack-plugin');

var _extractCssChunksWebpackPlugin2 = _interopRequireDefault(_extractCssChunksWebpackPlugin);

var _optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

var _optimizeCssAssetsWebpackPlugin2 = _interopRequireDefault(_optimizeCssAssetsWebpackPlugin);

var _rules = require('./rules');

var _rules2 = _interopRequireDefault(_rules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function common(config) {
  var _config$paths = config.paths,
      ROOT = _config$paths.ROOT,
      DIST = _config$paths.DIST,
      NODE_MODULES = _config$paths.NODE_MODULES,
      SRC = _config$paths.SRC;

  // Trailing slash

  process.env.REACT_STATIC_PUBLICPATH = process.env.REACT_STATIC_STAGING ? config.stagingSiteRoot + '/' + (config.stagingBasePath ? config.stagingBasePath + '/' : '') : config.siteRoot + '/' + (config.basePath ? config.basePath + '/' : '');
  process.env.REACT_STATIC_PUBLIC_PATH = process.env.REACT_STATIC_PUBLICPATH;

  // Trailing slash mysiteroot.com/
  process.env.REACT_STATIC_SITE_ROOT = (process.env.REACT_STATIC_STAGING ? config.stagingSiteRoot : config.siteRoot) + '/';

  // No slashes base/path
  process.env.REACT_STATIC_BASEPATH = process.env.REACT_STATIC_STAGING ? config.stagingBasePath : config.basePath;

  var splitChunks = {
    chunks: 'all',
    minSize: 10000,
    minChunks: 1,
    maxAsyncRequests: 5,
    maxInitialRequests: 5,
    automaticNameDelimiter: '~',
    name: true,
    cacheGroups: {
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        priority: -10,
        chunks: 'all'
      },
      default: {
        minChunks: 2,
        priority: -20,
        reuseExistingChunk: true
      }
    }
  };

  var extrackCSSChunks = new _extractCssChunksWebpackPlugin2.default({
    filename: '[name].[chunkHash:8].css',
    chunkFilename: '[id].[chunkHash:8].css'
  });

  if (!config.extractCssChunks) {
    splitChunks.cacheGroups = {
      styles: {
        name: 'styles',
        test: /\.css$/,
        chunks: 'all',
        enforce: true
      }
    };
    extrackCSSChunks = new _extractCssChunksWebpackPlugin2.default({
      filename: '[name].[chunkHash:8].css'
    });
  }
  return {
    mode: 'production',
    context: _path2.default.resolve(__dirname, '../../../node_modules'),
    entry: _path2.default.resolve(ROOT, config.entry),
    output: {
      filename: '[name].[hash:8].js', // dont use chunkhash, its not a chunk
      chunkFilename: 'templates/[name].[chunkHash:8].js',
      path: DIST,
      publicPath: process.env.REACT_STATIC_PUBLICPATH || '/'
    },
    optimization: {
      minimize: true,
      minimizer: [new _uglifyjsWebpackPlugin2.default({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }), new _optimizeCssAssetsWebpackPlugin2.default({})],
      splitChunks: splitChunks
    },
    module: {
      rules: (0, _rules2.default)({ config: config, stage: 'prod', isNode: false })
    },
    resolve: {
      alias: config.preact ? {
        react: 'preact-compat',
        'react-dom': 'preact-compat'
      } : {},
      modules: [_path2.default.resolve(__dirname, '../../../node_modules'), 'node_modules', NODE_MODULES, SRC, DIST],
      extensions: ['.js', '.json', '.jsx']
    },
    externals: [],
    target: undefined,
    plugins: [new _webpack2.default.EnvironmentPlugin(process.env), extrackCSSChunks, new _caseSensitivePathsWebpackPlugin2.default(), config.bundleAnalyzer && new _webpackBundleAnalyzer.BundleAnalyzerPlugin()].filter(function (d) {
      return d;
    }),
    devtool: 'source-map'
  };
}
//# sourceMappingURL=webpack.config.prod.js.map