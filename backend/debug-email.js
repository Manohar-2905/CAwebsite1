const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const { verifyConnection, sendEmail } = require('./utils/email');

const debugEmail = async () => {
    console.log('--- EMAIL CONFIGURATION DEBUG ---');
    console.log(`SMTP_HOST: ${process.env.SMTP_HOST}`);
    console.log(`SMTP_PORT: ${process.env.SMTP_PORT}`);
    console.log(`ZOHO_EMAIL: ${process.env.ZOHO_EMAIL}`);
    console.log(`ZOHO_ACCOUNT_ID: ${process.env.ZOHO_ACCOUNT_ID}`);
    console.log(`USING_API: ${!!(process.env.ZOHO_REFRESH_TOKEN && process.env.ZOHO_CLIENT_ID)}`);
    console.log('---------------------------------');

    try {
        console.log('Step 1: Verifying Connection...');
        const result = await verifyConnection();
        
        if (result.success) {
            console.log(`✅ SUCCESS: Connection Verified via ${result.method}!`);
            
            console.log('\nStep 2: Sending Test Email...');
            await sendEmail({
                to: process.env.ADMIN_EMAIL,
                subject: `DEBUG TEST - ${result.method}`,
                text: `This is a debug test email sent via ${result.method}.`,
                html: `<h1>Debug Test</h1><p>Sent via <b>${result.method}</b></p>`
            });
            console.log('✅ SUCCESS: Test Email Sent!');
        } else {
            console.error(`❌ FAILURE: Connection Failed via ${result.method}`);
            console.error(result.error?.message || result.error);
        }
    } catch (error) {
        console.error('❌ UNEXPECTED ERROR during debug:');
        console.error(error);
    }
};

debugEmail();
