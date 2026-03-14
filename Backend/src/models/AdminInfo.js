const mongoose = require('mongoose');

const adminInfoSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    emailAddress: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    yearsOfExperience: {
      type: Number,
      default: 15
    },
    aboutText: {
      type: String,
      default: 'Experienced Hindi and Tamil tuition instructor with 15+ years of teaching experience.'
    },
    qualifications: [
      {
        type: String
      }
    ],
    isPublished: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('AdminInfo', adminInfoSchema);
