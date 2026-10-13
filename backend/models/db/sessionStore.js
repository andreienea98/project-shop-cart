const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session)
const connection = require('./connection')

const sessionStore = new MySQLStore(
    {
        createDatabaseTable: true
    },
    connection
)

module.exports = sessionStore