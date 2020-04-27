const chalk = require("chalk");

class Employees {
  constructor(connection) {
    this.connection = connection;
  }
  viewEmployees() {
    this.connection.query(
      `SELECT 
        employees.employee_id AS ID,
        employees.first_name AS First,
        employees.last_name AS Last,
        roles.title AS Title,
        roles.salary AS Salary,
        employees.manager_id AS Manager
      FROM employees
      INNER JOIN roles ON employees.role_id = roles.role_id`,
      function(err, res) {
        if(err) throw err;
        console.log(chalk.cyan("--- Employees ---"));
        console.table(res);
      });
  }
  addEmployee(first_name, last_name, role_id, manager_id) {
    this.connection.query(
      'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
      [first_name, last_name, role_id, manager_id],
      function(err, res) {
        if (err) throw err;
        console.log(chalk.green(`"${first_name} ${last_name}" added to employees`));
      });
  }
  updateEmployeeRole(role_id, employee_id, name, title) {
    this.connection.query(
      'UPDATE employees SET role_id = ? WHERE employee_id = ?',
      [role_id, employee_id],
      function(err, res) {
        if(err) throw err;
        console.log(chalk.green(`${name}'s role was updated to "${title}"`));
      });
  }
  updateEmployeeManager(manager_id, employee_id) {
    this.connection.query(
      'UPDATE employees SET manager_id = ? WHERE employee_id = ?',
      [manager_id, employee_id],
      function(err, res) {
        if(err) throw err;
        console.log(chalk.green(`Employee #${employee_id} manager updated`));
      });
  }
  deleteEmployee(employee_id) {
    this.connection.query(
      'DELETE FROM employees WHERE employee_id = ?',
      employee_id,
      function(err, res) {
        if(err) throw err;
        console.log(chalk.green(`Employee #${employee_id} deleted`));
      });
  }
}

module.exports = {
  Employees
};
