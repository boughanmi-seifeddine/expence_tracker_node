let mysql = require('mysql');
const config = require(`${__dirname}/mysql.config`)

let pool = mysql.createPool(config);
pool.getConnection((err, connection) => {
    if (err)
        throw err;
    console.log('Database connected successfully');
    connection.release();
});
module.exports = pool;

