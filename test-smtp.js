const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

console.log('Testing SMTP with:');
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '********' : 'EMPTY');

const testSMTP = async () => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        console.log('Verifying connection...');
        await transporter.verify();
        console.log('SUCCESS: SMTP connection is valid!');
        
        console.log('Sending test email...');
        const info = await transporter.sendMail({
            from: `"SMTP Test" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER, // Send to self
            subject: 'SMTP Connection Test',
            text: 'If you see this, your Gmail SMTP settings are correct!',
        });
        console.log('SUCCESS: Test email sent!', info.messageId);
    } catch (error) {
        console.error('FAILED: SMTP Connection Error:');
        console.error(error.message);
        if (error.message.includes('Invalid login')) {
            console.error('TIP: Check if your App Password is typed correctly (no spaces) and matches your Gmail address.');
        } else if (error.message.includes('ETIMEDOUT')) {
            console.error('TIP: Network timeout. Check your internet or firewall rules for Port 465.');
        }
    }
};

testSMTP();
