require('dotenv').config()
const express = require('express')
const app = express()

module.exports = app => {
    app.use('/api/auth', require('./authRoutes'))
}