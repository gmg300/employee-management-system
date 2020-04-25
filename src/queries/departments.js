const chalk = require("chalk");

class Departments {
  constructor(connection) {
    this.connection = connection;
  }
  addDepartment(dept_name) {
    this.connection.query(
      'INSERT INTO departments (dept_name) VALUES (?)',
      dept_name,
      function(err, res) {
        if (err) throw err;
        console.log(chalk.green(`"${dept_name}" added to departments`));
      });
  }
  viewDepartments() {
    this.connection.query(
      `SELECT * FROM departments`,
      function(err, res) {
        if(err) throw err;
        console.log(chalk.green("Departments"));
        console.table(res);
      });
  }
  viewBudgetByDepartment() {}
  deleteDepartment(dept_id) {
    this.connection.query(
      'DELETE FROM departments WHERE dept_id = ?',
      dept_id,
      function(err, res) {
        if(err) throw err;
        console.log(chalk.green(`Department #${dept_id} deleted`));
      });
  }
}
  

module.exports = {
  Departments
};
