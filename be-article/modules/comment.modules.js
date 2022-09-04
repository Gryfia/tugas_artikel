//Helper db yang dibuat
const mysql = require('../helpers/database')
//validation input
const Joi = require('joi')

class _comment {
    //create komentar
    addComment = async (body) => {
        try {
            const schema = Joi.object({
                username_id: Joi.number().required(),
                article_id: Joi.number().required(),
                comment : Joi.string().required()
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
                'INSERT INTO comment (username_id, article_id, comment) VALUES (?, ?,?)',
                [ body.username_id, body.article_id, body.comment]
            )

            return {
                status: true,
                data: add
            }
        } catch (error) {
            console.error('addComment module error: ', error)

            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _comment()