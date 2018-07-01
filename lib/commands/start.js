'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _static = require('../static');

var _RootComponents = require('../static/RootComponents');

var _webpack = require('../static/webpack');

var _getConfig = require('../static/getConfig');

var _getConfig2 = _interopRequireDefault(_getConfig);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
//


//

var cleaned = void 0;
var indexCreated = void 0;

exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
    var _this = this;

    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        config = _ref2.config,
        debug = _ref2.debug;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            // ensure ENV variables are set
            if (typeof process.env.NODE_ENV === 'undefined') {
              process.env.NODE_ENV = 'development';
            }
            process.env.REACT_STATIC_ENV = 'development';
            process.env.BABEL_ENV = 'development';

            // Use callback style to subscribe to changes
            _context3.next = 5;
            return (0, _getConfig2.default)(config, function () {
              var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(config) {
                var siteData, Component;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        if (debug) {
                          console.log('DEBUG - Resolved static.config.js:');
                          console.log(config);
                        }

                        if (cleaned) {
                          _context2.next = 5;
                          break;
                        }

                        cleaned = true;
                        // Clean the dist folder
                        _context2.next = 5;
                        return _fsExtra2.default.remove(config.paths.DIST);

                      case 5:
                        _context2.next = 7;
                        return config.getSiteData({ dev: true });

                      case 7:
                        siteData = _context2.sent;


                        // Resolve the base HTML template
                        Component = config.Document || _RootComponents.DefaultDocument;

                        if (indexCreated) {
                          _context2.next = 13;
                          break;
                        }

                        indexCreated = true;
                        // Render an index.html placeholder
                        _context2.next = 13;
                        return (0, _utils.createIndexFilePlaceholder)({
                          config: config,
                          Component: Component,
                          siteData: siteData
                        });

                      case 13:
                        _context2.next = 15;
                        return (0, _static.prepareRoutes)({ config: config, opts: { dev: true } }, function () {
                          var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(config) {
                            return _regenerator2.default.wrap(function _callee$(_context) {
                              while (1) {
                                switch (_context.prev = _context.next) {
                                  case 0:
                                    (0, _webpack.reloadRoutes)();

                                    // Build the JS bundle
                                    _context.next = 3;
                                    return (0, _webpack.startDevServer)({ config: config });

                                  case 3:
                                  case 'end':
                                    return _context.stop();
                                }
                              }
                            }, _callee, _this);
                          }));

                          return function (_x3) {
                            return _ref4.apply(this, arguments);
                          };
                        }());

                      case 15:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, _callee2, _this);
              }));

              return function (_x2) {
                return _ref3.apply(this, arguments);
              };
            }());

          case 5:
            _context3.next = 7;
            return new Promise(function () {
              // Do nothing, the user must exit this command
            });

          case 7:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  function start() {
    return _ref.apply(this, arguments);
  }

  return start;
}();
//# sourceMappingURL=start.js.map