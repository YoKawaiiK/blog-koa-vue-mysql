const jwt = require('jsonwebtoken'),
    config = require('../../config/config')

module.exports = async (ctx, next) => {
    let token = ctx.cookies.get('jwt');

    console.log(ctx.request.url);

    try {
        jwt.verify(token, config.auth.jwt.key);
        // Делать дальнейший middleware, если всё нормально
        await next();
    } 
    catch (err) {
        if (err.name == 'TokenExpiredError') {
            ctx.body = {session: false}
        }
        else if (err.name == 'JsonWebTokenError') {
            // Если до этого не было cookie 
            if (err.message == 'jwt must be provided') {
                await next();
            }
            else {
                ctx.body = {access: false}
            }
        }
        else {
            ctx.body = {errorToken: true}
        }
    }
};
