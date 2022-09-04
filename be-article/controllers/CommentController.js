const { Router } = require('express')
const m$blog = require('../modules/comment.modules')
const response = require('../helpers/response')
const CommentController = Router()

/**
 * Add Komentar
 * @param {number} username_id
 * @param {number} article_id
 * @param { string} comment
 */
 CommentController.post('/', async (req, res, next) => {
    const add = await m$blog.addComment(req.body)

    response.sendResponse(res, add)
})

module.exports = CommentController
