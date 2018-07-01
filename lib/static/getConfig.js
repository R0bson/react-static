'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildConfigation = exports.trimLeadingAndTrailingSlashes = exports.cutPathToRoot = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-disable import/no-dynamic-require */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _chokidar = require('chokidar');

var _chokidar2 = _interopRequireDefault(_chokidar);

var _getDirname = require('../utils/getDirname');

var _getDirname2 = _interopRequireDefault(_getDirname);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var REGEX_TO_CUT_TO_ROOT = /(\..+?)\/.*/g;
var REGEX_TO_REMOVE_TRAILING_SLASH = /^\/{0,}/g;
var REGEX_TO_REMOVE_LEADING_SLASH = /\/{0,}$/g;

var DEFAULT_NAME_FOR_STATIC_CONFIG_FILE = 'static.config.js';
// the default static.config.js location
var DEFAULT_PATH_FOR_STATIC_CONFIG = _path2.default.resolve(_path2.default.join(process.cwd(), DEFAULT_NAME_FOR_STATIC_CONFIG_FILE));
var DEFAULT_ROUTES = [{ path: '/' }];
var DEFAULT_ENTRY = 'index.js';

var cutPathToRoot = exports.cutPathToRoot = function cutPathToRoot() {
  var string = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return string.replace(REGEX_TO_CUT_TO_ROOT, '$1');
};

var trimLeadingAndTrailingSlashes = exports.trimLeadingAndTrailingSlashes = function trimLeadingAndTrailingSlashes() {
  var string = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return string.replace(REGEX_TO_REMOVE_TRAILING_SLASH, '').replace(REGEX_TO_REMOVE_LEADING_SLASH, '');
};

var buildConfigation = exports.buildConfigation = function buildConfigation() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  // path defaults
  config.paths = _extends({
    root: _path2.default.resolve(process.cwd()),
    src: 'src',
    dist: 'dist',
    devDist: 'tmp/dev-server',
    public: 'public',
    pages: 'src/pages', // TODO: document
    nodeModules: 'node_modules'
  }, config.paths || {});

  // Use the root to resolve all other relative paths
  var resolvePath = function resolvePath(relativePath) {
    return _path2.default.resolve(config.paths.root, relativePath);
  };

  // Resolve all paths
  var distPath = process.env.REACT_STATIC_ENV === 'development' ? resolvePath(config.paths.devDist || config.paths.dist) : resolvePath(config.paths.dist);

  var paths = {
    ROOT: config.paths.root,
    LOCAL_NODE_MODULES: _path2.default.resolve((0, _getDirname2.default)(), '../../node_modules'),
    SRC: resolvePath(config.paths.src),
    PAGES: resolvePath(config.paths.pages),
    DIST: distPath,
    PUBLIC: resolvePath(config.paths.public),
    NODE_MODULES: resolvePath(config.paths.nodeModules),
    EXCLUDE_MODULES: config.paths.excludeResolvedModules || resolvePath(config.paths.nodeModules),
    PACKAGE: resolvePath('package.json'),
    HTML_TEMPLATE: _path2.default.join(distPath, 'index.html'),
    STATIC_DATA: _path2.default.join(distPath, 'staticData')

    // Defaults
  };var finalConfig = _extends({
    // Defaults
    entry: _path2.default.join(paths.SRC, DEFAULT_ENTRY),
    getSiteData: function getSiteData() {
      return {};
    },
    renderToHtml: function renderToHtml(render, Comp) {
      return render(_react2.default.createElement(Comp, null));
    },
    prefetchRate: 3,
    disableRouteInfoWarning: false,
    disableRoutePrefixing: false,
    outputFileRate: 10,
    extensions: ['.js', '.jsx'], // TODO: document
    getRoutes: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', DEFAULT_ROUTES);

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      return function getRoutes() {
        return _ref.apply(this, arguments);
      };
    }()
  }, config, {
    // Materialized Overrides
    paths: paths,
    siteRoot: cutPathToRoot(config.siteRoot, '$1'),
    stagingSiteRoot: cutPathToRoot(config.stagingSiteRoot, '$1'),
    basePath: trimLeadingAndTrailingSlashes(config.basePath),
    stagingBasePath: trimLeadingAndTrailingSlashes(config.stagingBasePath),
    devBasePath: trimLeadingAndTrailingSlashes(config.devBasePath),
    extractCssChunks: config.extractCssChunks || false,
    inlineCss: config.inlineCss || false,
    generated: true

    // Set env variables to be used client side
  });process.env.REACT_STATIC_PREFETCH_RATE = finalConfig.prefetchRate;
  process.env.REACT_STATIC_DISABLE_ROUTE_INFO_WARNING = finalConfig.disableRouteInfoWarning;
  process.env.REACT_STATIC_DISABLE_ROUTE_PREFIXING = finalConfig.disableRoutePrefixing;

  return finalConfig;
};

var buildConfigFromPath = function buildConfigFromPath(configPath) {
  var filename = _path2.default.resolve(configPath);
  delete require.cache[filename];
  try {
    var config = require(filename).default;
    return buildConfigation(config);
  } catch (err) {
    console.error(err);
    return {};
  }
};

var fromFile = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
    var configPath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_PATH_FOR_STATIC_CONFIG;
    var subscribe = arguments[1];
    var config;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            config = buildConfigFromPath(configPath);


            if (subscribe) {
              _chokidar2.default.watch(configPath).on('all', function () {
                subscribe(buildConfigFromPath(configPath));
              });
            }

            return _context2.abrupt('return', config);

          case 3:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function fromFile() {
    return _ref2.apply(this, arguments);
  };
}();

// Retrieves the static.config.js from the current project directory

exports.default = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(customConfig, cb) {
    var builtConfig;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!((typeof customConfig === 'undefined' ? 'undefined' : _typeof(customConfig)) === 'object')) {
              _context3.next = 4;
              break;
            }

            // return a custom config obj
            builtConfig = buildConfigation(customConfig);

            if (cb) {
              cb(builtConfig);
            }
            return _context3.abrupt('return', builtConfig);

          case 4:
            return _context3.abrupt('return', fromFile(customConfig, cb));

          case 5:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  function getConfig(_x5, _x6) {
    return _ref3.apply(this, arguments);
  }

  return getConfig;
}();
//# sourceMappingURL=getConfig.js.map