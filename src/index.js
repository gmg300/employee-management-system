const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

let departments = require("./queries/departments");
let roles = require("./queries/role");
let employees = require("./queries/employees");

