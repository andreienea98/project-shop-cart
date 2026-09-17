const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const { validateRegister, validateLogin } = require('../middlewares/authValidation.middleware')
const { requireAuth } = require('../middlewares/auth.middleware')

router.post('/register', validateRegister, authController.register)
router.post('/login', validateLogin, authController.login)
router.get('/me', requireAuth, authController.getCurrentUser)
router.post('/logout', requireAuth, authController.logout)



module.exports = router