'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildProductionBundles = exports.startDevServer = exports.buildCompiler = exports.reloadRoutes = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var buildCompiler = exports.buildCompiler = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref3) {
    var config = _ref3.config,
        stage = _ref3.stage;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', (0, _webpack2.default)(webpackConfig({ config: config, stage: stage })));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function buildCompiler(_x) {
    return _ref2.apply(this, arguments);
  };
}();

// Starts the development server


var startDevServer = exports.startDevServer = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee7(_ref5) {
    var _this = this;

    var config = _ref5.config;
    var devCompiler, intendedPort, port, messagePort, host, devServerConfig, first, socket;
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            if (!devServer) {
              _context7.next = 2;
              break;
            }

            return _context7.abrupt('return', devServer);

          case 2:
            _context7.next = 4;
            return buildCompiler({ config: config, stage: 'dev' });

          case 4:
            devCompiler = _context7.sent;


            // Default to localhost:3000, or use a custom combo if defined in static.config.js
            // or environment variables
            intendedPort = config.devServer && config.devServer.port || process.env.PORT || 3000;
            _context7.next = 8;
            return (0, _utils.findAvailablePort)(Number(intendedPort));

          case 8:
            port = _context7.sent;
            _context7.next = 11;
            return (0, _utils.findAvailablePort)(4000, [port]);

          case 11:
            messagePort = _context7.sent;

            if (intendedPort !== port) {
              (0, _utils.time)(_chalk2.default.red('=> Warning! Port ' + intendedPort + ' is not available. Using port ' + _chalk2.default.green(intendedPort) + ' instead!'));
            }
            host = config.devServer && config.devServer.host || process.env.HOST || 'http://localhost';
            devServerConfig = _extends({
              hot: true,
              disableHostCheck: true,
              contentBase: [config.paths.PUBLIC, config.paths.DIST],
              publicPath: '/',
              historyApiFallback: true,
              compress: false,
              quiet: true
            }, config.devServer, {
              watchOptions: _extends({
                ignored: 'node_modules'
              }, config.devServer ? config.devServer.watchOptions || {} : {}),
              before: function before(app) {
                // Serve the site data
                app.get('/__react-static__/getMessagePort', function () {
                  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
                    return _regenerator2.default.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            res.json({
                              port: messagePort
                            });

                          case 1:
                          case 'end':
                            return _context2.stop();
                        }
                      }
                    }, _callee2, _this);
                  }));

                  return function (_x3, _x4) {
                    return _ref6.apply(this, arguments);
                  };
                }());

                app.get('/__react-static__/siteData', function () {
                  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res, next) {
                    var siteData;
                    return _regenerator2.default.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            _context3.prev = 0;
                            _context3.next = 3;
                            return config.getSiteData({ dev: true });

                          case 3:
                            siteData = _context3.sent;

                            res.json(siteData);
                            _context3.next = 12;
                            break;

                          case 7:
                            _context3.prev = 7;
                            _context3.t0 = _context3['catch'](0);

                            res.status(500);
                            res.json(_context3.t0);
                            next(_context3.t0);

                          case 12:
                          case 'end':
                            return _context3.stop();
                        }
                      }
                    }, _callee3, _this, [[0, 7]]);
                  }));

                  return function (_x5, _x6, _x7) {
                    return _ref7.apply(this, arguments);
                  };
                }());

                // Since routes may change during dev, this function can rebuild all of the config
                // routes. It also references the original config when possible, to make sure it
                // uses any up to date getData callback generated from new or replacement routes.
                reloadWebpackRoutes = function reloadWebpackRoutes() {
                  // Serve each routes data
                  config.routes.forEach(function (_ref8) {
                    var routePath = _ref8.path;

                    app.get('/__react-static__/routeInfo/' + encodeURI(routePath === '/' ? '' : routePath), function () {
                      var _ref9 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res, next) {
                        var route, allProps;
                        return _regenerator2.default.wrap(function _callee4$(_context4) {
                          while (1) {
                            switch (_context4.prev = _context4.next) {
                              case 0:
                                // Make sure we have the most up to date route from the config, not
                                // an out of dat object.
                                route = config.routes.find(function (d) {
                                  return d.path === routePath;
                                });
                                _context4.prev = 1;

                                if (route) {
                                  _context4.next = 4;
                                  break;
                                }

                                throw new Error('Route could not be found!');

                              case 4:
                                if (!route.getData) {
                                  _context4.next = 10;
                                  break;
                                }

                                _context4.next = 7;
                                return route.getData({ dev: true });

                              case 7:
                                _context4.t0 = _context4.sent;
                                _context4.next = 11;
                                break;

                              case 10:
                                _context4.t0 = {};

                              case 11:
                                allProps = _context4.t0;

                                res.json(_extends({}, route, {
                                  allProps: allProps
                                }));
                                _context4.next = 19;
                                break;

                              case 15:
                                _context4.prev = 15;
                                _context4.t1 = _context4['catch'](1);

                                res.status(500);
                                next(_context4.t1);

                              case 19:
                              case 'end':
                                return _context4.stop();
                            }
                          }
                        }, _callee4, _this, [[1, 15]]);
                      }));

                      return function (_x8, _x9, _x10) {
                        return _ref9.apply(this, arguments);
                      };
                    }());
                  });
                };

                reloadWebpackRoutes();

                if (config.devServer && config.devServer.before) {
                  config.devServer.before(app);
                }
              },
              port: port,
              host: host
            });
            first = true;

            console.log('=> Building App Bundle...');
            (0, _utils.time)(_chalk2.default.green('=> [\u2713] Build Complete'));

            devCompiler.hooks.invalid.tap({
              name: 'React-Static'
            }, function (file) {
              console.log('=> File changed:', file.replace(config.paths.ROOT, ''));
              console.log('=> Updating build...');
              (0, _utils.time)(_chalk2.default.green('=> [\u2713] Build Updated'));
            });

            devCompiler.hooks.done.tap({
              name: 'React-Static'
            }, function (stats) {
              var messages = (0, _formatWebpackMessages2.default)(stats.toJson({}, true));
              var isSuccessful = !messages.errors.length && !messages.warnings.length;

              if (isSuccessful) {
                if (first) {
                  (0, _utils.timeEnd)(_chalk2.default.green('=> [\u2713] Build Complete'));
                  console.log(_chalk2.default.green('=> [\u2713] App serving at'), host + ':' + port);
                } else {
                  (0, _utils.timeEnd)(_chalk2.default.green('=> [\u2713] Build Updated'));
                }
                if (first && config.onStart) {
                  config.onStart({ devServerConfig: devServerConfig });
                }
              }

              first = false;

              if (messages.errors.length) {
                console.log(_chalk2.default.red('Failed to build! Fix any errors and try again!'));
                messages.errors.forEach(function (message) {
                  console.log(message);
                  console.log();
                });
              }

              if (messages.warnings.length) {
                console.log(_chalk2.default.yellow('Build complete with warnings.'));
                console.log();
                messages.warnings.forEach(function (message) {
                  console.log(message);
                  console.log();
                });
              }
            });

            // Start the webpack dev server
            devServer = new _webpackDevServer2.default(devCompiler, devServerConfig);

            // Start the messages socket
            socket = (0, _socket2.default)();

            socket.listen(messagePort);

            resolvedReloadRoutes = function () {
              var _ref10 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee6(paths) {
                return _regenerator2.default.wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        _context6.next = 2;
                        return (0, _.prepareRoutes)({ config: config, opts: { dev: true } }, function () {
                          var _ref11 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee5(config) {
                            return _regenerator2.default.wrap(function _callee5$(_context5) {
                              while (1) {
                                switch (_context5.prev = _context5.next) {
                                  case 0:
                                    if (!paths) {
                                      paths = config.routes.map(function (route) {
                                        return route.path;
                                      });
                                    }
                                    paths = paths.map(_shared.cleanPath);
                                    reloadWebpackRoutes();
                                    socket.emit('message', { type: 'reloadRoutes', paths: paths });

                                  case 4:
                                  case 'end':
                                    return _context5.stop();
                                }
                              }
                            }, _callee5, _this);
                          }));

                          return function (_x12) {
                            return _ref11.apply(this, arguments);
                          };
                        }());

                      case 2:
                      case 'end':
                        return _context6.stop();
                    }
                  }
                }, _callee6, _this);
              }));

              return function resolvedReloadRoutes(_x11) {
                return _ref10.apply(this, arguments);
              };
            }();

            _context7.next = 26;
            return new Promise(function (resolve, reject) {
              devServer.listen(port, null, function (err) {
                if (err) {
                  return reject(err);
                }
                resolve();
              });
            });

          case 26:
            return _context7.abrupt('return', devServer);

          case 27:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function startDevServer(_x2) {
    return _ref4.apply(this, arguments);
  };
}();

