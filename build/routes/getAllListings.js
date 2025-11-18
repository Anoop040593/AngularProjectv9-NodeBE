"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllListingsRoute = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _boom = _interopRequireDefault(require("@hapi/boom"));
var _database = _interopRequireDefault(require("../database"));
var getAllListingsRoute = exports.getAllListingsRoute = {
  method: 'GET',
  path: '/api/listings',
  handler: function () {
    var _handler = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, h) {
      var _yield$db$query, results, _t;
      return _regenerator["default"].wrap(function (_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 1;
            return _database["default"].query('SELECT * FROM listings');
          case 1:
            _yield$db$query = _context.sent;
            results = _yield$db$query.results;
            return _context.abrupt("return", results);
          case 2:
            _context.prev = 2;
            _t = _context["catch"](0);
            console.error('Error in GET /api/listings:', _t);
            throw _boom["default"].internal('Database error while fetching listings');
          case 3:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 2]]);
    }));
    function handler(_x, _x2) {
      return _handler.apply(this, arguments);
    }
    return handler;
  }()
};