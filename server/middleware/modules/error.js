
module.exports = async (ctx, next) => {
    const start = Date.now();
    try {
        await next();
    } 
    catch (err) {
        ctx.status = err.statusCode || err.status || 500;
        console.log(`
            ${ctx.method} > url: ${ctx.url} > time: ${Date.now()/1000 - start/1000}ms
        `);
        console.log(err);
    }
};
