'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRoutesFromPages = exports.recurseNormalizeRoute = exports.normalizeRoute = exports.trimLeadingAndTrailingSlashes = exports.cutPathToRoot = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _chokidar = require('chokidar');

var _chokidar2 = _interopRequireDefault(_chokidar);

var _utils = require('../utils');

var _shared = require('../utils/shared');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /* eslint-disable import/no-dynamic-require */

var watcher = void 0;
var REGEX_TO_CUT_TO_ROOT = /(\..+?)\/.*/g;
var REGEX_TO_REMOVE_TRAILING_SLASH = /^\/{0,}/g;
var REGEX_TO_REMOVE_LEADING_SLASH = /\/{0,}$/g;

var cutPathToRoot = exports.cutPathToRoot = function cutPathToRoot() {
  var string = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return string.replace(REGEX_TO_CUT_TO_ROOT, '$1');
};

var trimLeadingAndTrailingSlashes = exports.trimLeadingAndTrailingSlashes = function trimLeadingAndTrailingSlashes() {
  var string = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return string.replace(REGEX_TO_REMOVE_TRAILING_SLASH, '').replace(REGEX_TO_REMOVE_LEADING_SLASH, '');
};

var consoleWarningForRouteWithoutNoIndex = function consoleWarningForRouteWithoutNoIndex(route) {
  return route.noIndex && console.warn('=> Warning: Route ' + route.path + ' is using \'noIndex\'. Did you mean \'noindex\'?');
};

var normalizeRoute = function normalizeRoute(route) {
  var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var children = route.children,
      routeWithOutChildren = _objectWithoutProperties(route, ['children']);

  var _parent$path = parent.path,
      parentPath = _parent$path === undefined ? '/' : _parent$path;
  var _config$tree = config.tree,
      keepRouteChildren = _config$tree === undefined ? false : _config$tree;


  if (!route.path) {
    throw new Error('No path defined for route: ' + JSON.stringify(route));
  }

  var originalRoutePath = (0, _shared.pathJoin)(route.path);
  var routePath = (0, _shared.pathJoin)(parentPath, route.path);

  consoleWarningForRouteWithoutNoIndex(route);

  var normalizedRoute = _extends({}, keepRouteChildren ? route : routeWithOutChildren, {
    path: routePath,
    originalPath: originalRoutePath,
    noindex: route.noindex || parent.noindex || route.noIndex,
    hasGetProps: !!route.getData
  });

  return normalizedRoute;
};

// We recursively loop through the routes and their children and
// return an array of normalised routes.
// Original routes array [{ path: 'path', children: { path: 'to' } }]
// These can be returned as flat routes eg. [{ path: 'path' }, { path: 'path/to' }]
// Or they can be returned nested routes eg. [{ path: 'path', children: { path: 'path/to' } }]
exports.normalizeRoute = normalizeRoute;
var recurseNormalizeRoute = exports.recurseNormalizeRoute = function recurseNormalizeRoute() {
  var routes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var config = arguments[1];
  var parent = arguments[2];
  var existingRoutes = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var _config$tree2 = config.tree,
      createNestedTreeStructure = _config$tree2 === undefined ? false : _config$tree2;


  return routes.reduce(function (_ref, route) {
    var _ref$routes = _ref.routes,
        prevRoutes = _ref$routes === undefined ? [] : _ref$routes,
        hasIndex = _ref.hasIndex,
        has404 = _ref.has404;

    var normalizedRoute = normalizeRoute(route, parent, config);
    // if structure is nested (tree === true) normalizedRoute will
    // have children otherwise we fall back to the original route children
    var _normalizedRoute = normalizedRoute,
        _normalizedRoute$chil = _normalizedRoute.children,
        children = _normalizedRoute$chil === undefined ? route.children : _normalizedRoute$chil,
        path = _normalizedRoute.path;

    // we check an array of paths to see
    // if route path already existings

    var existingRoute = existingRoutes[path];

    if (existingRoute) {
      if (existingRoute.isPage) {
        Object.assign(existingRoute, _extends({}, normalizedRoute, {
          component: existingRoute.component
        }));
      } else if (!config.disableDuplicateRoutesWarning) {
        console.warn('More than one route in static.config.js is defined for path:', route.path);
      }
    }

    var _recurseNormalizeRout = recurseNormalizeRoute(children, config, normalizedRoute, existingRoutes),
        normalizedRouteChildren = _recurseNormalizeRout.routes,
        childrenHasIndex = _recurseNormalizeRout.hasIndex,
        childrenHas404 = _recurseNormalizeRout.has404;

    if (createNestedTreeStructure) {
      normalizedRoute = _extends({}, normalizedRoute, { children: normalizedRouteChildren });
    }

    // we push paths into an array that
    // we use to check if a route existings
    existingRoutes[path] = normalizedRoute;

    return {
      routes: [].concat(_toConsumableArray(prevRoutes), _toConsumableArray(existingRoute ? [] : [normalizedRoute]), _toConsumableArray(createNestedTreeStructure ? [] : normalizedRouteChildren)),
      hasIndex: hasIndex || normalizedRoute.path === '/' || childrenHasIndex,
      has404: has404 || normalizedRoute.path === '404' || childrenHas404
    };
  }, {
    routes: [],
    hasIndex: false,
    has404: false
  });
};

