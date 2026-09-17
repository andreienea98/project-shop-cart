const authService = require('../services/authService')

const register = async (req, res) => {
    try {
        const userData = req.body
        const user = await authService.registerUser(userData)

        res.status(201).json({
            message: 'Registration successful',
            user
        })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const findUserByEmail = async (req, res) => {
    try {
        const { email } = req.body
        const user = await authService.findUserByEmail(email)
        res.status(200).json(user)
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await authService.loginUser(email, password)
        req.session.userId = user.id
        req.session.save((err) => {
            if (err) {
                return res.status(500).json({ message: 'Could not create session' })
            }
            res.status(200).json({
                message: 'Login successful',
                user
            })
        })

    } catch (error) {
        res.status(401).json({ message: error.message })
    }
}

const getCurrentUser = async (req, res) => {
    try {
        const user = await authService.findUserById(req.session.userId)

        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Could not log out' })
        }

        res.status(200).json({ message: 'Logout successful' })
    })
}

module.exports = {
    register,
    findUserByEmail,
    login,
    getCurrentUser,
    logout
}