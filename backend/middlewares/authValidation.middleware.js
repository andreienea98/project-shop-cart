const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const validateRegister = (req, res, next) => {
    const { name, email, password } = req.body

    if (!name) {
        return res.status(400).json({
            message: 'Name is required'
        })
    }

    if (name.length < 2) {
        return res.status(400).json({ message: 'Name must be at least 2 characters long' })
    }

    if (!email) {
        return res.status(400).json({
            message: 'Email is required'
        })
    }

    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'The email must have the format example@email.com' })
    }

    if (!password || password.length < 8) {
        return res.status(400).json({
            message: 'Password must be at least 8 characters'
        })
    }

    next()
}

const validateLogin = (req, res, next) => {
    const { email, password } = req.body
    if (!email) {
        return res.status(400).json({
            message: 'Email is required'
        })
    }

    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'The email must have the format example@email.com' })
    }

    if (!password) {
        return res.status(400).json({ message: 'Password is required' })
    }

    next()
}


module.exports = {
    validateRegister,
    validateLogin
}