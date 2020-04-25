const chalk = require("chalk");

class Departments {
    constructor(connection) {
        this.connection = connection;
    }
    addDepartment(dept_name) {
        this.connection.query('INSERT INTO departments (dept_name) VALUES (?)', dept_name, callback);
    }
    viewDepartments() {

    }
    viewBudgetByDepartment() {

    }
    deleteDepartment() {

    }
}

function callback(err, res) {
    if(err) {
      console.log(chalk.red('Error!'));
      console.log(chalk.red(err));
    }
    else {
      console.log(chalk.green(res));
      console.log(chalk.green('Query successful.'));
    }
  }

module.exports = {
    Departments
};