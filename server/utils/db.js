const mysql = require('mysql');
const { db } = require('./../config');

const pool = mysql.createPool({
  host: db.host,
  user: db.username,
  password: db.password,
  database: db.database,
});

const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, values, (errConn, rows) => {
          if (errConn) {
            reject(errConn);
          } else {
            resolve(rows);
          }
          connection.release();
        });
      }
    });
  });
};


module.exports = { query };
