require('dotenv').config();

const mysql = require('mysql2');
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
});

async function createDatabase(name) {
    try {
        await connection.promise().query(`CREATE DATABASE ${name}`);
    }
    catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

module.exports = {
    createDatabase,
};