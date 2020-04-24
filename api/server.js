const Koa = require('koa'),
    router = require('./routes/router'),
    log4js = require('log4js'),
    bodyParser = require('koa-bodyparser'),
    collect = require('collect.js'),
    koaCompose = require('koa-compose'),
    auth = require('./middlewares/auth'),
    app = new Koa();

require('koa-validate')(app)

module.exports = function (KoaAppConf, Services = {}) {
    this._CONF = KoaAppConf;

    this._logger = log4js.getLogger('KoaApp');

    /**
     * Load The Middleware
     * */
    app
        .use(bodyParser())
        //.use(jwt(KoaAppConf.JWTConf.Secret))
        .use(async (ctx, next) => {
            for(let Service in Services){
                ctx.state[Service] = Services[Service]
            }

            ctx.state._logger = this._logger;

            ctx.state._CONF = this._CONF;

            this._logger.info(ctx.method, "Request From", ctx.ip);
            ctx.state._logger = this._logger;

            await next();
        })
        .use(async (ctx, next) => {
            try {
                await next();
            } catch (err) {
                this._logger.error('Middle Caught Error', err);
                ctx.response.status = err.statusCode || err.status || 500;
                ctx.response.body = {
                    success: false,
                    error: err.message
                };
            }
        });
    //.use(auth(KoaAppConf.authSecret));
    /*.use(router.routes())
    .use(router.allowedMethods());*/

    if(this._CONF['isAuthMiddlewareOn']){
        app.use(auth(KoaAppConf.authSecret));
    }

    /**
     * Load All Router
     * */
    let routers = [];
    let routers_init = require('require-all')({
        dirname     :  __dirname + '/routes',
        filter      :  /(.*)\.js$/,
    });
    Object.keys(routers_init).forEach((name) => {
        let router = routers_init[name];
        routers.push(router.routes());
        routers.push(router.allowedMethods());
    });
    app.use(koaCompose(routers));

    /**
     * Listen
     * */
    app.listen(KoaAppConf.port, () => {
        this._logger.info('KoaApp starts at port ' + KoaAppConf.port + '!');
    });

    /**
     * Handle the Error
     * */
    app.onerror = console.error
};
