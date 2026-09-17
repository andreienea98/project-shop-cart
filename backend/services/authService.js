const userModel = require('../models/userModel')
const argon2 = require('argon2')

const registerUser = async (userData) => {
    const { name, email, password } = userData
    const existingUser = await userModel.findUserByEmail(email)

    if (existingUser) {
        throw new Error('Email already registered!')
    }

    const passwordHash = await argon2.hash(password)

    const result = await userModel.createUser(name, email, passwordHash)

    return {
        id: result.insertId,
        name,
        email
    }
}

const findUserByEmail = async (email) => {
    const user = await userModel.findUserByEmail(email)

    if (!user) {
        throw new Error('Email not found!')
    }
    return user
}

const loginUser = async (email, password) => {
    const user = await userModel.findUserByEmail(email)


    if (!user) {
        throw new Error('Invalid email or password')
    }

    const passwordValid = await argon2.verify(user.password_hash, password)

    if (!passwordValid) {
        throw new Error('Invalid email or password')
    }

    return {
        id: user.id,
        name: user.name,
        email: user.email
    }
}

const findUserById = async (id) => {
    const user = await userModel.findUserById(id)
    if (!user) {
        throw new Error('User not found')
    }
    return user
}



module.exports =
{
    registerUser,
    findUserByEmail,
    loginUser,
    findUserById
}