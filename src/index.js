// Packages
const mysql = require("mysql");
const inquirer = require("inquirer");
const chalk = require("chalk");

// Classes
let departments = require("./queries/departments");
let roles = require("./queries/roles");
let employees = require("./queries/employees");

// Main menu
const menu = [
  {
    type: "list",
    name: "action",
    message: "What do you want to do?",
    choices: [
      new inquirer.Separator(chalk.cyan("--- View -----------")),
      "View Company Overview",
      "View All Employees",
      "View All Roles",
      "View All Departments",
      new inquirer.Separator(chalk.green("--- Add ------------")),
      "Add Department",
      "Add Role",
      "Add Employee",
      new inquirer.Separator(chalk.yellow("--- Update ---------")),
      "Update Employee Role",
      // "Update Employee Manager",
      // new inquirer.Separator(chalk.red("--- Delete ---------")),
      // "Delete Department",
      // "Delete Role",
      // "Delete Employee",
      new inquirer.Separator(chalk.white("--------------------")),
      "EXIT",
    ],
    filter: function (choice) {
      switch (choice) {
        case "View Company Overview":
          return "viewOverview";
        case "View All Departments":
          return "viewDepts";
        case "View All Roles":
          return "viewRoles";
        case "View All Employees":
          return "viewEmployees";
        case "Add Department":
          return "addDept";
        case "Add Role":
          return "addRole";
        case "Add Employee":
          return "addEmployee";
        case "Update Employee Role":
          return "updateEmployeeRole";
        case "Update Employee Manager":
          return "updateEmployeeManager";
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

// Init main menu
function ask() {
  // Data arrays
  let deptsArr;
  let rolesArr;
  let employeesArr;
  let managersArr;
  // Get all current departments data and save in array
  connection.query(`SELECT * FROM departments`, function (err, resDepts) {
    if (err) throw err;
    deptsArr = resDepts;
    // Get all current roles data and save in array
    connection.query(`SELECT * FROM roles`, function (err, resRoles) {
      if (err) throw err;
      rolesArr = resRoles;
      // Get all current employees data and save in array
      connection.query(`SELECT * FROM employees`, function (err, resEmployees) {
        if (err) throw err;
        employeesArr = resEmployees;
        // Get all current managers data and save in array
        connection.query(
          `SELECT * FROM employees WHERE manager_id IS NULL`,
          function (err, resManagers) {
            if (err) throw err;
            managersArr = resManagers;
            // Start main menu
            inquirer.prompt(menu).then(function (choice) {
              // Actions
              const actions = {
                viewOverview: function () {
                  connection.query(
                    `SELECT 
                      employees.employee_id AS id,
                      employees.first_name AS first,
                      employees.last_name AS last,
                      roles.title, 
                      roles.role_id AS job_id,
                      roles.salary,
                      employees.manager_id AS manager
                      FROM employees
                      INNER JOIN roles ON employees.role_id = roles.role_id`,
                    function (err, res) {
                      if (err) throw err;
                      console.table(res);
                      setTimeout(ask, 200);
                    }
                  );
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
                addDept: function () {
                  console.log("--- Add a department ---");
                  inquirer
                    .prompt([
                      {
                        type: "input",
                        name: "dept_name",
                        message: "Enter department name",
                        validate: function (input) {
                          return input !== "";
                        },
                      },
                    ])
                    .then((res) => {
                      departments.addDepartment(res.dept_name);
                      setTimeout(ask, 200);
                    });
                },
                addRole: function () {
                  console.log("--- Add a role ---");
                  inquirer
                    .prompt([
                      {
                        type: "list",
                        name: "dept_name",
                        message: "Which department is this role in?",
                        choices: function () {
                          let arr = deptsArr.map((dept) => {
                            return dept.dept_name;
                          });
                          return arr;
                        },
                      },
                      {
                        type: "input",
                        name: "title",
                        message: "Enter role title",
                        validate: function (input) {
                          return input !== "";
                        },
                      },
                      {
                        type: "input",
                        name: "salary",
                        message: "Enter salary (number)",
                        validate: function (input) {
                          return input !== "";
                        },
                      },
                    ])
                    .then((res) => {
                      let dept = deptsArr.find(
                        (dept) => dept.dept_name == res.dept_name
                      );
                      roles.addRole(res.title, res.salary, dept.dept_id);
                      setTimeout(ask, 200);
                    });
                },
                addEmployee: function () {
                  console.log("--- Add an employee ---");
                  inquirer
                    .prompt([
                      {
                        type: "input",
                        name: "name",
                        message: "Enter first and last name",
                        validate: function (input) {
                          return input !== "";
                        },
                      },
                      {
                        type: "list",
                        name: "title",
                        message: "What is the employee's role?",
                        choices: function () {
                          let arr = rolesArr.map((role) => {
                            return role.title;
                          });
                          return arr;
                        },
                      },
                      {
                        type: "list",
                        name: "manager",
                        message: "Who is the employee's manager?",
                        choices: function () {
                          let arr = managersArr.map((manager) => {
                            let name = `${manager.first_name} ${manager.last_name}`;
                            return name;
                          });
                          return ["none", ...arr];
                        },
                      },
                    ])
                    .then((res) => {
                      let role = rolesArr.find(
                        (role) => role.title == res.title
                      );
                      let manager;
                      if (res.manager == "none") {
                        manager = null;
                      } else {
                        let first_name = res.manager.split(" ")[0];
                        let last_name = res.manager.split(" ")[1];
                        manager = managersArr.find(
                          (manager) =>
                            manager.first_name == first_name &&
                            manager.last_name == last_name
                        );
                        manager = manager.employee_id;
                      }
                      let first_name = res.name.split(" ")[0];
                      let last_name = res.name.split(" ")[1];
                      employees.addEmployee(
                        first_name,
                        last_name,
                        role.role_id,
                        manager
                      );
                      setTimeout(ask, 200);
                    });
                },
                updateEmployeeRole: function () {
                  console.log("--- Update an employee role ---");
                  inquirer
                    .prompt([
                      {
                        type: "list",
                        name: "name",
                        message:
                          "Which employee's role would you like to update?",
                        choices: function () {
                          let arr = employeesArr.map((employee) => {
                            let name = `${employee.first_name} ${employee.last_name}`;
                            return name;
                          });
                          return arr;
                        },
                      },
                      {
                        type: "list",
                        name: "title",
                        message: "What is the selected employee's new role?",
                        choices: function () {
                          let arr = rolesArr.map((role) => {
                            return role.title;
                          });
                          return arr;
                        },
                      },
                    ])
                    .then((res) => {
                      let first_name = res.name.split(" ")[0];
                      let last_name = res.name.split(" ")[1];
                      let employee = employeesArr.find(employee =>
                          employee.first_name == first_name &&
                          employee.last_name == last_name
                      );
                      let role = rolesArr.find(
                        (role) => role.title == res.title
                      );
                      employees.updateEmployeeRole(role.role_id, employee.employee_id);
                      setTimeout(ask, 200);
                    });
                },
                // updateEmployeeManager: function () {
                //   console.log("--- Update an employee's manager ---");
                //   inquirer
                //     .prompt([
                //       {
                //         type: "input",
                //         name: "employee_id",
                //         message:
                //           "Enter the id for the employee whose manage you would like to update",
                //         validate: function (input) {
                //           return input !== "";
                //         },
                //       },
                //       {
                //         type: "input",
                //         name: "manager_id",
                //         message: "Enter new manager id (enter nothing if null)",
                //       },
                //     ])
                //     .then((res) => {
                //       if (res.manager_id == "") {
                //         res.manager_id = null;
                //       }
                //       employees.updateEmployeeManager(
                //         res.manager_id,
                //         res.employee_id
                //       );
                //       setTimeout(ask, 200);
                //     });
                // },
                // deleteDept: function () {
                //   console.log("--- Delete a department ---");
                //   inquirer
                //     .prompt({
                //       type: "input",
                //       name: "dept_id",
                //       message:
                //         "Enter the id of the department you would like to delete",
                //       validate: function (input) {
                //         return input !== "";
                //       },
                //     })
                //     .then((res) => {
                //       departments.deleteDepartment(res.dept_id);
                //       setTimeout(ask, 200);
                //     });
                // },
                // deleteRole: function () {
                //   console.log("--- Delete a role ---");
                //   inquirer
                //     .prompt({
                //       type: "input",
                //       name: "role_id",
                //       message: "Enter the id of the role you would like to delete",
                //       validate: function (input) {
                //         return input !== "";
                //       },
                //     })
                //     .then((res) => {
                //       roles.deleteRole(res.role_id);
                //       setTimeout(ask, 200);
                //     });
                // },
                // deleteEmployee: function () {
                //   console.log("--- Delete an employee ---");
                //   inquirer
                //     .prompt({
                //       type: "input",
                //       name: "employee_id",
                //       message:
                //         "Enter the id of the employee you would like to delete",
                //       validate: function (input) {
                //         return input !== "";
                //       },
                //     })
                //     .then((res) => {
                //       employees.deleteEmployee(res.employee_id);
                //       setTimeout(ask, 200);
                //     });
                // },
                exit: function () {
                  console.log("--- Exiting app ---");
                  process.exit();
                },
              };
              actions[choice.action]();
            });
          }
        );
      });
    });
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

// Connect to MySQL db and run app
connection.connect(async function (err) {
  if (err) throw err;
  console.log(chalk.blue(`---------------------------------`));
  console.log(chalk.blue(`|                               |`));
  console.log(chalk.blue(`| ----- EMPLOYEE MANAGER ------ |`));
  console.log(chalk.blue(`|                               |`));
  console.log(chalk.blue(`---------------------------------`));
  // Construct new classes
  departments = new departments.Departments(connection);
  roles = new roles.Roles(connection);
  employees = new employees.Employees(connection);

  ask();
});
