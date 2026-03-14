const mongoose = require('mongoose');

const classDetailSchema = new mongoose.Schema(
  {
    className: {
      type: String,
      required: true,
      enum: [
        'Class 1',
        'Class 2',
        'Class 3',
        'Class 4',
        'Class 5',
        'Class 6',
        'Class 7',
        'Class 8',
        'Class 9',
        'DBHPS Level 1',
        'DBHPS Level 2',
        'Tamil Class 1',
        'Tamil Class 2',
        'Tamil Class 3'
      ]
    },
    subjectType: {
      type: String,
      enum: ['Hindi', 'Tamil'],
      required: true
    },
    level: {
      type: String,
      enum: ['L1', 'L2'],
      required: true
    },
    monthlyFee: {
      type: Number,
      required: true,
      min: 500,
      max: 1000
    },
    description: {
      type: String,
      default: ''
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('ClassDetail', classDetailSchema);
