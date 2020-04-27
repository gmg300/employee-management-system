const chalk = require("chalk");
const cTable = require('console.table');

class Roles {
  constructor(connection) {
    this.connection = connection;
  }
  viewRoles() {
    this.connection.query(
      `SELECT 
        roles.role_id AS "ID",
        roles.title AS "Title",
        CONCAT('$', roles.salary) AS "Salary",
        departments.dept_name AS "Dept"
      FROM roles
      INNER JOIN departments ON roles.dept_id = departments.dept_id`, 
      function (err, res) {
      if (err) throw err;
      console.table("--- Roles ---", res);
    });
  }
  addRole(title, salary, dept_id) {
    this.connection.query(
      "INSERT INTO roles (title, salary, dept_id) VALUES (?, ?, ?)",
      [title, salary, dept_id],
      function (err, res) {
        if (err) throw err;
        console.log(chalk.green(`"${title}" added to roles`));
      }
    );
  }
  deleteRole(role_id, title) {
    this.connection.query(
      "DELETE FROM roles WHERE role_id = ?",
      role_id,
      function (err, res) {
        if (err) throw err;
        console.log(chalk.red(`"${title}" role removed`));
      }
    );
  }
}

module.exports = {
  Roles
};
