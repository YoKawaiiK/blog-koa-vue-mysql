const { sql } = require('googleapis/build/src/apis/sql');
const router = require('koa-router'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    config = require('../config/config'),
    db = require('../db/index'),

    mailRouter = require('../mail/index')


const apiRouter = new router({prefix: '/api'});

apiRouter
    // Потверждение через нажатие на кнопку в сообщении email
    .get('/exit', async (ctx) => {
        ctx.cookies.set(
            'auth', null, 
            {
                httpOnly: false,
            }
        )
        ctx.cookies.set(
            'jwt', null, 
            {
                httpOnly: false,
            }
        )
        ctx.cookies.set(
            'user_id', null, 
            {
                httpOnly: false,
            }
        )
        ctx.body = { exit: true } 
    })
    .put('/signin/verification/:token', async (ctx) => {
        let decoded;
        try {
           
            decoded = await jwt.verify(ctx.params.token, config.auth.jwt.key);
            // После ошибки эта часть не выполняется, и идет выполнение следующего блока кода
        }
        catch (err) {
            if (err.name == 'TokenExpiredError') {
                ctx.body = {emailTokenExpired: true}
                return;
            }
            else {
                ctx.body = {errorToken: true}
            }  
        } 
        let checkConfirmEmail
        try { 
            checkConfirmEmail = await db.query(`
                SELECT confirm
                FROM users
                WHERE user_id = '${decoded.user_id}'
            `)
        } 
        catch (err) {
            throw err
        }
        if (checkConfirmEmail[0][0].confirm == 1) {
            ctx.body = { emailConfirmDouble: true }

        }
        else {
            let signinNewUser;
            try {
                signinNewUser = await db.query(`
                    UPDATE users 
                    SET confirm = '1' 
                    WHERE user_id = '${decoded.user_id}';
                `)
            } 
            catch (err) {
                throw err
            }
            if (signinNewUser[0].warningStatus != 0) {
                ctx.body = { error: true }
            }
            else {
                ctx.body = { emailConfirm: true }
            }
        }
    })
    .post('/signin', async (ctx) => {
        const signinData = ctx.request.body;
        if (
            signinData.password.email < 7 ||
            signinData.password.length < 7 || 
            signinData.doublePassword.length < 7
        ) {
            ctx.body = {shortPassword: true}
        }
        else if (
            signinData.password.email > 40 ||
            signinData.password.length > 40 || 
            signinData.doublePassword.length > 40
        ) {
            ctx.body = {dataSigninTooLong: true}
        } 
        else if (signinData.password != signinData.doublePassword) {
            ctx.body = {passwordNotEquivalent: true}
        } 
        else { 
            let signinNewUser;
            try {
                signinNewUser = await db.query(`
                    SELECT user_id, email, confirm
                    FROM users
                    WHERE 
                        email = '${signinData.email}'
                `) 
            }
            catch (err) {
                console.log(err);
                ctx.throw(400, 'INVALID_DATA');
            }
            const passwordHash = await bcrypt.hashSync(signinData.password, 10)
            if (typeof signinNewUser[0][0] != 'undefined') {
                // Попытка повторной регистрации
                if (signinNewUser[0][0].confirm == 1) {
                    ctx.body = {doubleSignin: true}
                }
                else {
                    let reSignin; 
                    try {
                        reSignin = await db.query(`
                            UPDATE users
                            SET signin_data = CURRENT_TIMESTAMP,
                                password = '${passwordHash}'
                            WHERE (user_id = '${signinNewUser[0][0].user_id}');
                        `)
                    } 
                    catch (err) {
                        if (err.code == 'ER_PARSE_ERROR') {
                            ctx.body = {errorParse: true}
                            return;
                        }
                        else {
                            ctx.throw(400, 'INVALID_DATA: ' + err)
                        }
                    }
                    const emailToken = jwt.sign(
                        { user_id: signinNewUser[0][0].user_id},
                        config.auth.jwt.key,
                        { expiresIn: config.email.emailConfirmation.jwtExpiresIn }
                    )
                    mailRouter.signin(
                        signinData.email,
                        {   
                            'login': signinData.email,
                            'password': signinData.password,
                            'link': `${ctx.header.origin}/signin/verification/${emailToken}`,
                            'expiresInMinute': config.email.emailConfirmation.jwtExpiresIn / ( 60 * 1000 ) 
                        }
                    )
                    ctx.body = {accessSignin: true}
                }
            }
            else {
                let insertNewUser;
                try {
                    insertNewUser = await db.query(`
                        INSERT INTO \`users\`
                        (email, password) 
                        VALUES (
                            '${signinData.email}',
                            '${passwordHash}'
                        );
                    `)
                } 
                catch (err) {
                    ctx.throw(400, 'INVALID_DATA');
                }
                if (insertNewUser[0].warningStatus != 0) {
                    ctx.body = {errorDB: true}
                }
                else {
                    const emailToken = jwt.sign(
                        { user_id: insertNewUser[0].insertId},
                        config.auth.jwt.key,
                        { expiresIn: config.email.emailConfirmation.jwtExpiresIn }
                    )
                    mailRouter.signin(
                        signinData.email,
                        {   
                            'login': signinData.email,
                            'password': signinData.password,
                            'link': `${ctx.header.origin}/signin/verification/${emailToken}`,
                            'expiresInMinute': config.email.emailConfirmation.jwtExpiresIn / 60
                        }
                    )

                    ctx.body = {accessSignin: true}
                }
            }
        }
    })
    .post('/login', async (ctx) => {   
        const loginData = ctx.request.body;

        if (
            loginData.password.login < 7 ||
            loginData.password.length < 7 
        ) {
            ctx.body = {shortPassword: true}
        }
        else if (
            loginData.password.login > 40 ||
            loginData.password.length > 40
        ) {
            ctx.body = {dataLoginTooLong: true}
        } 
        else {
            let checkUser;
            try {
                checkUser = await db.query(`
                    SELECT 
                        login, user_id, email, password, confirm
                    FROM 
                        users
                    WHERE 
                        (login = '${loginData.login}' OR 
                        email = '${loginData.login}')
                `)
            } 
            catch (err) {
                if (err.code == 'ER_PARSE_ERROR') {
                    ctx.body = {errorParse: true}
                    return;
                }
                else {
                    ctx.throw(400, 'INVALID_DATA: ' + err)
                }
            }
            if (typeof checkUser[0][0] == 'undefined') {
                ctx.body = {loginNotFound: true}
            }
            else if (checkUser[0][0].confirm != 1) {
                ctx.body = {emailNotConfirmed: true}
            }
            else {
                passwordCheck = await bcrypt.compare(loginData.password, checkUser[0][0].password)
                if (passwordCheck != true) {
                    ctx.body = {accessDenied: true}
                }
                else {
                    ctx.cookies.set(
                        'jwt', 
                        jwt.sign(
                            { user_id: checkUser[0][0].user_id},
                            config.auth.jwt.key,
                            { expiresIn: config.auth.jwt.expiresIn }
                        ), 
                        {maxAge: config.auth.jwt.expiresIn}
                    )
                    ctx.cookies.set(
                        'auth', true, 
                        {
                            httpOnly: false,
                            maxAge: config.auth.jwt.expiresIn
                        }
                    )
                    ctx.cookies.set(
                        'user_id', checkUser[0][0].user_id, 
                        {
                            httpOnly: false,
                            maxAge: config.auth.jwt.expiresIn
                        }
                    )
                    ctx.body = { accessAllowed: true } 
                }
            }
        }    
    })
    // Вывод записей пользователя
    .put('/posts/user/:user_id/pagination/:pagination', async (ctx) => {
        let postsPerPage = config.posts.postsPerPage;
        // Если попытка ввести не цифру
        if (typeof +ctx.params.pagination != 'number') {
            ctx.body = {errorParams: true}
            return;
        } 

        let pagination = + ctx.params.pagination;
        let selectPosts;
        let selectUserLogin;
        let selectTotalPosts;
        try {
            let user_id = ctx.params.user_id
            selectPosts = await db.query(`
                SELECT 
                    P.post_id,
                    P.message,
                    date_format(P.date, '%d.%m.%Y %H:%i') AS date,
                    color
                FROM 
                    posts as P
                WHERE 
                    P.user_id = '${user_id}' 
                ORDER BY P.date DESC
                LIMIT ${(pagination * postsPerPage) - postsPerPage}, ${postsPerPage}
            `)

            selectUserLogin = await db.query(`
                SELECT login
                FROM users
                WHERE user_id = '${user_id}'
            `)

            selectTotalPosts = await db.query(`
                SELECT 
                    COUNT (*) as totalPosts 
                FROM posts
                WHERE user_id = '${user_id}'
            `)

        }
        catch (err) {
            throw err;
        }
        ctx.body = {
            posts: selectPosts[0],
            userLogin: selectUserLogin[0][0].login,
            totalPosts: selectTotalPosts[0][0].totalPosts
        }
    })
    // Получение последней записи на странице (после удаления)
    .post('/post', async (ctx) => {
        let post_id = ctx.request.body.post_id;
        let selectLastPost;
        try {
            let decode = jwt.verify(ctx.cookies.get('jwt'), config.auth.jwt.key)
            selectLastPost = await db.query(`
                SELECT 
                    post_id, date, message
                FROM posts 
                WHERE post_id < '${post_id}' AND
                    user_id = '${decode.user_id}'
                ORDER BY date DESC 
                LIMIT 1;
            `)
        } 
        catch (err) {
            throw err
        }
        if (selectLastPost[0][0]) {
            ctx.body = selectLastPost[0][0]
        } 
        else {
            ctx.body = { empty: true }
        }
    })
    // Вставка записи
    .post('/insert', async (ctx) => {
        let data = ctx.request.body;
        // post.message
        // post.color
        // 
        if (data.message.length < 10) {
            ctx.body = {shortMessage: true}
        }
        else if (data.message.length > 1000) {
            ctx.body = {longMessage: true}
        }
        else {
            let dataInsert;
            let decoded;
            try {
                decoded = jwt.verify(ctx.cookies.get('jwt'), config.auth.jwt.key);
                dataInsert = await db.query(`
                    INSERT 
                    INTO 
                        posts (user_id, message) 
                    VALUES 
                        ('${decoded.user_id}', '${data.message}');
                `)
            } 
            catch (err) {
                if (err.name == 'JsonWebTokenError') {
                    ctx.body = {sessionEnded: true}
                    return
                }
                else if (err.code == 'ER_PARSE_ERROR') {
                    ctx.body = {errorParse: true}
                    return;
                }
                else {
                    throw err
                }
            }
            if (dataInsert[0].warningStatus != 0) {
                ctx.body = { errorInsertPost: true }
            }
            else {
                let selectPost;
                try {
                    selectPost = await db.query(`
                        SELECT date_format(date, '%d.%m.%Y %H:%i') AS date
                        FROM posts
                        WHERE 
                            user_id = '${decoded.user_id}' AND 
                            post_id = ${dataInsert[0].insertId}
                    `)
                } 
                catch (err) {
                    throw err;
                }
                ctx.body = {
                    post_id: dataInsert[0].insertId,
                    message: data.message,
                    date: selectPost[0][0].date
                }
            }
        }
    })
    // Обновление записи
    .patch('/update', async (ctx) => {
        let data = ctx.request.body;
        // data.message
        // data.color

        if (
            data.message.length < 5 || 
            data.message.length > 1000
        ) {
            ctx.body = { updateLengthError: true }
        } 
        else {
            let updatePost;
            let decoded;
            try {
                decoded = jwt.verify(ctx.cookies.get('jwt'), config.auth.jwt.key)
    
                let sql = `
                    UPDATE posts
                `
                if (typeof data.message != undefined) {
                    sql += `
                        SET message = '${data.message}'
                    `
                } 
                sql += `
                    WHERE 
                        post_id = '${data.post_id}' AND
                        user_id = '${decoded.user_id}'
                `
                updatePost = await db.query(sql)
            } 
            catch (err) {
                if (err.code == 'ER_PARSE_ERROR') {
                    ctx.body = {errorParse: true}
                    return;
                }
                else {
                    throw err
                }
            }
            if (updatePost[0].warningStatus != 0) {
                ctx.body = { errorUpdate: true }
            }
            else {
                ctx.body = { postUpdated: true}
            }
        }
    })
    // Удаление записи
    .post('/delete', async (ctx) => {
        let post_id = ctx.request.body.post_id;
        let postDeleted;
        try {
            let token = jwt.verify(ctx.cookies.get('jwt'), config.auth.jwt.key);

            // Возможно добавить проверку наличия такого поста у пользователя
            postDeleted = await db.query(`
                DELETE FROM posts
                WHERE 
                    user_id = '${token.user_id}' AND
                    post_id = '${post_id}';
            `) 
        } 
        catch (err) {
            throw err;
        }
        if (postDeleted[0].warningStatus != 0) {
            ctx.body = { postDeletedError: true }
        }
        else {
            ctx.body = { postDeleted: true}
        }
    })


module.exports = apiRouter;