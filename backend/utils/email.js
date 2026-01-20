const nodemailer = require('nodemailer');
const axios = require('axios');

/**
 * Get Zoho Access Token using Refresh Token
 */
const getZohoAccessToken = async () => {
    try {
        const response = await axios.post('https://accounts.zoho.in/oauth/v2/token', null, {
            params: {
                refresh_token: process.env.ZOHO_REFRESH_TOKEN,
                client_id: process.env.ZOHO_CLIENT_ID,
                client_secret: process.env.ZOHO_CLIENT_SECRET,
                grant_type: 'refresh_token'
            }
        });
        return response.data.access_token;
    } catch (error) {
        console.error('❌ Zoho OAuth Error:', error.response?.data || error.message);
        throw new Error('Failed to refresh Zoho access token');
    }
};

/**
 * Send Email via Zoho REST API
 */
const sendEmailZoho = async ({ to, subject, text, html, replyTo }) => {
    const accessToken = await getZohoAccessToken();
    const accountId = process.env.ZOHO_ACCOUNT_ID;
    const fromAddress = process.env.ZOHO_EMAIL;

    const url = `https://mail.zoho.in/api/accounts/${accountId}/messages`;

    // Zoho API requires a specific structure
    const emailData = {
        fromAddress,
        toAddress: to || process.env.ADMIN_EMAIL,
        subject,
        content: html || text,
        mailFormat: html ? 'html' : 'text'
    };

    // Add replyTo if provided
    if (replyTo) {
        // Zoho API doesn't have a direct 'replyTo' in simple message create
        // but we can append it to the body or use advanced params if needed.
        // For now, we'll prefix the content.
        emailData.content = `(Reply-To: ${replyTo})\n\n${emailData.content}`;
    }

    try {
        const response = await axios.post(url, emailData, {
            headers: {
                'Authorization': `Zoho-oauthtoken ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        console.log('✅ Email sent via Zoho API:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Zoho API Send Error:', error.response?.data || error.message);
        throw error;
    }
};

/**
 * SMTP Transporter (Fallback for local)
 */
const createTransporter = () => {
    const port = Number(process.env.SMTP_PORT) || 587;
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.zoho.com',
        port: port,
        secure: port === 465,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });
};

/**
 * Main sendEmail function with Fallback
 */
const sendEmail = async (params) => {
    // If Zoho API credentials exist, use the API (Best for Render)
    if (process.env.ZOHO_REFRESH_TOKEN && process.env.ZOHO_CLIENT_ID) {
        console.log('Using Zoho REST API for email delivery...');
        return await sendEmailZoho(params);
    }

    // Otherwise, fallback to SMTP (Best for local/legacy)
    console.log('Using SMTP for email delivery...');
    const transporter = createTransporter();
    const mailOptions = {
        from: `"Website Mailer" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
        to: params.to || process.env.ADMIN_EMAIL,
        replyTo: params.replyTo,
        subject: params.subject,
        text: params.text,
        html: params.html,
        attachments: params.attachments
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Email sent via SMTP:', info.messageId);
        return info;
    } catch (error) {
        console.error('❌ SMTP Email send failed:', error.message);
        throw error;
    }
};

/**
 * Simple connection verification (checks SMTP or API availability)
 */
const verifyConnection = async () => {
    if (process.env.ZOHO_REFRESH_TOKEN && process.env.ZOHO_CLIENT_ID) {
        try {
            await getZohoAccessToken();
            console.log('✅ Zoho API Connection Verified');
            return { success: true, method: 'API' };
        } catch (error) {
            return { success: false, error, method: 'API' };
        }
    } else {
        const transporter = createTransporter();
        try {
            await transporter.verify();
            console.log('✅ SMTP Connection Verified');
            return { success: true, method: 'SMTP' };
        } catch (error) {
            return { success: false, error, method: 'SMTP' };
        }
    }
};

module.exports = { sendEmail, verifyConnection };
