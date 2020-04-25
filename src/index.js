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
        type: "choice",
        name: "action",
        message: "What do you want to do?",
        choices: ["add", "view", "update", "delete"]
    },
    {
        type: "choice",
        name: "add",
        message: "What do you want to do?",
        choices: ["Add department", "Add role", "Add employee"]
    },
    {
        type: "choice",
        name: "view",
        message: "What do you want to do?",
        choices: ["View departments", "View roles", "View employees", "View department budgets"]
    },
    {
        type: "choice",
        name: "update",
        message: "What do you want to do?",
        choices: ["Update employee role", "Update employee manager"]
    },
    {
        type: "choice",
        name: "delete",
        message: "What do you want to do?",
        choices: ["add", "view", "update", "delete"]
    },
    {

    }
];

// Actions
const actions = {

};

// MySQL Connection
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employees_db'
  });

connection.connect(function(err) {
    if(err) throw err;
    console.log(chalk.cyan(`connected as id ${connection.threadId}`));
    // Construct new classes
    departments = new departments.Departments(connection);
    roles = new roles.Roles(connection);
    employees = new employees.Employees(connection);

    // departments.addDepartment("Customer Service");
    // departments.viewDepartments();  
    // departments.deleteDepartment(8);  
    


    
});
