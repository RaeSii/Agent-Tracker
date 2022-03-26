const inquirer = require('inquirer');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3000;

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '2xzne4LIeY$#',
        database: 'staff'
    },
    console.log('Connected to the election database.')
);