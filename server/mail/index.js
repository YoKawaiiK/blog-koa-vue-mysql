const sendMail = require('./config')


const mailRouter = {
    signin: (email, data) => {
        sendMail(
            'signin',
            email,
            'Регистрация в системе',
            'Потверждение почты.',
            data
        )
    },
}

module.exports = mailRouter;