var getRoutesFromPages = exports.getRoutesFromPages = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_ref3, cb) {
    var config = _ref3.config,
        _ref3$opts = _ref3.opts,
        opts = _ref3$opts === undefined ? {} : _ref3$opts;
    var globExtensions, pagesGlob, handle, hasWatcher, pages, routes;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // Make a glob extension to get all pages with the set extensions from the pages directory
            globExtensions = config.extensions.map(function (ext) {
              return '' + ext.slice(1);
            }).join(',');
            pagesGlob = config.paths.PAGES + '/**/*.{' + globExtensions + '}';
            // Get the pages

            handle = function handle(pages) {
              // Turn each page into a route
              var routes = pages.map(function (page) {
                // Get the component path relative to ROOT
                var component = _path2.default.relative(config.paths.ROOT, page);
                // Make sure the path is relative to the root of the site
                var path = page.replace('' + config.paths.PAGES, '').replace(/\..*/, '');
                // Turn `/index` paths into roots`
                path = path.replace(/\/index$/, '/');
                // Return the route
                return {
                  path: path,
                  component: component,
                  isPage: true // tag it with isPage, so we know its origin
                };
              });
              return routes;
            };

            hasWatcher = !!watcher;

            if (opts.dev && !hasWatcher) {
              watcher = _chokidar2.default.watch(config.paths.PAGES, {
                ignoreInitial: true
              }).on('all', (0, _utils.debounce)(function () {
                var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(type, file) {
                  var filename, pages, routes;
                  return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          filename = file.split('/').reverse()[0];

                          if (!filename.startsWith('.')) {
                            _context.next = 3;
                            break;
                          }

                          return _context.abrupt('return');

                        case 3:
                          _context.next = 5;
                          return (0, _utils.glob)(pagesGlob);

                        case 5:
                          pages = _context.sent;
                          routes = handle(pages);

                          cb(routes);

                        case 8:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _callee, undefined);
                }));

                return function (_x9, _x10) {
                  return _ref4.apply(this, arguments);
                };
              }()), 50);
            }

            if (hasWatcher) {
              _context2.next = 11;
              break;
            }

            _context2.next = 8;
            return (0, _utils.glob)(pagesGlob);

          case 8:
            pages = _context2.sent;
            routes = handle(pages);
            return _context2.abrupt('return', cb(routes));

          case 11:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getRoutesFromPages(_x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}();

// At least ensure the index page is defined for export
var getRoutes = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee4(_ref6) {
    var config = _ref6.config,
        opts = _ref6.opts;
    var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (d) {
      return d;
    };
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt('return',
            // We use the callback pattern here, because getRoutesFromPages is technically a subscription
            getRoutesFromPages({ config: config, opts: opts }, function () {
              var _ref7 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(pageRoutes) {
                var routes, _recurseNormalizeRout2, allRoutes, hasIndex, has404;

                return _regenerator2.default.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return config.getRoutes(opts);

                      case 2:
                        routes = _context3.sent;
                        _recurseNormalizeRout2 = recurseNormalizeRoute([].concat(_toConsumableArray(pageRoutes), _toConsumableArray(routes)), config), allRoutes = _recurseNormalizeRout2.routes, hasIndex = _recurseNormalizeRout2.hasIndex, has404 = _recurseNormalizeRout2.has404;
                        // If no Index page was found, throw an error. This is required

                        if (hasIndex) {
                          _context3.next = 6;
                          break;
                        }

                        throw new Error('Could not find a route for the "index" page of your site! This is required. Please create a page or specify a route and template for this page.');

                      case 6:
                        if (has404) {
                          _context3.next = 8;
                          break;
                        }

                        throw new Error('Could not find a route for the "404" page of your site! This is required. Please create a page or specify a route and template for this page.');

                      case 8:
                        return _context3.abrupt('return', cb(allRoutes));

                      case 9:
                      case 'end':
                        return _context3.stop();
                    }
                  }
                }, _callee3, undefined);
              }));

              return function (_x13) {
                return _ref7.apply(this, arguments);
              };
            }()));

          case 1:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function getRoutes(_x11) {
    return _ref5.apply(this, arguments);
  };
}();

exports.default = getRoutes;
//# sourceMappingURL=getRoutes.js.map