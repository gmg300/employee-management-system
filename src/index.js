const mysql = require("mysql");
const inquirer = require("inquirer");
const chalk = require("chalk");
const cTable = require("console.table");

let department = require("./queries/department");
let role = require("./queries/role");
let employee = require("./queries/employee");

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
        choices: ["add", "view", "update", "delete"]
    },
    {
        type: "choice",
        name: "view",
        message: "What do you want to do?",
        choices: ["add", "view", "update", "delete"]
    },
    {
        type: "choice",
        name: "update",
        message: "What do you want to do?",
        choices: ["add", "view", "update", "delete"]
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

}
