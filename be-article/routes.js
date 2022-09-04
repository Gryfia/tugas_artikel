const LoginController = require("./controllers/LoginController")
const UserController = require("./controllers/UserController")
const ArticleController = require("./controllers/ArticleController")
const CommentController = require("./controllers/CommentController")

const _routes = [
    ['', LoginController],
    ['/users', UserController],
    ['/articles', ArticleController],
    ['/comment', CommentController]
]

const routes = (app) => {
    _routes.forEach(route => {
        const [ url, controller ] = route
        app.use(`/api${url}`, controller)
    });
}

module.exports = routes