const express = require('express');
const ContactSubmission = require('../models/ContactSubmission');
const { verifyAdminToken } = require('../middleware/auth');

const router = express.Router();

// In-memory fallback storage
let inMemorySubmissions = [];

// POST - Submit contact form (public endpoint)
router.post('/submit', async (req, res) => {
  try {
    const { name, email, phoneNumber, interestedClasses, message } = req.body;

    if (!name || !email || !phoneNumber || !interestedClasses || interestedClasses.length === 0) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const submission = new ContactSubmission({
      name,
      email,
      phoneNumber,
      interestedClasses,
      message
    });

    const savedSubmission = await submission.save();
    // Also store in memory
    inMemorySubmissions.unshift({
      ...savedSubmission.toObject(),
      timestamp: new Date()
    });
    
    res.status(201).json({ message: 'Contact submission received successfully', submission: savedSubmission });
  } catch (error) {
    console.error('Contact submit error:', error.message);
    // Fallback: save to in-memory storage
    const memSubmission = {
      _id: Date.now(),
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      interestedClasses: req.body.interestedClasses,
      message: req.body.message || '',
      isRead: false,
      timestamp: new Date()
    };
    inMemorySubmissions.unshift(memSubmission);
    
    res.status(201).json({ 
      message: 'Contact submission received successfully (stored in memory)', 
      submission: memSubmission 
    });
  }
});

// GET - Get all submissions (admin only)
router.get('/submissions', verifyAdminToken, async (req, res) => {
  try {
    const submissions = await ContactSubmission.find().sort({ createdAt: -1 });
    res.json(submissions);
  } catch (error) {
    console.error('Get submissions error:', error.message);
    // Return in-memory submissions
    res.json(inMemorySubmissions);
  }
});

// PUT - Mark submission as read (admin only)
router.put('/submissions/:id/read', verifyAdminToken, async (req, res) => {
  try {
    const { id } = req.params;

    const submission = await ContactSubmission.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    );

    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    res.json({ message: 'Submission marked as read', submission });
  } catch (error) {
    console.error('Mark read error:', error.message);
    // Fallback: update in-memory
    const memSubmission = inMemorySubmissions.find(s => s._id == id);
    if (memSubmission) {
      memSubmission.isRead = true;
    }
    res.json({ message: 'Submission marked as read', submission: memSubmission });
  }
});

// DELETE - Delete a submission (admin only)
router.delete('/submissions/:id', verifyAdminToken, async (req, res) => {
  try {
    const { id } = req.params;

    const submission = await ContactSubmission.findByIdAndDelete(id);

    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    res.json({ message: 'Submission deleted successfully', submission });
  } catch (error) {
    console.error('Delete submission error:', error.message);
    // Fallback: delete from in-memory
    const index = inMemorySubmissions.findIndex(s => s._id == id);
    let submission = null;
    if (index > -1) {
      submission = inMemorySubmissions.splice(index, 1)[0];
    }
    res.json({ message: 'Submission deleted successfully', submission });
  }
});

module.exports = router;
