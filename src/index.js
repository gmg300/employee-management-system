// Imports
const mysql = require("mysql");
const inquirer = require("inquirer");
const chalk = require("chalk");

// Classes
let departments = require("./queries/departments");
let roles = require("./queries/roles");
let employees = require("./queries/employees");

// Main Menu
const menu = [
  {
    type: "list",
    name: "action",
    message: "What do you want to do?",
    choices: [
      new inquirer.Separator(chalk.green("--- Add ----")),
      "Add Department",
      "Add Role",
      "Add Employee",
      new inquirer.Separator(chalk.cyan("--- View ----")),
      "View Departments",
      "View Roles",
      "View Employees",
      new inquirer.Separator(chalk.yellow("--- Update ----")),
      "Update Employee Role",
      new inquirer.Separator(chalk.red("--- Delete ----")),
      "Delete Department",
      "Delete Role",
      "Delete Employee",
      new inquirer.Separator(chalk.white("-------------")),
      "EXIT",
    ],
    filter: function (choice) {
      switch (choice) {
        case "Add Department":
          return "addDept";
        case "Add Role":
          return "addRole";
        case "Add Employee":
          return "addEmployee";
        case "View Departments":
          return "viewDepts";
        case "View Roles":
          return "viewRoles";
        case "View Employees":
          return "viewEmployees";
        case "Update Employee Role":
          return "updateEmployeeRole";
        case "Delete Department":
          return "deleteDept";
        case "Delete Role":
          return "deleteRole";
        case "Delete Employee":
          return "deleteEmployee";
        case "EXIT":
          return "exit";
      }
    },
  },
];

// Actions
const actions = {
  addDept: function () {
    console.log("--- Add a department ---");
    inquirer
      .prompt([
        {
          type: "input",
          name: "dept_name",
          message: "Enter department name",
        },
      ])
      .then((res) => {
        departments.addDepartment(res.dept_name);
        setTimeout(ask, 200);
      });
  },
  addRole: function () {
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "Enter role title",
        },
        {
          type: "input",
          name: "salary",
          message: "Enter salary (number)",
        },
        {
          type: "input",
          name: "dept_id",
          message: "Enter department id for role (see table)",
        },
      ])
      .then((res) => {
        roles.addRole(res);
        setTimeout(ask, 200);
      });
  },
  addEmployee: function () {
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "Enter first and last name",
        },
        {
          type: "input",
          name: "role_id",
          message: "Enter role id",
        },
        {
          type: "input",
          name: "manager_id",
          message: "Enter manager id (if applicable)",
        },
      ])
      .then((res) => {
          let first_name = res.name.split(" ")[0];
          let last_name = res.name.split(" ")[1];
          employees.addEmployee(first_name, last_name, res.role_id, res.manager_id);
        setTimeout(ask, 200);
      });
  },
  viewDepts: function () {
    departments.viewDepartments();
    setTimeout(ask, 200);
  },
  viewRoles: function () {
    roles.viewRoles();
    setTimeout(ask, 200);
  },
  viewEmployees: function () {
    employees.viewEmployees();
    setTimeout(ask, 200);
  },
  updateEmployeeRole: function () {
    inquirer
      .prompt({
        type: "input",
        name: "id",
        message: "Enter an id to delete by, or nothing to delete everything.",
      })
      .then((res) => {
        if (res.id == "") {
          playlist.dropTable();
          playlist.createTable();
        } else {
          playlist.deletePlaylists("id", res.id);
        }
        setTimeout(ask, 200);
      });
  },
  deleteDept: function () {
    inquirer
      .prompt({
        type: "input",
        name: "id",
        message: "Enter an id to delete by, or nothing to delete everything.",
      })
      .then((res) => {
        if (res.id == "") {
          playlist.dropTable();
          playlist.createTable();
        } else {
          playlist.deletePlaylists("id", res.id);
        }
        setTimeout(ask, 200);
      });
  },
  deleteRole: function () {
    inquirer
      .prompt({
        type: "input",
        name: "id",
        message: "Enter an id to delete by, or nothing to delete everything.",
      })
      .then((res) => {
        if (res.id == "") {
          playlist.dropTable();
          playlist.createTable();
        } else {
          playlist.deletePlaylists("id", res.id);
        }
        setTimeout(ask, 200);
      });
  },
  deleteEmployee: function () {
    inquirer
      .prompt({
        type: "input",
        name: "id",
        message: "Enter an id to delete by, or nothing to delete everything.",
      })
      .then((res) => {
        if (res.id == "") {
          playlist.dropTable();
          playlist.createTable();
        } else {
          playlist.deletePlaylists("id", res.id);
        }
        setTimeout(ask, 200);
      });
  },
  exit: function () {
    process.exit();
  },
};

function ask() {
  inquirer.prompt(menu).then(function (choice) {
    actions[choice.action]();
  });
}

// MySQL Connection
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employees_db",
});

connection.connect(function (err) {
  if (err) throw err;
  //   console.log(chalk.cyan(`---------------------------------`));
  //   console.log(chalk.cyan(`|                               |`));
  //   console.log(chalk.cyan(`| ----- EMPLOYEE MANAGER ------ |`));
  //   console.log(chalk.cyan(`|                               |`));
  //   console.log(chalk.cyan(`---------------------------------`));
  // Construct new classes
  departments = new departments.Departments(connection);
  roles = new roles.Roles(connection);
  employees = new employees.Employees(connection);

  ask();
});
