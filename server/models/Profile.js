const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema({
  school: { type: String, required: true },
  level: { type: String, required: true },
  startYear: { type: String },
  endYear: { type: String },
  image: { type: String },
  description: { type: String }
});

const ProfileSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  location: { type: String, default: '' },
  profileImage: { type: String, default: '' },
  aboutImage: { type: String, default: '' },
  resumeUrl: { type: String, default: '' },
  socialLinks: {
    instagram: { type: String, default: '' },
    facebook: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    x: { type: String, default: '' },
    whatsapp: { type: String, default: '' },
    telegram: { type: String, default: '' }
  },
  education: [EducationSchema],
  stats: {
    projectsCount: { type: Number, default: 0 },
    technologiesCount: { type: Number, default: 0 },
    experience: { type: String, default: '' },
    gpa: { type: String, default: '' }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

ProfileSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

ProfileSchema.pre('findOneAndUpdate', function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

module.exports = mongoose.model('Profile', ProfileSchema);
