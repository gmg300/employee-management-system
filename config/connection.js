const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "employees_db",
});

connection.query = util.promisify(connection.query);

connection.connect();

module.exports = connection;