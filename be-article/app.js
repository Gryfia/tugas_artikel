const express = require('express')
const response = require('./helpers/response')
const routes = require('./routes')
const cors = require('cors')
const app = express()

const port = process.env.PORT || 5001

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', async (rec, res, next) => {
    res.status(200).send({
        message: "Welcome to API Artikel List"
    })
})

routes(app)

app.use(response.errorHandler)

app.listen(port, () => {
    console.log(`Server connected to port ${port}`)
})