var buildProductionBundles = exports.buildProductionBundles = function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee8(_ref13) {
    var config = _ref13.config;
    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            return _context8.abrupt('return', new Promise(function (resolve, reject) {
              (0, _webpack2.default)([webpackConfig({ config: config, stage: 'prod' }), webpackConfig({ config: config, stage: 'node' })]).run(function (err, stats) {
                if (err) {
                  console.log(_chalk2.default.red(err.stack || err));
                  if (err.details) {
                    console.log(_chalk2.default.red(err.details));
                  }
                  return reject(err);
                }

                stats.toJson('verbose');

                var _stats$stats = _slicedToArray(stats.stats, 2),
                    prodStats = _stats$stats[0],
                    nodeStats = _stats$stats[1];

                checkBuildStats('prod', prodStats);
                checkBuildStats('node', nodeStats);

                function checkBuildStats(stage, stageStats) {
                  var buildErrors = stageStats.hasErrors();
                  var buildWarnings = stageStats.hasWarnings();

                  if (buildErrors || buildWarnings) {
                    console.log(stageStats.toString({
                      context: config.context,
                      performance: false,
                      hash: false,
                      timings: true,
                      entrypoints: false,
                      chunkOrigins: false,
                      chunkModules: false,
                      colors: true
                    }));
                    if (buildErrors) {
                      console.log(_chalk2.default.red.bold('\n                => There were ERRORS during the ' + stage + ' build stage! :(\n                => Fix them and try again!\n              '));
                    } else if (buildWarnings) {
                      console.log(_chalk2.default.yellow('\n=> There were WARNINGS during the ' + stage + ' build stage. Your site will still function, but you may achieve better performance by addressing the warnings above.\n'));
                    }
                  }
                }

                var prodStatsJson = prodStats.toJson();

                _fsExtra2.default.outputFileSync(_path2.default.join(config.paths.DIST, 'client-stats.json'), JSON.stringify(prodStatsJson, null, 2));

                _fsExtra2.default.outputFileSync(_path2.default.join(config.paths.DIST, 'bundle-environment.json'), JSON.stringify(process.env, null, 2));

                resolve(prodStatsJson);
              });
            }));

          case 1:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, this);
  }));

  return function buildProductionBundles(_x13) {
    return _ref12.apply(this, arguments);
  };
}();

