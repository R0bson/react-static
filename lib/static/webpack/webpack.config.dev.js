'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var config = _ref.config;
  var _config$paths = config.paths,
      ROOT = _config$paths.ROOT,
      DIST = _config$paths.DIST,
      NODE_MODULES = _config$paths.NODE_MODULES,
      SRC = _config$paths.SRC,
      HTML_TEMPLATE = _config$paths.HTML_TEMPLATE;


  process.env.REACT_STATIC_PUBLICPATH = config.devBasePath ? '/' + config.devBasePath + '/' : '/';
  process.env.REACT_STATIC_BASEPATH = config.devBasePath;

  return {
    mode: 'development',
    optimization: {
      noEmitOnErrors: true,
      concatenateModules: true
    },
    context: _path2.default.resolve(__dirname, '../../../node_modules'),
    entry: [require.resolve('react-dev-utils/webpackHotDevClient'), require.resolve('webpack/hot/only-dev-server'), _path2.default.resolve(ROOT, config.entry)],
    output: {
      filename: '[name].js', // never hash dev code
      chunkFilename: 'templates/[name].js',
      path: DIST,
      publicPath: process.env.REACT_STATIC_PUBLICPATH || '/'
    },
    module: {
      rules: (0, _rules2.default)({ config: config, stage: 'dev' })
    },
    resolve: {
      modules: [_path2.default.resolve(__dirname, '../../../node_modules'), 'node_modules', NODE_MODULES, SRC, DIST],
      extensions: ['.js', '.json', '.jsx']
    },
    plugins: [new _webpack2.default.EnvironmentPlugin(process.env), new _htmlWebpackPlugin2.default({
      inject: true,
      template: '!!raw-loader!' + HTML_TEMPLATE
    }), new _webpack2.default.HotModuleReplacementPlugin(), new _webpack2.default.NamedModulesPlugin(), new _webpack2.default.NoEmitOnErrorsPlugin(), new _caseSensitivePathsWebpackPlugin2.default(), new _extractCssChunksWebpackPlugin2.default({ hot: true })],
    devtool: 'cheap-module-source-map'
  };
};

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _htmlWebpackPlugin = require('html-webpack-plugin');

var _htmlWebpackPlugin2 = _interopRequireDefault(_htmlWebpackPlugin);

var _caseSensitivePathsWebpackPlugin = require('case-sensitive-paths-webpack-plugin');

var _caseSensitivePathsWebpackPlugin2 = _interopRequireDefault(_caseSensitivePathsWebpackPlugin);

var _extractCssChunksWebpackPlugin = require('extract-css-chunks-webpack-plugin');

var _extractCssChunksWebpackPlugin2 = _interopRequireDefault(_extractCssChunksWebpackPlugin);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _rules = require('./rules');

var _rules2 = _interopRequireDefault(_rules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=webpack.config.dev.js.map