//Helper db yang dibuat
const mysql = require('../helpers/database')
//validation input
const Joi = require('joi')

class _article {
    //create artikel
    addArticle = async (body) => {
        try {
            const schema = Joi.object({
                title: Joi.string().required(),
                description: Joi.string().required(),
                username_id: Joi.number().required()
            })

            const validation = schema.validate(body)

            if (validation.error) {
                const errorDetails = validation.error.details.map(detail => detail.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const add = await mysql.query(
                'INSERT INTO article (title, description, username_id) VALUES (?, ?, ?)',
                [body.title, body.description, body.username_id]
            )

            return {
                status: true,
                data: add
            }
        } catch (error) {
            console.error('addArticle module error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    //edit artikel
    editArticle = async (body) => {
        try {
            const schema = Joi.object({
                article_id: Joi.number().required(),
                title: Joi.string().required(),
                description: Joi.string(),
                username_id: Joi.number().required()
            })

            const validation = schema.validate(body)

            if (validation.error) {
                const errorDetails = validation.error.details.map(detail => detail.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const detail = await mysql.query(
                'SELECT * FROM article WHERE (article_id = ? AND username_id = ?)',
                [body.article_id, body.username_id]
            )

            if (!detail.length > 0) {
                return {
                    status: false,
                    data: 404,
                    error: "Article not found"
                }
            }

            const edit = await mysql.query(
                'UPDATE article SET title = ?, description = ? WHERE article_id = ?',
                [body.title, body.description, body.article_id]
            )

            return {
                status: true,
                data: edit
            }
        } catch (error) {
            console.error('editArticle module error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    //delete artikel
    deleteArticle = async (article_id) => {
        try {
            const body = { article_id }
            const schema = Joi.object({
                article_id: Joi.number().required()
            })

            const validation = schema.validate(body)

            if (validation.error) {
                const errorDetails = validation.error.details.map(detail => detail.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const del = await mysql.query(
                'DELETE FROM article WHERE article_id = ?',
                [article_id]
            )

            return {
                status: true,
                data: del
            }
        } catch (error) {
            console.error('deleteArticle module error: ', error)

            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _article()