exports.webpackConfig = webpackConfig;

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');

var _formatWebpackMessages2 = _interopRequireDefault(_formatWebpackMessages);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _webpackDevServer = require('webpack-dev-server');

var _webpackDevServer2 = _interopRequireDefault(_webpackDevServer);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _rules = require('./rules');

var _utils = require('../../utils');

var _shared = require('../../utils/shared');

var _ = require('../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /* eslint-disable import/no-dynamic-require, react/no-danger, import/no-mutable-exports */

// import errorOverlayMiddleware from 'react-dev-utils/errorOverlayMiddleware'
//


var resolvedReloadRoutes = void 0;
var reloadWebpackRoutes = void 0;

var devServer = void 0;

var reloadRoutes = function reloadRoutes() {
  if (!resolvedReloadRoutes) {
    // Not ready yet, so just wait
    return;
  }
  resolvedReloadRoutes.apply(undefined, arguments);
};

exports.reloadRoutes = reloadRoutes;

// Builds a compiler using a stage preset, then allows extension via
// webpackConfigurator

function webpackConfig(_ref) {
  var config = _ref.config,
      stage = _ref.stage;

  var webpackConfig = void 0;
  if (stage === 'dev') {
    webpackConfig = require('./webpack.config.dev').default({ config: config });
  } else if (stage === 'prod') {
    webpackConfig = require('./webpack.config.prod').default({
      config: config
    });
  } else if (stage === 'node') {
    webpackConfig = require('./webpack.config.prod').default({
      config: config,
      isNode: true
    });
  } else {
    throw new Error('A stage is required when building a compiler.');
  }

  var defaultLoaders = (0, _rules.getStagedRules)({ config: config, stage: stage });

  if (config.webpack) {
    var transformers = config.webpack;
    if (!Array.isArray(config.webpack)) {
      transformers = [config.webpack];
    }

    transformers.forEach(function (transformer) {
      var modifiedConfig = transformer(webpackConfig, {
        stage: stage,
        defaultLoaders: defaultLoaders
      });
      if (modifiedConfig) {
        webpackConfig = modifiedConfig;
      }
    });
  }
  return webpackConfig;
}
//# sourceMappingURL=index.js.map