const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const nodemailer = require('nodemailer');

const debugEmail = async () => {
    const user = process.env.SMTP_USER || '';
    const pass = process.env.SMTP_PASS || '';

    console.log('--- EMAIL CONFIGURATION DEBUG ---');
    console.log(`SMTP_HOST: ${process.env.SMTP_HOST}`);
    console.log(`SMTP_PORT: ${process.env.SMTP_PORT}`);
    console.log(`SMTP_USER: ${user.substring(0, 3)}*** (${user.length} chars)`);
    console.log(`SMTP_PASS: ${pass.substring(0, 2)}***${pass.substring(pass.length - 2)} (${pass.length} chars)`);
    console.log('---------------------------------');

    if (!user || !pass) {
        console.error('❌ SMTP_USER or SMTP_PASS is missing');
        return;
    }

    console.log('Creating transporter for STARTTLS (587)...');

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.zoho.in',
        port: 587,
        secure: false, // REQUIRED for 587
        auth: {
            user: user,
            pass: pass
        },
        connectionTimeout: 60000,
        greetingTimeout: 60000,
        socketTimeout: 60000,
        logger: true,
        debug: true
    });

    try {
        console.log('Attempting verify()...');
        await transporter.verify();
        console.log('✅ SUCCESS: SMTP Connection Verified!');
    } catch (error) {
        console.error('❌ FAILURE: SMTP Verification Failed');
        console.error(error.message); // show exact cause
    }
};

debugEmail();
