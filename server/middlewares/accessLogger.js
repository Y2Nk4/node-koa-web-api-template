let log4js = require('koa-log4')
let logger = log4js.getLogger('middleware')
// eslint-disable-next-line no-unused-vars
let colors = require('colors')
let Counter = require('passthrough-counter')
let humanize = require('humanize-number')
let bytes = require('bytes')

const colorCodes = {
    5: 'red',
    4: 'yellow',
    3: 'cyan',
    2: 'green',
    1: 'green',
    0: 'yellow'
}

export default async function (ctx, next) {
    let start = new Date()
    logger.info(`${'client -->'.gray} %s %s`, ctx.method, ctx.originalUrl.gray)

    return next().then(function () {
        // calculate the length of a streaming response
        // by intercepting the stream with a counter.
        // only necessary if a content-length header is currently not set.
        const length = ctx.response.length
        const body = ctx.body
        let counter
        if (length == null && body && body.readable) {
            ctx.body = body
                .pipe(counter = Counter())
                .on('error', ctx.onerror)
        }

        // log when the response is finished or closed,
        // whichever happens first.
        const res = ctx.res

        const onfinish = done.bind(null, 'finish')
        const onclose = done.bind(null, 'close')

        res.once('finish', onfinish)
        res.once('close', onclose)

        function done (event) {
            res.removeListener('finish', onfinish)
            res.removeListener('close', onclose)

            let showLength = ''
            let len = counter ? counter.length : length
            if (~[204, 205, 304].indexOf(ctx.status)) {
                showLength = ''
            } else if (len == null) {
                showLength = '-'
            } else {
                showLength = bytes(len)
            }

            logger.info(`${'client <--'.gray} %s %s %s - %s Size:%s`, ctx.method, ctx.url.gray, formatStatusCode(ctx.status), formatTime(start).green, showLength.green)
        }
    }, function (err) {
        // log uncaught downstream errors
        logger.info(`${'client <--'.gray} %s %s - %s`, ctx.status, ctx.url.red, formatTime(start).toString().green, err)
        throw err
    })
}

function formatStatusCode (status) {
    status = status.toString()
    let s = status / 100 | 0
    let color = colorCodes[s]

    return status[color]
}

function formatTime (start) {
    const delta = new Date() - start
    return humanize(delta < 10000
        ? delta + 'ms'
        : Math.round(delta / 1000) + 's')
}
