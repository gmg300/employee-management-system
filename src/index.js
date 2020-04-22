const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

let department = require("./queries/department");
let role = require("./queries/role");
let employee = require("./queries/employee");

