class Employees {
    constructor(connection) {
        this.connection = connection;
    }
    addEmployee(options) {
        this.connection.query(`INSERT INTO employees VALUES ?`, options, callback);
    }
    viewEmployees() {
        
    }
    updateEmployeeRole() {
        
    }
    updateEmployeeManager() {

    }
    deleteEmployee() {
        
    }
}

function callback(err, res) {
  if(err) {
    console.log(chalk.red('Error!'));
    console.log(chalk.red(err));
  }
  else {
    console.log(chalk.cyan(res));
    console.log(chalk.cyan('Query successful.'));
  }
}

module.exports = {
    Employees
};