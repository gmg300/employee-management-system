DROP DATABASE IF EXISTS employees_db;
CREATE database employees_db;

USE employees_db;

CREATE TABLE employee (
  id INT NOT NULL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role_id INT NOT NULL FOREIGN KEY,
  manager_id INT FOREIGN KEY,
);

CREATE TABLE role (
  id INT NOT NULL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id INT NOT NULL FOREIGN KEY,
);

CREATE TABLE department (
  id INT NOT NULL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
);




