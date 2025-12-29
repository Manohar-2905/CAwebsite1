require('dotenv').config();
const nodemailer = require('nodemailer');

const debugEmail = async () => {
    const user = process.env.SMTP_USER || '';
    const pass = process.env.SMTP_PASS || '';
    
    console.log('--- EMAIL CONFIGURATION DEBUG ---');
    console.log(`SMTP_HOST: ${process.env.SMTP_HOST}`);
    console.log(`SMTP_PORT: ${process.env.SMTP_PORT}`);
    console.log(`SMTP_SECURE (env): ${process.env.SMTP_SECURE}`);
    console.log(`SMTP_USER: ${user.substring(0, 3)}*** (${user.length} chars)`);
    console.log(`SMTP_PASS: ${pass.substring(0, 2)}***${pass.substring(pass.length - 2)} (${pass.length} chars)`);
    console.log('---------------------------------');

    if (!user || !pass) {
        console.error('ERROR: SMTP_USER or SMTP_PASS is missing in .env');
        return;
    }

    const port = Number(process.env.SMTP_PORT) || 587;
    const secure = port === 465; 

    console.log(`Creating transporter with port: ${port}, secure: ${secure}`);

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.zoho.com',
        port: port,
        secure: secure,
        auth: {
            user: user,
            pass: pass
        },
        debug: true, // Show SMTP traffic
        logger: true // Log to console
    });

    try {
        console.log('Attempting verify()...');
        await transporter.verify();
        console.log('SUCCESS: SMTP Connection Verified!');
    } catch (error) {
        console.error('FAILURE: SMTP Verification Failed');
        // console.error(error); // Logger already prints details
    }
};

debugEmail();
