const chalk = require("chalk");

class Employees {
  constructor(connection) {
    this.connection = connection;
  }
  viewEmployees() {
    this.connection.query(
      `SELECT 
        e1.employee_id AS "ID",
        e1.first_name AS "First", 
        e1.last_name AS "Last",
        roles.title AS "Title",
        departments.dept_name AS "Dept",
        roles.salary AS "Salary",
        CONCAT(e2.first_name, " ", e2.last_name) AS "Manager"
      FROM employees e1
      INNER JOIN roles ON e1.role_id = roles.role_id
      INNER JOIN departments ON roles.dept_id = departments.dept_id
      LEFT JOIN employees e2 ON e1.manager_id = e2.employee_id`,
      function (err, res) {
        if (err) throw err;
        console.log(chalk.cyan("--- Employees ---"));
        console.table(res);
      }
    );
  }
  viewEmployeesByManager() {
    this.connection.query(
      `SELECT 
          e1.employee_id AS "Employee ID",
          CONCAT(e1.first_name, " ", e1.last_name) AS "Employee",
          CONCAT(e2.first_name, " ", e2.last_name) AS "Manager"
      FROM employees e1
      INNER JOIN employees e2 ON e1.manager_id = e2.employee_id
      ORDER BY Manager`,
      function (err, res) {
        if (err) throw err;
        console.log(chalk.cyan("--- Employees By Manager ---"));
        console.table(res);
      }
    );
  }
  addEmployee(first_name, last_name, role_id, manager_id) {
    this.connection.query(
      "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
      [first_name, last_name, role_id, manager_id],
      function (err, res) {
        if (err) throw err;
        console.log(
          chalk.green(`"${first_name} ${last_name}" added to employees`)
        );
      }
    );
  }
  updateEmployeeRole(role_id, employee_id, name, title) {
    this.connection.query(
      "UPDATE employees SET role_id = ? WHERE employee_id = ?",
      [role_id, employee_id],
      function (err, res) {
        if (err) throw err;
        console.log(chalk.yellow(`${name}'s role was updated to "${title}"`));
      }
    );
  }
  updateEmployeeManager(manager_id, employee_id, name, manager) {
    this.connection.query(
      "UPDATE employees SET manager_id = ? WHERE employee_id = ?",
      [manager_id, employee_id],
      function (err, res) {
        if (err) throw err;
        console.log(
          chalk.yellow(`${name}'s manager was updated to ${manager}`)
        );
      }
    );
  }
  deleteEmployee(employee_id, name) {
    this.connection.query(
      "DELETE FROM employees WHERE employee_id = ?",
      employee_id,
      function (err, res) {
        if (err) throw err;
        console.log(chalk.red(`${name} removed`));
      }
    );
  }
}

module.exports = {
  Employees,
};
