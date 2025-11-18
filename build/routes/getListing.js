"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getListingRoute = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _boom = _interopRequireDefault(require("@hapi/boom"));
var _database = _interopRequireDefault(require("../database"));
var getListingRoute = exports.getListingRoute = {
  method: 'GET',
  path: '/api/listings/{id}',
  handler: function () {
    var _handler = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, h) {
      var id, _yield$db$query, results, listing;
      return _regenerator["default"].wrap(function (_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            id = req.params.id;
            _context.next = 1;
            return _database["default"].query('SELECT * FROM listings where id=?', [id]);
          case 1:
            _yield$db$query = _context.sent;
            results = _yield$db$query.results;
            listing = results[0];
            if (listing) {
              _context.next = 2;
              break;
            }
            throw _boom["default"].notFound("Listing doesn't exist with id: ".concat(id));
          case 2:
            return _context.abrupt("return", listing);
          case 3:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    function handler(_x, _x2) {
      return _handler.apply(this, arguments);
    }
    return handler;
  }()
};