const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table')

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'staff'
    },
    console.log('Connected to the staff database.')
);

db.connect(function (err, data) {
    if (err) throw err
    init()
})
function allEmployees() {
    const sql = `SELECT employees.id, first_name, last_name, roles.title, department_id, roles.salary, manager_id FROM employees INNER JOIN roles ON employees.role_id=roles.id`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        console.table(rows)
        init()
    });
}

function viewDepartments() {
    const sql = `SELECT * FROM department`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        console.table(rows)
        init()
    });
}

function viewRoles() {
    const sql = `SELECT * FROM roles`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        console.table(rows)
        init()
    });
}

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department_name',
            message: 'Enter Dept Name:'
        }
    ]).then(function (response) {
        const sql = 'INSERT INTO department (name) VALUES( ? )';
        db.query(sql, response.department_name, function (err, data) {
            if (err) throw err
            console.table(data)
            init()
        })
    })
}

function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter New Role Name:'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter Annual Salary:'
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'Enter Department Number:'
        }

    ]).then(function (response) {
        const sql = 'INSERT INTO roles (title, salary, department_id) VALUES( ?,?,? )';
        db.query(sql, [response.title, response.salary, response.department_id], function (err, data) {
            if (err) throw err
            console.table(data)
            init()
        })
    })
}

function createEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: "Enter New Employee's First Name:"
        },
        {
            type: 'input',
            name: 'last_name',
            message: "Enter New Employee's Last Name:"
        },
        {
            type: 'input',
            name: 'role_id',
            message: "Enter New Employee's Role ID:"
        },
        {
            type: 'input',
            name: 'department_id',
            message: "Enter New Employee's Department ID:"
        },
        {
            type: 'input',
            name: 'manager_id',
            message: "Enter New Employee's Manager ID:"
        },
    ]).then(function (response) {

        const sql = `INSERT INTO employees (first_name, last_name, role_id, department_id, manager_id)
    VALUES (?,?,?,?,?)`;
        db.query(sql, [response.first_name, response.last_name, response.role_id, response.department_id, response.manager_id], function (err, data) {
            if (err) throw err
            console.table(data)
            init()
        })
    })
}

function deleteDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department_id',
            message: 'Enter Dept ID:'
        }
    ]).then(function (response) {
        const sql = 'DELETE FROM Department WHERE id = ?';
        db.query(sql, response.department_id, function (err, data) {
            if (err) throw err
            console.table(data)
            init()
        })
    })
}

function deleteRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'role_id',
            message: 'Enter Role ID:'
        }
    ]).then(function (response) {
        const sql = 'DELETE FROM roles WHERE id = ?';
        db.query(sql, response.role_id, function (err, data) {
            if (err) throw err
            console.table(data);
            init()
        })
    })
}

function deleteEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'employee_id',
            message: 'Enter Employee ID:'
        }
    ]).then(function (response) {
        const sql = 'DELETE FROM employees WHERE id = ?';
        db.query(sql, response.employee_id, function (err, data) {
            if (err) throw err
            console.table(data)
            init()
        })
    })
}

function updateEmployeeRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'role_id',
            message: "Enter Employee's New Role ID:"
        },
        {
            type: 'input',
            name: 'employee_id',
            message: "Enter Employee's ID:"
        }
    ]).then(function (response) {
        const sql = 'UPDATE employees SET role_id = ? WHERE id = ?';
        db.query(sql, [response.role_id, response.employee_id], function (err, data) {
            if (err) throw err
            console.table(data)
            init()
        })
    })
}

function init() {
    inquirer.prompt([
        {
            type: "list",
            choices: ["View Employees", "View Departments", "View Roles", "Add Department", "Add Role", "Add Employee","Delete Department",  "Delete Role", "Delete Employee", "Update Employee Role", "EXIT"],
            message: "What would you like to do?",
            name: "option"
        }
    ]).then(function (response) {
        switch (response.option) {
            case "View Employees": allEmployees();
                break;
            case "View Departments": viewDepartments();
                break;
            case "View Roles": viewRoles();
                break;
            case "Add Department": addDepartment();
                break;
            case "Add Role": addRole();
                break;
            case "Add Employee": createEmployee();
                break;
            case "Delete Department": deleteDepartment();
                break;
            case "Delete Role": deleteRole();
                break;
            case "Delete Employee": deleteEmployee();
                break;
            case "Update Employee Role": updateEmployeeRole();
                break;
            default: db.end();
                process.exit(0)

        }
    })
}