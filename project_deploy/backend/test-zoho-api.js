const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const { sendEmail, verifyConnection } = require('./utils/email');

const test = async () => {
    console.log('--- ZOHO API TEST ---');
    console.log('CLNT_ID:', process.env.ZOHO_CLIENT_ID ? 'Loaded' : 'MISSING');
    console.log('ACCT_ID:', process.env.ZOHO_ACCOUNT_ID ? 'Loaded' : 'MISSING');
    console.log('EMAIL:', process.env.ZOHO_EMAIL);
    console.log('---------------------');

    try {
        console.log('Step 1: Verifying Connection...');
        const verify = await verifyConnection();
        if (verify.success) {
            console.log(`✅ Connection OK via ${verify.method}`);
        } else {
            console.error('❌ Connection Failed:', verify.error.message);
            return;
        }

        console.log('\nStep 2: Sending Test Email...');
        await sendEmail({
            to: process.env.ADMIN_EMAIL,
            subject: 'ZOHO API TEST - SUCCESS',
            text: 'This is a test email sent via the Zoho REST API from the CA project.',
            html: '<h1>ZOHO API TEST</h1><p>This is a test email sent via the <b>Zoho REST API</b> from the CA project.</p>'
        });
        console.log('✅ Test Email Sent Successfully!');

    } catch (error) {
        console.error('❌ TEST FAILED');
        console.error(error);
    }
};

test();
