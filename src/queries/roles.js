class Roles {
    constructor(connection) {
        this.connection = connection;
    }
    addRole() {

    }
    viewRoles() {
        
    }
    deleteRole() {

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
    Roles
};