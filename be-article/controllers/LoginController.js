const { Router } = require('express')
const m$login = require('../modules/login.modules')
const response = require('../helpers/response')



const LoginController =Router()

/**
 * Login
 * @param {string} username
 * @param {string} password
 */
 LoginController.post('/login', async (req, res, next) => {
    const login = await m$login.login(req.body)

    response.sendResponse(res, login)
})


module.exports = LoginController