const chalk = require("chalk");

class Employees {
  constructor(connection) {
    this.connection = connection;
  }
  addEmployee(title, salary, dept_id) {
    this.connection.query(
      "INSERT INTO departments (title, salary, dept_id)) VALUES (?)",
      [title, salary, dept_id],
      callback
    );
  }
  viewEmployees() {}
  updateEmployeeRole() {}
  updateEmployeeManager() {}
  deleteEmployee() {}
}

function callback(err, res) {
  if (err) {
    console.log(chalk.red("Error!"));
    console.log(chalk.red(err));
  } else {
    console.log(chalk.cyan(res));
    console.log(chalk.cyan("Query successful."));
  }
}

module.exports = {
  Employees,
};
