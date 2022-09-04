const { Router } = require('express')
const m$blog = require('../modules/article.modules')
const response = require('../helpers/response')
const userSession = require('../helpers/middleware')

const ArticleController = Router()

/**
 * Add Artikel
 * @param {string} title
 * @param {string} description
 */
 ArticleController.post('/', userSession, async (req, res, next) => {
    const add = await m$blog.addArticle(req.body)

    response.sendResponse(res, add)
})

/**
 * Edit Artikel
 * @param {number} article_id
 * @param {string} title
 * @param {string} description
 * @param {number} username_id
 */
 ArticleController.put('/', userSession, async (req, res, next) => {
    const add = await m$blog.editArticle(req.body)

    response.sendResponse(res, add)
})

/**
 * Delete Artikel
 * @param {number} article_id
 */
 ArticleController.delete('/:id', userSession, async (req, res, next) => {
    const add = await m$blog.deleteArticle(req.params.id)

    response.sendResponse(res, add)
})

module.exports = ArticleController