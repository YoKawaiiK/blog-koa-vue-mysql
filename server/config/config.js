


module.exports = {
    server: {
        port: process.env.PORT || 3001
    },
    static: {
        // Нельзя папку в папке раздавать
        // Все необходимые папки в каталоге public
        dir: ['public/dist', 'public']
    },
    db: {
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        port: 3306,
        database: 'db_koa_learn'
        // В MySQL
        // ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
    },
    auth: {
        jwt: {
            key: 'Red1559lm',
            // 1 час
            expiresIn: 1000 * 60 * 60
        }
    },
    email: {
        adress: {
            name: '####',
            adress: '####@gmail.com'
        },
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: '###@gmail.com',
            clientId: '####',
            clientSecret: '####',
            refreshToken: '####',
            accessToken: '####',
            redirectURL: 'https://developers.google.com/oauthplayground'
        },
        viewsPath: 'views',
        emailConfirmation: {
            // 1 час
            jwtExpiresIn: 1000 * 60 * 60
        }
    },
    posts: {
        postsPerPage: 10,
        variantOfColor: 5
    }
}
