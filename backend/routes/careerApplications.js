const express = require('express');
const router = express.Router();
const { sendEmail } = require('../utils/email');
const { uploadMemory } = require('../utils/cloudinary');

// Submit career application
router.post('/', uploadMemory.single('resume'), async (req, res) => {
  try {
    const { careerTitle, name, email, phone, coverLetter, experience } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Resume file is required' });
    }



    // Send email to admin
    const emailResult = await sendEmail({
      replyTo: email,
      subject: `New Career Application: ${careerTitle} - ${name}`,
      text: `New Career Application for ${careerTitle}

Name: ${name}
Email: ${email}
Phone: ${phone}
Experience: ${experience}

Cover Letter:
${coverLetter}`,
      html: `
        <h2>New Application for Career </h2>
        <p><strong>Position:</strong> ${careerTitle}</p>
        <hr />
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Experience:</strong> ${experience}</p>
        
        <h3>Cover Letter</h3>
        <p>${coverLetter.replace(/\n/g, '<br />')}</p>
        
        <h3>Resume</h3>
        <p>The resume is attached to this email.</p>
      `,
      attachments: [
        {
          filename: `Resume-${name.replace(/\s+/g, '-')}.pdf`,
          content: req.file.buffer
        }
      ]
    });


    res.status(200).json({ message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Career application error:', error);
    res.status(500).json({ message: 'Failed to process application', error: error.message });
  }
});

// Get all applications (Admin only - would need auth middleware)
router.get('/', async (req, res) => {
  try {
    const applications = await CareerApplication.find()
      .populate('careerId', 'title')
      .sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

