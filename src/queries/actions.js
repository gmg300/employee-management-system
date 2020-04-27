const inquirer = require("inquirer");
let departments = require("./departments");
let roles = require("./roles");
let employees = require("./employees");

module.exports = {
    addDept: function () {
      console.log("--- Add a department ---");
      inquirer
        .prompt([
          {
            type: "input",
            name: "dept_name",
            message: "Enter department name",
            validate: function(input) {
              return input !== "";
            }
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
            type: "input",
            name: "title",
            message: "Enter role title",
            validate: function(input) {
              return input !== "";
            }
          },
          {
            type: "input",
            name: "salary",
            message: "Enter salary (number)",
            validate: function(input) {
              return input !== "";
            }
          },
          {
            type: "input",
            name: "dept_id",
            message: "Enter department id for role (see table)",
            validate: function(input) {
              return input !== "";
            }
          },
        ])
        .then((res) => {
          roles.addRole(res);
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
            validate: function(input) {
              return input !== "";
            },
          },
          {
            type: "input",
            name: "role_id",
            message: "Enter role id",
            validate: function(input) {
              return input !== "";
            }
          },
          {
            type: "input",
            name: "manager_id",
            message: "Enter manager id (enter nothing if null)",
          },
        ])
        .then((res) => {
          if(res.manager_id == '') {
              res.manager_id = null;
          }
          let first_name = res.name.split(" ")[0];
          let last_name = res.name.split(" ")[1];
          employees.addEmployee(
            first_name,
            last_name,
            res.role_id,
            res.manager_id
          );
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
      console.log("--- Update an employee role ---");
      inquirer
        .prompt([
          {
            type: "input",
            name: "employee_id",
            message: "Enter the id for the employee you would like to update",
            validate: function(input) {
              return input !== "";
            }
          },
          {
            type: "input",
            name: "role_id",
            message: "Enter the new role id",
            validate: function(input) {
              return input !== "";
            }
          },
          {
            type: "input",
            name: "manager_id",
            message: "Enter new manager id (if applicable)",
          },
        ])
        .then((res) => {
          if(res.manager_id == '') {
              res.manager_id = null;
          }
          employees.updateEmployeeRole(res.role_id, res.manager_id, res.employee_id);
          setTimeout(ask, 200);
        });
    },
    updateEmployeeManager: function () {
      console.log("--- Update an employee's manager ---");
      inquirer
        .prompt([
          {
            type: "input",
            name: "employee_id",
            message: "Enter the id for the employee whose manage you would like to update",
            validate: function(input) {
              return input !== "";
            }
          },
          {
            type: "input",
            name: "manager_id",
            message: "Enter new manager id (enter nothing if null)",
          },
        ])
        .then((res) => {
          if(res.manager_id == '') {
              res.manager_id = null;
          }
          employees.updateEmployeeManager(res.manager_id, res.employee_id);
          setTimeout(ask, 200);
        });
    },
    deleteDept: function () {
      console.log("--- Delete a department ---");
      inquirer
        .prompt({
          type: "input",
          name: "dept_id",
          message: "Enter the id of the department you would like to delete",
          validate: function(input) {
              return input !== "";
            }
        })
        .then((res) => {
          departments.deleteDepartment(res.dept_id);
          setTimeout(ask, 200);
        });
    },
    deleteRole: function () {
      console.log("--- Delete a role ---");
      inquirer
        .prompt({
          type: "input",
          name: "role_id",
          message: "Enter the id of the role you would like to delete",
          validate: function(input) {
              return input !== "";
            }
        })
        .then((res) => {
          roles.deleteRole(res.role_id);
          setTimeout(ask, 200);
        });
    },
    deleteEmployee: function () {
      console.log("--- Delete an employee ---");
      inquirer
        .prompt({
          type: "input",
          name: "employee_id",
          message: "Enter the id of the employee you would like to delete",
          validate: function(input) {
              return input !== "";
            }
        })
        .then((res) => {
          employees.deleteEmployee(res.employee_id);
          setTimeout(ask, 200);
        });
    },
    exit: function () {
      console.log("--- Exiting app ---");
      process.exit();
    },
  };
  