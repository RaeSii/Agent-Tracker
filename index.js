const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table')

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '2xzne4LIeY$#',
        database: 'staff'
    },
    console.log('Connected to the staff database.')
);

db.connect(function (err, data) {
    if (err) throw err
    init()
})
function allEmployees() {
    const sql = `SELECT * FROM employees`;

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

function findEmployee() {
    const sql = `SELECT * FROM employees WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
}

function deleteEmployee() {
    const sql = `DELETE FROM employees WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.statusMessage(400).json({ error: res.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'Employee not found'
            });
        } else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
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
        const sql = 'INSERT INTO department (name) VALUES( ? );'
        db.query(sql, response.department_name, function (err, data) {
            if (err) throw err
            console.table(data)
        })
    })
}



function createEmployee() {
    const errors = inputCheck(
        body,
        'first_name',
        'last_name',
        'role_id'
    );
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }

    const sql = `INSERT INTO employees (first_name, last_name, role_id)
    VALUES (?,?,?)`;
    const params = [body.first_name, body.last_name, body.role_id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
}


function init() {
    inquirer.prompt([
        {
            type: "list",
            choices: ["View Employees", "View Departments", "View Roles", "Add Department", "Add Role", "Add Employee", "Update Employee Role", "EXIT"],
            message: "what eould you like to do?",
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
            case "Update Employee Role": updateEmployeeRole();
            default: db.end();
                process.exit(0)

        }
    })
}