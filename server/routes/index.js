const router = require('koa-router'),
    clientRouter = require('./client.js')
    apiRouter = require('./api.js')

const indexRouter = new router(),
    allRouters = [apiRouter, clientRouter];
for (const router of allRouters) {
    indexRouter.use(router.routes()) 
        .use(router.allowedMethods())
};

module.exports = indexRouter;