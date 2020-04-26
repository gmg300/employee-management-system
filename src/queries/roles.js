const chalk = require("chalk");

class Roles {
  constructor(connection) {
    this.connection = connection;
  }
  addRole(options) {
    this.connection.query(
      "INSERT INTO roles (title, salary, dept_id) VALUES (?, ?, ?)",
      [options.title, options.salary, options.dept_id],
      function (err, res) {
        if (err) throw err;
        console.log(chalk.green(`"${options.title}" added to roles`));
      }
    );
  }
  viewRoles() {
    this.connection.query(`SELECT * FROM roles`, function (err, res) {
      if (err) throw err;
      console.log(chalk.cyan("--- Roles ---"));
      console.table(res);
    });
  }
  deleteRole(role_id) {
    this.connection.query(
      "DELETE FROM roles WHERE role_id = ?",
      role_id,
      function (err, res) {
        if (err) throw err;
        console.log(chalk.green(`Role #${role_id} deleted`));
      }
    );
  }
}

module.exports = {
  Roles
};
