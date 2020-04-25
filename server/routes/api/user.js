import user from '../../controllers/user.js'
import koaRouter from 'koa-router'
const router = koaRouter()

router.get('/info', user.getUserInfo) // 定义url的参数是id

export default router
