let koaRouter = require('koa-router')
let user = require('./api/user')
const router = koaRouter()

// Use api/user Routes
router.use('/user', user.routes())

module.exports = router
