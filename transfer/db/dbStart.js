const mysql = require('mysql');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'lexuelejiao',
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
