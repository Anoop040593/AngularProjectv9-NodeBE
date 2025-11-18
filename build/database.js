"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mysql = _interopRequireDefault(require("mysql"));
// src/database.js

var socketPath = process.env.DB_SOCKET || process.env.INSTANCE_UNIX_SOCKET || ''; // e.g. /cloudsql/PROJECT:REGION:INSTANCE
var useSocket = !!socketPath;
var config = useSocket ? {
  socketPath: socketPath,
  user: process.env.DB_USER || 'hapi-server',
  password: process.env.DB_PASS || 'Anoop@123',
  database: process.env.DB_NAME || 'buy-and-sell',
  connectTimeout: Number(process.env.DB_CONNECT_TIMEOUT || 20000)
} : {
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 33306,
  user: process.env.DB_USER || 'hapi-server',
  password: process.env.DB_PASS || 'Anoop@123',
  database: process.env.DB_NAME || 'buy-and-sell',
  connectTimeout: Number(process.env.DB_CONNECT_TIMEOUT || 20000)
};
var connection = null;
function makeConnection() {
  connection = _mysql["default"].createConnection(config);
  connection.on('error', function (err) {
    console.error('MySQL connection emitted error:', err && err.code ? err.code : err);
    // do not throw; allow app to handle lifecycle
  });
  return connection;
}
var db = {
  connect: function connect(cb) {
    if (!connection) makeConnection();
    connection.connect(function (err) {
      if (err) {
        console.error('Database connection error:', err);
        if (typeof cb === 'function') cb(err);
      } else {
        console.log("Database connected (".concat(useSocket ? 'socket' : 'tcp', "): ").concat(useSocket ? socketPath : config.host + ':' + config.port));
        if (typeof cb === 'function') cb(null);
      }
    });
  },
  query: function query(queryString, escapedValues) {
    return new Promise(function (resolve, reject) {
      if (!connection) makeConnection();
      connection.query(queryString, escapedValues, function (error, results, fields) {
        if (error) return reject(error);
        resolve({
          results: results,
          fields: fields
        });
      });
    });
  },
  end: function end() {
    if (!connection) return;
    try {
      connection.end();
    } catch (e) {}
  }
};
var _default = exports["default"] = db;