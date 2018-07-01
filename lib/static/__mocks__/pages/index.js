'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _logo = require('../logo.png');

var _logo2 = _interopRequireDefault(_logo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'h1',
      { style: { textAlign: 'center' } },
      'Welcome to'
    ),
    _react2.default.createElement('img', { src: _logo2.default, alt: '', style: { display: 'block', margin: '0 auto' } })
  );
};
//
//# sourceMappingURL=index.js.map