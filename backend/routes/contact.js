const express = require('express');
const router = express.Router();
const axios = require('axios');
const { sendEmail } = require('../utils/email');

router.post('/send-email', async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;

    await sendEmail({
      replyTo: email,
      subject: `New contact form submission from ${name || 'Visitor'}`,
      text: `Name: ${name}
Email: ${email}
Phone: ${phone}
Service: ${service}

Message:
${message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });

    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Nodemailer error:', error);
    res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
});

// Send WhatsApp message
router.post('/send-whatsapp', async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;

    const whatsappMessage = `New Contact Form Submission:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\nMessage: ${message}`;

    // WhatsApp Cloud API (Meta)
    if (process.env.WHATSAPP_API_URL && process.env.WHATSAPP_API_TOKEN) {
      const whatsappData = {
        messaging_product: 'whatsapp',
        to: process.env.WHATSAPP_PHONE_NUMBER_ID,
        type: 'text',
        text: {
          body: whatsappMessage
        }
      };

      await axios.post(
        `${process.env.WHATSAPP_API_URL}/messages`,
        whatsappData,
        {
          headers: {
            'Authorization': `Bearer ${process.env.WHATSAPP_API_TOKEN}`,
            'Content-Type': 'application/json'
          }
        }
      );
    }

    res.json({ success: true, message: 'WhatsApp message sent successfully' });
  } catch (error) {
    console.error('WhatsApp error:', error);
    // Don't fail the request if WhatsApp fails
    res.json({ success: true, message: 'Contact form submitted (WhatsApp may have failed)' });
  }
});

module.exports = router;
