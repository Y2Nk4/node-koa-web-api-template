let koaRouter = require('koa-router')
let api = require('./api')
let auth = require('./auth')
let publicApi = require('./public_api')

const route = koaRouter()

route.use('/api', api.routes())
route.use('/auth', auth.routes())
route.use('/public_api', publicApi.routes())

module.exports = route
