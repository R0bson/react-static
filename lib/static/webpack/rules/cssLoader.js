'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var stage = _ref.stage,
      isNode = _ref.isNode;

  var cssLoader = initCSSLoader(stage);
  if (stage === 'node' || isNode) {
    return {
      test: /\.css$/,
      loader: cssLoader
    };
  }

  cssLoader = [_extractCssChunksWebpackPlugin2.default.loader].concat(cssLoader); // seeing as it's HMR, why not :)

  return {
    test: /\.css$/,
    loader: cssLoader
  };
};

var _autoprefixer = require('autoprefixer');

var _autoprefixer2 = _interopRequireDefault(_autoprefixer);

var _extractCssChunksWebpackPlugin = require('extract-css-chunks-webpack-plugin');

var _extractCssChunksWebpackPlugin2 = _interopRequireDefault(_extractCssChunksWebpackPlugin);

var _postcssFlexbugsFixes = require('postcss-flexbugs-fixes');

var _postcssFlexbugsFixes2 = _interopRequireDefault(_postcssFlexbugsFixes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function initCSSLoader(stage) {
  var cssLoader = [{
    loader: 'css-loader',
    options: {
      importLoaders: 1,
      minimize: stage === 'prod',
      sourceMap: false
    }
  }, {
    loader: 'postcss-loader',
    options: {
      // Necessary for external CSS imports to work
      // https://github.com/facebookincubator/create-react-app/issues/2677
      sourceMap: true,
      ident: 'postcss',
      plugins: function plugins() {
        return [_postcssFlexbugsFixes2.default, (0, _autoprefixer2.default)({
          browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
          flexbox: 'no-2009' // I'd opt in for this - safari 9 & IE 10.
        })];
      }
    }
  }];
  return cssLoader;
}
//# sourceMappingURL=cssLoader.js.map