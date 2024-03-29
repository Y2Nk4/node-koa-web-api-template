require('./env')
let Koa = require('koa')
let json = require('koa-json')
// let jwt = require('koa-jwt')
let path = require('path')
let serve = require('koa-static')
let historyApiFallback = require('koa2-history-api-fallback')
let koaBodyparser = require('koa-bodyparser')
let KoaValidate = require('koa-validate')
let responses = require('./server/helpers/responses')
let accessLogger = require('./server/middlewares/accessLogger')
let formatValidationError = require('./server/helpers/formatValidationError')
// cors
const cors = require('@koa/cors')
// routes
let appRoutes = require('./server/routes/routes.js')

// log处理
const log4js = require('koa-log4')
const { levels } = require('koa-log4')
log4js.configure({
    appenders: {
        access: {
            type: 'dateFile',
            pattern: '-yyyy-MM-dd.log', // 生成文件的规则
            filename: path.join('logs/', 'access.log') // 生成文件名
        },
        application: {
            type: 'dateFile',
            pattern: '-yyyy-MM-dd.log',
            filename: path.join('logs/', 'application.log')
        },
        database: {
            type: 'dateFile',
            pattern: '-yyyy-MM-dd.log',
            filename: path.join('logs/', 'database.log')
        },
        out: {
            type: 'console'
        }
    },
    categories: {
        default: { appenders: [ 'out' ], level: 'WARN' },
        access: { appenders: [ 'access' ], level: 'all' },
        middleware: { appenders: [ 'out' ], level: 'all' },
        database: { appenders: [ 'database' ], level: 'all' },
        application: { appenders: [ 'application', 'out' ], level: 'all' },
        SteamBot: { appenders: [ 'application', 'out' ], level: 'all' }
    },
    replaceConsole: true
})

// 加载sequelize的关联
require('./server/config/db')
require('./server/config/association')

const app = new Koa()
KoaValidate(app)

let port = process.env.PORT

app.use(koaBodyparser())
    .use(json())
    .use(accessLogger) // 美化访问日志(logger是middleware)
    // 记录访问日志
    .use(log4js.koaLogger(log4js.getLogger('access'), {
        level: 'auto',
        levelMapper: function (statusCode) {
            if (statusCode >= 400) return levels.ERROR
            if (statusCode >= 300) return levels.WARN
            return levels.INFO
        }
    }))
    .use(async function (ctx, next) {
        ctx.success = responses.success.bind(ctx)
        ctx.formatValidationError = formatValidationError.bind(ctx)
        ctx.error = responses.error.bind(ctx)
        ctx._logger = log4js.getLogger('application')
        await next()
    })
    .use(async function (ctx, next) {
        // 错误处理
        try {
            await next()
        } catch (err) {
            //  如果JWT验证失败，返回验证失败信息
            if (err.status === 401) {
                ctx.status = 401
                ctx.body = {
                    success: false,
                    token: null,
                    error: 'Unauthorized Access'
                }
            } else {
                ctx._logger.error(err)
                ctx.error(process.env.ENV === 'DEV' ? err.message : 'Internal Server Error', 500)
            }
        }
    })
    .use(async (ctx, next) => {
        ctx.set('X-Powered-By', process.env.X_POWERED_BY || 'koa')
        await next()
    })
    .use(cors({
        origin (ctx) {
            // When the project is in development mode, it will accepts all origins
            if (process.env.ENV === 'DEV') {
                return ctx.get('Origin')
            } else {
                return process.env.CROS_ORIGINS || ''
            }
        }
    }))

app.on('error', function (err, ctx) {
    console.log('server error', err)
    ctx.response.body = {
        success: false,
        error: err.message
    }
})

app.use(appRoutes.routes()) // 将路由规则挂载到Koa上。
app.use(historyApiFallback())
app.use(serve(path.resolve('dist'))) // 将webpack打包好的项目目录作为Koa静态文件服务的目录

export default app.listen(port, () => {
    console.log(`Koa is listening in ${port}`)
})
