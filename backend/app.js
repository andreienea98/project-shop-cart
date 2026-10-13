const express = require('express')
const session = require('express-session')
const sessionStore = require('./models/db/sessionStore')
const app = express()
const authRoute = require('./routes/authRoute')
const cors = require('cors')
const paymentRoute = require("./routes/paymentRoute")

app.use(express.json())

const allowedOrigins = ['http://localhost:5173']

if (process.env.CLIENT_URL) {
    allowedOrigins.push(process.env.CLIENT_URL)
}

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}))

const isProduction = process.env.NODE_ENV === 'production'

app.set('trust proxy', 1)

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
        maxAge: 1000 * 60 * 60 * 24
    }
}))


app.use('/api/auth', authRoute)
app.use('/api/payment', paymentRoute)



module.exports = app