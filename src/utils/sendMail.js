const nodemailer = require('nodemailer');
const { MAILER_PASSWORD, MAILER_EMAIL } = require('./../env');

const transporter = nodemailer.createTransport({
    pool: true,
    service: 'gmail',
    secure: true,
    auth: {
        user: MAILER_EMAIL,
        pass: MAILER_PASSWORD,
    },
});

const sendMail = async ({ toAddress = '', body = '', subject = 'Test', attachments = [] }) => {
    if (!toAddress) {
        throw new Error('need target to address to send mail');
    }
    const result = await transporter.sendMail({
        from: MAILER_EMAIL, // sender address
        to: toAddress, // list of receivers
        subject, // Subject line
        html: body, // html body
        attachments,
    });

    return result;
};

module.exports = sendMail;
