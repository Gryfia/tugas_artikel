const { Router } = require('express')
const m$blog = require('../modules/user.modules')
const response = require('../helpers/response')

const UserController = Router()

/**
 * List User
 */
 UserController.get('/', async (req, res, next) => {
    const list = await m$blog.listUser()

    response.sendResponse(res, list)
})

/**
 * Add User
 * @param {string} username
 * @param {string} password
 */
 UserController.post('/', async (req, res, next) => {
    const add = await m$blog.addUser(req.body)

    response.sendResponse(res, add)
})

module.exports = UserController