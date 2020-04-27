const chalk = require("chalk");
const cTable = require('console.table');

class Departments {
  constructor(connection) {
    this.connection = connection;
  }
  viewDepartments() {
    this.connection.query(
      `SELECT 
        dept_id AS "ID",
        dept_name AS "Dept"
      FROM departments`,             
      function (err, res) {
        if (err) throw err;
        console.table("--- Departments ---", res);
      }
    );
  }
  viewDepartmentBudgets() {
    this.connection.query(
      `SELECT 
        departments.dept_id AS "ID",
        departments.dept_name AS "Dept",
        CONCAT('$', SUM(roles.salary)) AS "Budget"
      FROM departments
      LEFT JOIN roles ON departments.dept_id = roles.dept_id
      INNER JOIN employees ON employees.role_id = roles.role_id
      GROUP BY ID`,
      function(err, res) {
        if(err) throw err;
        console.table("--- Department Budgets ---", res);
      });
  }
  addDepartment(dept_name) {
    this.connection.query(
      "INSERT INTO departments (dept_name) VALUES (?)",
      dept_name,
      function (err, res) {
        if (err) throw err;
        console.log(chalk.green(`"${dept_name}" added to departments`));
      }
    );
  }
  deleteDepartment(dept_id, name) {
    this.connection.query(
      "DELETE FROM departments WHERE dept_id = ?",
      dept_id,
      function (err, res) {
        if (err) throw err;
        console.log(chalk.red(`"${name}" department removed`));
      }
    );
  }
}

module.exports = {
  Departments
};
