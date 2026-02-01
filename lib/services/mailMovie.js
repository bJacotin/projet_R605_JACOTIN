'use strict';

const nodemailer = require('nodemailer');
const { Service } = require('@hapipal/schmervice');

module.exports = class MailMovieService extends Service {

    async envoyerMail(options){

        const testAccount = await nodemailer.createTestAccount();

        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            }
        });

        const mailOptions = {
            from: '"Mail de bienvenue" <test@example.com>',
            to: options.to,
            subject: options.subject,
            text: options.text
        };

        try {
            const info = await transporter.sendMail(mailOptions);
            console.log('Email envoyé !');
            console.log('Lien ethereal  : ' + nodemailer.getTestMessageUrl(info));
            return info;
        } catch(error) {
            console.error('Erreur lors de l\'envoi : ' + error);
            throw error;
        }
    }
}