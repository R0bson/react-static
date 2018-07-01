'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _static = require('../static');

var _getConfig = require('../static/getConfig');

var _getConfig2 = _interopRequireDefault(_getConfig);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
//


exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        config = _ref2.config,
        staging = _ref2.staging,
        debug = _ref2.debug,
        isBuild = _ref2.isBuild;

    var bundledEnv, clientStats, PrettyError;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // ensure ENV variables are set
            if (typeof process.env.NODE_ENV === 'undefined' && !debug) {
              process.env.NODE_ENV = 'production';
            }

            process.env.REACT_STATIC_ENV = 'production';
            process.env.BABEL_ENV = 'production';

            if (staging) {
              process.env.REACT_STATIC_STAGING = true;
            }

            if (debug) {
              process.env.REACT_STATIC_DEBUG = true;
            }

            // Allow config location to be overriden

            if (isBuild) {
              _context.next = 9;
              break;
            }

            _context.next = 8;
            return (0, _getConfig2.default)(config);

          case 8:
            config = _context.sent;

          case 9:
            if (isBuild) {
              _context.next = 14;
              break;
            }

            _context.next = 12;
            return _fsExtra2.default.readJson(config.paths.DIST + '/bundle-environment.json');

          case 12:
            bundledEnv = _context.sent;

            Object.keys(bundledEnv).forEach(function (key) {
              if (typeof process.env[key] === 'undefined') {
                process.env[key] = bundledEnv[key];
              }
            });

          case 14:
            _context.next = 16;
            return (0, _static.prepareRoutes)({ config: config, opts: { dev: false } });

          case 16:
            config = _context.sent;

            if (config.routes) {
              _context.next = 23;
              break;
            }

            console.log('=> Building Routes...');
            (0, _utils.time)(_chalk2.default.green('=> [\u2713] Routes Built'));
            _context.next = 22;
            return (0, _static.prepareRoutes)(config, { dev: false });

          case 22:
            (0, _utils.timeEnd)(_chalk2.default.green('=> [\u2713] Routes Built'));

          case 23:

            if (debug) {
              console.log('DEBUG - Resolved static.config.js:');
              console.log(config);
            }

            _context.next = 26;
            return _fsExtra2.default.readJson(config.paths.DIST + '/client-stats.json');

          case 26:
            clientStats = _context.sent;

            if (clientStats) {
              _context.next = 29;
              break;
            }

            throw new Error('No Client Stats Found');

          case 29:
            _context.prev = 29;
            _context.next = 32;
            return (0, _static.exportRoutes)({
              config: config,
              clientStats: clientStats
            });

          case 32:
            _context.next = 40;
            break;

          case 34:
            _context.prev = 34;
            _context.t0 = _context['catch'](29);
            PrettyError = require('pretty-error');

            console.log(); // new line
            console.log(new PrettyError().render(_context.t0));
            process.exit(1);

          case 40:
            _context.next = 42;
            return (0, _static.buildXMLandRSS)({ config: config });

          case 42:
            if (!config.onBuild) {
              _context.next = 45;
              break;
            }

            _context.next = 45;
            return config.onBuild({ config: config });

          case 45:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[29, 34]]);
  }));

  return function () {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=export.js.map