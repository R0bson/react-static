'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var config = _ref.config,
      stage = _ref.stage;

  return {
    test: /\.(js|jsx)$/,
    exclude: new RegExp('(/node_modules.*|' + config.paths.EXCLUDE_MODULES + ')'),
    use: [{
      loader: 'babel-loader',
      options: {
        cacheDirectory: stage !== 'prod'
      }
    }, {
      loader: 'react-hot-loader-loader'
    }]
  };
};
//# sourceMappingURL=jsLoader.js.map