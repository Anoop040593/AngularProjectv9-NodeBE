// src/database.js
import mysql from 'mysql';

const socketPath = process.env.DB_SOCKET || process.env.INSTANCE_UNIX_SOCKET || ''; // e.g. /cloudsql/PROJECT:REGION:INSTANCE
const useSocket = !!socketPath;

const config = useSocket
  ? {
      socketPath,
      user: process.env.DB_USER || 'hapi-server',
      password: process.env.DB_PASS || 'Anoop@123',
      database: process.env.DB_NAME || 'buy-and-sell',
      connectTimeout: Number(process.env.DB_CONNECT_TIMEOUT || 20000)
    }
  : {
      host: process.env.DB_HOST || '127.0.0.1',
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 33306,
      user: process.env.DB_USER || 'hapi-server',
      password: process.env.DB_PASS || 'Anoop@123',
      database: process.env.DB_NAME || 'buy-and-sell',
      connectTimeout: Number(process.env.DB_CONNECT_TIMEOUT || 20000)
    };

let connection = null;

function makeConnection() {
  connection = mysql.createConnection(config);

  connection.on('error', (err) => {
    console.error('MySQL connection emitted error:', err && err.code ? err.code : err);
    // do not throw; allow app to handle lifecycle
  });

  return connection;
}

const db = {
  connect: (cb) => {
    if (!connection) makeConnection();
    connection.connect((err) => {
      if (err) {
        console.error('Database connection error:', err);
        if (typeof cb === 'function') cb(err);
      } else {
        console.log(`Database connected (${useSocket ? 'socket' : 'tcp'}): ${useSocket ? socketPath : config.host+':'+config.port}`);
        if (typeof cb === 'function') cb(null);
      }
    });
  },

  query: (queryString, escapedValues) =>
    new Promise((resolve, reject) => {
      if (!connection) makeConnection();
      connection.query(queryString, escapedValues, (error, results, fields) => {
        if (error) return reject(error);
        resolve({ results, fields });
      });
    }),

  end: () => {
    if (!connection) return;
    try { connection.end(); } catch (e) {}
  }
};

export default db;
