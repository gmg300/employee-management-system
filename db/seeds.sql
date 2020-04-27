-- Seed departments data
INSERT INTO departments (dept_name) VALUES ('Management');
INSERT INTO departments (dept_name) VALUES ('Accounting');
INSERT INTO departments (dept_name) VALUES ('Sales');
INSERT INTO departments (dept_name) VALUES ('Warehouse');

-- Seed roles data
INSERT INTO roles (title, salary, dept_id) VALUES ('Regional Manager', 80000, 1);
INSERT INTO roles (title, salary, dept_id) VALUES ('Assistant Regional Manager', 62000, 1);
INSERT INTO roles (title, salary, dept_id) VALUES ('Senior Accountant', 58000, 2);
INSERT INTO roles (title, salary, dept_id) VALUES ('Accountant', 50000, 2);
INSERT INTO roles (title, salary, dept_id) VALUES ('Regional Director of Sales', 70000, 3);
INSERT INTO roles (title, salary, dept_id) VALUES ('Sales Rep', 48000, 3);
INSERT INTO roles (title, salary, dept_id) VALUES ('Foreman', 62000, 4);
INSERT INTO roles (title, salary, dept_id) VALUES ('Laborer', 42000, 4);

-- Seed employee data
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Michael", "Scott", 1, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Dwight", "Schrute", 2, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Angela", "Martin", 3, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Oscar", "Martinez", 4, 3);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Kevin", "Malone", 4, 3);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Jim", "Halpert", 5, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Phyllis", "Vance", 6, 5);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Stanley", "Hudson", 6, 5);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Daryl", "Philbin", 7, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Lonnie", "Stuart", 8, 7);










