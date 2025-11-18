"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _getAllListings = require("./getAllListings");
var _getListing = require("./getListing");
var _addViewListing = require("./addViewListing");
var _getUserListings = require("./getUserListings");
var _createNewListings = require("./createNewListings");
var _updateListngs = require("./updateListngs");
var _deleteListings = require("./deleteListings");
var _files = require("./files");
var _default = exports["default"] = [_getAllListings.getAllListingsRoute, _getListing.getListingRoute, _addViewListing.addViewToListingRoutes, _getUserListings.getUserListingsRoute, _createNewListings.createNewListingRoute, _updateListngs.updateListingRoute, _deleteListings.deleteListingRoute, _files.staticFilesRoute].concat((0, _toConsumableArray2["default"])(_files.filesRoutes));