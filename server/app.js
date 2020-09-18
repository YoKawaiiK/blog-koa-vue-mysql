const koa = require('koa'),
    json = require('koa-json'),
    koaRouter = require('koa-router'),
    indexRouter = require('./routes/index'),
    koaBody = require('koa-body'),


    serve = require('koa-static'),
    path = require('path'),

    send = require('koa-send'),
    config = require('./config/config.js'),
    middleware = require('./middleware/index.js'),
    // маршрутизация внутри spa
    historyApiFallback = require('koa2-history-api-fallback'),
    // Для разработки
    cors = require('@koa/cors'),
    logger = require('koa-logger');

const app = new koa();
const router = new koaRouter();



// Подключение дополнительного функционала
// Порядок важен

// статические файлы 
config.static.dir.forEach(dir => {
    app.use( serve( path.join(__dirname, dir) ) )
});


// Парсер json
app.use(json())
    // парсер url
    .use(koaBody()) 
    // для разработки
    .use(cors())
    .use(logger())

    // middleware
    // console.log(middleware);
    for (const method of Object.keys(middleware)) {
        app.use(middleware[method]);
    }


// use historyApiFallback для SPA
app.use(historyApiFallback({
        disableDotRule: true,
        whiteList: ['/api'],
        logger: console.log.bind(console)
    }))


    
    // Маршрутизатор 
app.use(indexRouter.routes())
    .use(indexRouter.allowedMethods());


app.listen(config.server.port, () => {
    console.log(`\n
        -
        URL: 127.0.0.1:${config.server.port}
        -
    \n`);
})