// Imports
const mysql = require("mysql");
const inquirer = require("inquirer");
const chalk = require("chalk");
const cTable = require("console.table");

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
    ],
  },
];

// Actions
const actions = {};

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
  console.log(chalk.cyan(`---------------------------------`));
  console.log(chalk.cyan(`|                               |`));
  console.log(chalk.cyan(`| ----- EMPLOYEE MANAGER ------ |`));
  console.log(chalk.cyan(`|                               |`));
  console.log(chalk.cyan(`---------------------------------`));
  // Construct new classes
  departments = new departments.Departments(connection);
  roles = new roles.Roles(connection);
  employees = new employees.Employees(connection);

  inquirer.prompt(menu);


});
