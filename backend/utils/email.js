const nodemailer = require('nodemailer');

// Safe transporter creation with defaults
const createTransporter = () => {
    // Default to 465 (SSL) which is more reliable for Zoho
    const port = Number(process.env.SMTP_PORT) || 465;
    const secure = process.env.SMTP_SECURE === 'true' || port === 465;

    console.log(`Initializing SMTP Transporter: ${process.env.SMTP_HOST}:${port} (Secure: ${secure})`);

    return nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.zoho.com', // Fallback to Zoho
        port: port,
        secure: secure,
        auth: process.env.SMTP_USER ? {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        } : undefined,
        tls: {
            rejectUnauthorized: false
        },
        // Increased timeouts
        connectionTimeout: 30000, 
        greetingTimeout: 30000,
        socketTimeout: 30000,
        debug: true,
        logger: true 
    });
};

const sendEmail = async ({ to, subject, text, html, replyTo, attachments }) => {
    const missingVars = [];
    if (!process.env.SMTP_HOST) missingVars.push('SMTP_HOST');
    if (!process.env.SMTP_USER) missingVars.push('SMTP_USER');
    if (!process.env.SMTP_PASS) missingVars.push('SMTP_PASS');
    if (!process.env.ADMIN_EMAIL) missingVars.push('ADMIN_EMAIL');
    
    if (missingVars.length > 0) {
        throw new Error(`Email configuration is missing: ${missingVars.join(', ')}`);
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

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
        console.log('SMTP Config:', { host: process.env.SMTP_HOST, port: process.env.SMTP_PORT, secure: process.env.SMTP_SECURE, user: process.env.SMTP_USER });
        return info;
    } catch (error) {
        console.error('Error in sendMail:', error);
        console.error('SMTP Config Used:', {
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_SECURE,
            user: process.env.SMTP_USER ? '***' : 'MISSING',
            auth_pass_len: process.env.SMTP_PASS ? process.env.SMTP_PASS.length : 0
        });
        throw error;
    }
};

module.exports = { sendEmail };
