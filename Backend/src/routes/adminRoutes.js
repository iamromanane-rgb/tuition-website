const express = require('express');
const AdminInfo = require('../models/AdminInfo');
const { verifyAdminToken } = require('../middleware/auth');

const router = express.Router();

// In-memory fallback storage (when MongoDB is not available)
let inMemoryAdminInfo = {
  phoneNumber: '+91-9876543210',
  emailAddress: 'tuition@example.com',
  yearsOfExperience: 15,
  aboutText: 'Experienced Hindi & Tamil tutor',
  qualifications: ['B.Tech', 'Teaching Certification'],
  isPublished: true
};

// GET - Get admin info (public endpoint)
router.get('/info', async (req, res) => {
  try {
    const adminInfo = await AdminInfo.findOne({ isPublished: true });

    if (!adminInfo) {
      // Return in-memory fallback if database fails
      return res.json(inMemoryAdminInfo);
    }

    res.json(adminInfo);
  } catch (error) {
    console.error('Database error:', error.message);
    // Fallback to in-memory data if MongoDB fails
    res.json(inMemoryAdminInfo);
  }
});

// PUT - Update admin info (admin only)
router.put('/info/update', verifyAdminToken, async (req, res) => {
  try {
    const { phoneNumber, emailAddress, yearsOfExperience, aboutText, qualifications } = req.body;

    if (!phoneNumber || !emailAddress) {
      return res.status(400).json({ message: 'Phone number and email are required' });
    }

    let adminInfo = await AdminInfo.findOne();

    if (!adminInfo) {
      adminInfo = new AdminInfo({
        phoneNumber,
        emailAddress,
        yearsOfExperience,
        aboutText,
        qualifications,
        isPublished: true
      });
    } else {
      adminInfo.phoneNumber = phoneNumber;
      adminInfo.emailAddress = emailAddress;
      adminInfo.yearsOfExperience = yearsOfExperience || adminInfo.yearsOfExperience;
      adminInfo.aboutText = aboutText || adminInfo.aboutText;
      adminInfo.qualifications = qualifications || adminInfo.qualifications;
    }

    const updatedInfo = await adminInfo.save();
    
    // Also update in-memory version
    inMemoryAdminInfo = {
      ...inMemoryAdminInfo,
      phoneNumber,
      emailAddress,
      yearsOfExperience,
      aboutText,
      qualifications
    };

    res.json({ message: 'Admin info updated successfully', adminInfo: updatedInfo });
  } catch (error) {
    console.error('Error updating admin info:', error.message);
    
    // Fallback: save to in-memory storage and return success
    inMemoryAdminInfo = {
      phoneNumber: req.body.phoneNumber,
      emailAddress: req.body.emailAddress,
      yearsOfExperience: req.body.yearsOfExperience || inMemoryAdminInfo.yearsOfExperience,
      aboutText: req.body.aboutText || inMemoryAdminInfo.aboutText,
      qualifications: req.body.qualifications || inMemoryAdminInfo.qualifications,
      isPublished: true
    };
    
    res.json({ 
      message: 'Admin info updated successfully (stored in memory)', 
      adminInfo: inMemoryAdminInfo 
    });
  }
});

module.exports = router;
