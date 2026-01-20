const nodemailer = require('nodemailer');

// Transporter for Zoho SMTP (587 - STARTTLS)
const createTransporter = () => {
    const port = Number(process.env.SMTP_PORT) || 587;

    console.log(
        `Initializing SMTP Transporter: ${process.env.SMTP_HOST}:${port} (Secure: false)`
    );

    return nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.zoho.com',
        port: port,
        secure: false, // STARTTLS requires secure: false
        requireTLS: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        },
        connectionTimeout: 60000,
        greetingTimeout: 60000,
        socketTimeout: 60000,
        logger: true,
        debug: true
    });

};

const sendEmail = async ({ to, subject, text, html, replyTo, attachments }) => {
    const missingVars = [];
    if (!process.env.SMTP_HOST) missingVars.push('SMTP_HOST');
    if (!process.env.SMTP_USER) missingVars.push('SMTP_USER');
    if (!process.env.SMTP_PASS) missingVars.push('SMTP_PASS');
    if (!process.env.ADMIN_EMAIL) missingVars.push('ADMIN_EMAIL');

    if (missingVars.length > 0) {
        throw new Error(`Email configuration missing: ${missingVars.join(', ')}`);
    }

    const transporter = createTransporter();

    const mailOptions = {
        from: `"Website Mailer" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
        to: to || process.env.ADMIN_EMAIL,
        replyTo,
        subject,
        text,
        html,
        attachments
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Email sent:', info.messageId);
        return info;
    } catch (error) {
        console.error('❌ Email send failed:', error.message);
        throw error;
    }
};

const verifyConnection = async () => {
    const transporter = createTransporter();
    try {
        await transporter.verify();
        console.log('✅ SMTP Connection Verified');
        return { success: true };
    } catch (error) {
        console.error('❌ SMTP Verification Failed:', error.message);
        return { success: false, error };
    }
};

module.exports = { sendEmail, verifyConnection };
