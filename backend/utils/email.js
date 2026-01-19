const nodemailer = require('nodemailer');

// Safe transporter creation with defaults
const createTransporter = () => {
    // Default to 587 (STARTTLS) which is more reliable for new deployments
    const port = Number(process.env.SMTP_PORT) || 587;
    
    // Force secure: true ONLY for port 465 (Implicit SSL). 
    // For 587 (STARTTLS), secure MUST be false. 
    // We ignore process.env.SMTP_SECURE because it's often misconfigured as 'true' for 587.
    const secure = port === 465; 

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
        // Increased timeouts to 60s
        connectionTimeout: 60000, 
        greetingTimeout: 60000,
        socketTimeout: 60000,
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

const verifyConnection = async () => {
    const transporter = createTransporter();
    try {
        await transporter.verify();
        console.log('SMTP Connection Verified');
        return { success: true };
    } catch (error) {
        console.error('SMTP Connection Failed:', error);
        return { success: false, error };
    }
};

module.exports = { sendEmail, verifyConnection };
