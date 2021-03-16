let user = require('../../controllers/user.js')
let koaRouter = require('koa-router')
const router = koaRouter()

router.get('/info', user.getUserInfo) // 定义url的参数是id

module.exports = router
