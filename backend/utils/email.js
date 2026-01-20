const axios = require('axios');

/**
 * Get Zoho Access Token using Refresh Token
 * Uses the Zoho India (zoho.in) region by default
 */
const getZohoAccessToken = async () => {
    const clientId = process.env.ZOHO_CLIENT_ID;
    const clientSecret = process.env.ZOHO_CLIENT_SECRET;
    const refreshToken = process.env.ZOHO_REFRESH_TOKEN;

    if (!clientId || !clientSecret || !refreshToken) {
        throw new Error('Missing Zoho API credentials (Client ID, Secret, or Refresh Token)');
    }

    try {
        const response = await axios.post('https://accounts.zoho.com/oauth/v2/token', null, {
            params: {
                refresh_token: refreshToken,
                client_id: clientId,
                client_secret: clientSecret,
                grant_type: 'refresh_token'
            }
        });
        
        // Handle cases where Zoho returns 200 OK but with an error JSON
        if (response.data.error) {
            console.error('❌ Zoho API returned error in JSON:', response.data);
            throw new Error(`Zoho API Error: ${response.data.error}`);
        }

        if (!response.data.access_token) {
            console.error('❌ Zoho API response missing access_token:', response.data);
            throw new Error('Access token not found in Zoho response');
        }
        
        return response.data.access_token;
    } catch (error) {
        // Log the actual response data if available
        const errorData = error.response?.data || error.message;
        console.error('❌ Zoho OAuth Token Refresh Failed:', errorData);
        
        // Propagate a clean error message
        const message = error.response?.data?.error || error.message;
        throw new Error(`Zoho Auth Error: ${message}`);
    }
};

/**
 * Send Email via Zoho Mail REST API
 * This is the preferred method for Render.com as it bypasses SMTP port blocks.
 */
const sendEmail = async ({ to, subject, text, html, replyTo, attachments }) => {
    console.log(`Attempting to send email to ${to || process.env.ADMIN_EMAIL} via Zoho REST API...`);

    try {
        const accessToken = await getZohoAccessToken();
        const accountId = process.env.ZOHO_ACCOUNT_ID;
        const fromAddress = process.env.ZOHO_EMAIL;

        if (!accountId || !fromAddress) {
            throw new Error('Missing ZOHO_ACCOUNT_ID or ZOHO_EMAIL in environment variables');
        }

        const url = `https://mail.zoho.com/api/accounts/${accountId}/messages`;

        // Format content
        let content = html || text;
        if (replyTo) {
            content = `<p><i>[Reply-to: ${replyTo}]</i></p>${content}`;
        }

        const emailData = {
            fromAddress,
            toAddress: to || process.env.ADMIN_EMAIL,
            subject,
            content: content,
            mailFormat: html ? 'html' : 'text'
        };

        // Note: Zoho API attachment handling requires a multi-step process (upload first).
        // For simplicity in the contact form, we'll log a warning if attachments are present.
        if (attachments && attachments.length > 0) {
            console.warn('⚠️ Zoho REST API implementation currently does not support direct attachments. Attachments were skipped.');
        }

        const response = await axios.post(url, emailData, {
            headers: {
                'Authorization': `Zoho-oauthtoken ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        console.log('✅ Email sent successfully via Zoho API console!');
        return response.data;

    } catch (error) {
        console.error('❌ Zoho API Error:', error.response?.data || error.message);
        
        // If it's a configuration issue, we want to know
        if (error.message.includes('Missing')) {
            throw error;
        }

        throw new Error(`Failed to send email via Zoho API: ${error.response?.data?.summary || error.message}`);
    }
};

/**
 * Verify Zoho API Connection
 */
const verifyConnection = async () => {
    console.log('Verifying Zoho API connection...');
    try {
        await getZohoAccessToken();
        console.log('✅ Zoho API connection verified successfully!');
        return { success: true, method: 'ZOHO_API' };
    } catch (error) {
        console.error('❌ Zoho API verification failed.');
        return { success: false, error: error.message, method: 'ZOHO_API' };
    }
};

module.exports = { sendEmail, verifyConnection };
