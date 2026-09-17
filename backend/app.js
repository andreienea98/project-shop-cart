const express = require('express')
const session = require('express-session')
const sessionStore = require('./models/db/sessionStore')
const app = express()
const authRoute = require('./routes/authRoute')
const cors = require('cors')

app.use(express.json())

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}))


app.use('/api/auth', authRoute)



module.exports = app