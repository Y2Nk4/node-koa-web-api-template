let auth = require('../controllers/auth.js')
let koaRouter = require('koa-router')
const router = koaRouter()

router.post('/login', auth.userLogin)

module.exports = router
