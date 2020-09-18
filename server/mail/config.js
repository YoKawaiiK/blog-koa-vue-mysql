const nodemailer = require('nodemailer'),
    {google} = require('googleapis'),
    config = require('../config/config'),

    { compile } = require('handlebars'),
    mjml2html = require('mjml'),
    path = require('path'),
    fs = require('fs')

const OAuth2Client = new google.auth.OAuth2(
    config.email.auth.clientId,
    config.email.auth.clientSecret,
    config.email.auth.redirectURL
)

// обновление accessToken
OAuth2Client.setCredentials({
    refresh_token: config.email.auth.refreshToken
})
const updateRefreshToken = OAuth2Client.getAccessToken()

const transport = nodemailer.createTransport({
    service: config.email.service,
        auth: {
            type:  config.email.auth.type,
            user: config.email.adress.adress,
            clientId: config.email.auth.clientId,
            clientSecret: config.email.auth.clientSecret,
            refreshToken: config.email.auth.refreshToken,
            accessToken: updateRefreshToken
        }
})
// Проверка
try {
    transport.verify;
} 
catch (err) {
    throw err
}

const sendMail = (
    pathFrom,
    to,
    subject,
    text,
    data
) => {
    try {
        let mjmlToHbs = mjml2html(
            fs.readFileSync(path.join(__dirname, config.email.viewsPath, pathFrom + '.mjml'), 
            'utf-8')
        )
        hbsTemplate = compile(mjmlToHbs.html),
        hbsToHtml = hbsTemplate(data)

        transport.sendMail({
            'from': `${config.email.adress.name} <${config.email.adress.adress}>`,
            'to': to,
            'subject': subject,
            'text': text || 'Здраствуйте! Вам сообщение.',
            'html': hbsToHtml
        })
    } catch (err) {
        throw err
    }
}

module.exports = sendMail;