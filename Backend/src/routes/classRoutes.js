const express = require('express');
const ClassDetail = require('../models/ClassDetail');
const { verifyAdminToken, verifyUserRole } = require('../middleware/auth');

const router = express.Router();

// In-memory fallback storage for classes
let inMemoryClasses = [
  {
    _id: '1',
    className: 'Class 1 - Hindi',
    subjectType: 'Hindi',
    level: 'L1',
    monthlyFee: 500,
    description: 'Learn Hindi basics for Class 1 students',
    isActive: true
  },
  {
    _id: '2',
    className: 'Class 5 - Hindi',
    subjectType: 'Hindi',
    level: 'L2',
    monthlyFee: 800,
    description: 'Advanced Hindi for Class 5 students',
    isActive: true
  },
  {
    _id: '3',
    className: 'DBHPS Exam - L1',
    subjectType: 'Hindi',
    level: 'L1',
    monthlyFee: 1000,
    description: 'DBHPS exam preparation Level 1',
    isActive: true
  },
  {
    _id: '4',
    className: 'Tamil - Beginner',
    subjectType: 'Tamil',
    level: 'L1',
    monthlyFee: 600,
    description: 'Learn Tamil language from scratch',
    isActive: true
  }
];

// GET all active classes (public endpoint)
router.get('/all', async (req, res) => {
  try {
    const classes = await ClassDetail.find({ isActive: true }).sort({ className: 1 });
    res.json(classes);
  } catch (error) {
    console.error('Get classes error:', error.message);
    // Return in-memory classes
    res.json(inMemoryClasses);
  }
});

// POST - Create a new class (admin only)
router.post('/create', verifyAdminToken, async (req, res) => {
  try {
    const { className, subjectType, level, monthlyFee, description } = req.body;

    if (!className || !subjectType || !level || !monthlyFee) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newClass = new ClassDetail({
      className,
      subjectType,
      level,
      monthlyFee,
      description
    });

    const savedClass = await newClass.save();
    // Also add to in-memory
    inMemoryClasses.push(savedClass.toObject());
    
    res.status(201).json({ message: 'Class created successfully', class: savedClass });
  } catch (error) {
    console.error('Create class error:', error.message);
    // Fallback: save to in-memory
    const memClass = {
      _id: Date.now().toString(),
      className: req.body.className,
      subjectType: req.body.subjectType,
      level: req.body.level,
      monthlyFee: req.body.monthlyFee,
      description: req.body.description || '',
      isActive: true
    };
    inMemoryClasses.push(memClass);
    
    res.status(201).json({ 
      message: 'Class created successfully (stored in memory)', 
      class: memClass 
    });
  }
});

// PUT - Update a class (admin only)
router.put('/update/:id', verifyAdminToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { className, subjectType, level, monthlyFee, description, isActive } = req.body;

    const updatedClass = await ClassDetail.findByIdAndUpdate(
      id,
      { className, subjectType, level, monthlyFee, description, isActive },
      { new: true, runValidators: true }
    );

    if (!updatedClass) {
      return res.status(404).json({ message: 'Class not found' });
    }

    // Update in-memory
    const memIndex = inMemoryClasses.findIndex(c => c._id == id);
    if (memIndex > -1) {
      inMemoryClasses[memIndex] = { ...inMemoryClasses[memIndex], className, subjectType, level, monthlyFee, description, isActive };
    }

    res.json({ message: 'Class updated successfully', class: updatedClass });
  } catch (error) {
    console.error('Update class error:', error.message);
    // Fallback: update in-memory
    const memIndex = inMemoryClasses.findIndex(c => c._id == id);
    if (memIndex > -1) {
      inMemoryClasses[memIndex] = { ...inMemoryClasses[memIndex], ...req.body };
    }
    res.json({ message: 'Class updated successfully', class: inMemoryClasses[memIndex] });
  }
});

// DELETE - Delete a class (admin only)
router.delete('/delete/:id', verifyAdminToken, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedClass = await ClassDetail.findByIdAndDelete(id);

    if (!deletedClass) {
      return res.status(404).json({ message: 'Class not found' });
    }

    // Delete from in-memory
    const memIndex = inMemoryClasses.findIndex(c => c._id == id);
    if (memIndex > -1) {
      inMemoryClasses.splice(memIndex, 1);
    }

    res.json({ message: 'Class deleted successfully', class: deletedClass });
  } catch (error) {
    console.error('Delete class error:', error.message);
    // Fallback: delete from in-memory
    const memIndex = inMemoryClasses.findIndex(c => c._id == id);
    let deletedClass = null;
    if (memIndex > -1) {
      deletedClass = inMemoryClasses.splice(memIndex, 1)[0];
    }
    res.json({ message: 'Class deleted successfully', class: deletedClass });
  }
});

module.exports = router;
