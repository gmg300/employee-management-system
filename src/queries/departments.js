const chalk = require("chalk");

class Departments {
  constructor(connection) {
    this.connection = connection;
  }
  viewDepartments() {
    this.connection.query(
      `SELECT * FROM departments`,
      function(err, res) {
        if(err) throw err;
        console.log(chalk.cyan("--- Departments ---"));
        console.table(res);
      });
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
  // viewBudgetByDepartment() {
  //   this.connection.query(
  //     `SELECT departments.dept_id, employees.first_name, employees.last_name, employees.employee_id, roles.role_id, roles.title, roles.salary
  //     FROM employees
  //     INNER JOIN roles ON employees.role_id = roles.role_id
  //     LEFT JOIN departments ON roles.dept_id = departments.dept_id`,
  //     function(err, res) {
  //       if(err) throw err;
  //       console.log(chalk.green("--- Departments ---"));
  //       console.table(res);
  //     });
  // }
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
