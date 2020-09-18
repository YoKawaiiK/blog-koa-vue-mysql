const router = require('koa-router'),
    send = require('koa-send'),
    config = require('../config/config.js'),
    path = require('path');

const clientRouter = new router();

clientRouter
    .get('(.*)', async (ctx, next) => {
        await send(ctx, 'index.html', {root:'public/dist'});
    })


module.exports = clientRouter;