const mysql = require('mysql2/promise'),
    config = require('../config/config')

// Проверить подключение к бд

let db;

try {
    db = mysql.createPool(config.db);
}
catch (error) {
    throw 'Error conection: ' + err.message;
}

module.exports = db;




