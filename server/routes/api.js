// import api from '../controllers/api.js'
import koaRouter from 'koa-router'
import user from './api/user'
const router = koaRouter()

// Use api/user Routes
router.use('/user', user.routes())

export default router
