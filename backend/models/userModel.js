const connection = require('./db/connection')

const findUserByEmail = async (email) => {
    const [[user]] = await connection.execute('SELECT * FROM users WHERE email = ?', [email])
    return user
}

const createUser = async (name, email, passwordHash) => {
    const [result] = await connection.execute('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)', [name, email, passwordHash])
    return result
}

const findUserById = async (id) => {
    const [[user]] = await connection.execute('SELECT id, name, email FROM users WHERE id = ?', [id])
    return user
}

module.exports = {
    findUserByEmail,
    findUserById,
    createUser
}