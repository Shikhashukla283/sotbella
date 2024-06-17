// permissionRoutes.js
const authenticationRouter = require('express').Router()
const authenticationController = require('../controllers/authController')

authenticationRouter.get('/login', authenticationController.login)

module.exports = authenticationRouter
