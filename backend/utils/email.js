const nodemailer = require('nodemailer');

const createTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true' || Number(process.env.SMTP_PORT) === 465,
        auth: process.env.SMTP_USER ? {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        } : undefined
    });
};

const sendEmail = async ({ to, subject, text, html, replyTo, attachments }) => {
    if (!process.env.SMTP_HOST || !process.env.ADMIN_EMAIL) {
        throw new Error('Email configuration is missing');
    }

    const transporter = createTransporter();

    const mailOptions = {
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: to || process.env.ADMIN_EMAIL,
        replyTo: replyTo,
        subject: subject,
        text: text,
        html: html,
        attachments: attachments
    };

    return await transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
