const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Skill name is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['frontend', 'backend', 'database', 'programming', 'tools', 'ai']
  },
  level: {
    type: Number,
    required: [true, 'Skill level is required'],
    min: 1,
    max: 100
  },
  icon: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Skill', SkillSchema);
