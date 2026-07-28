const Profile = require('../models/Profile');

exports.getProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();

    if (!profile) {
      profile = await Profile.create({
        name: '',
        title: '',
        description: '',
        email: '',
        phone: '',
        location: ''
      });
    }

    res.status(200).json({ success: true, profile });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = new Profile({});
    }

    const allowedFields = ['name', 'title', 'description', 'email', 'phone', 'location', 'resumeUrl', 'education', 'stats', 'aboutImage'];
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        profile[field] = req.body[field];
      }
    });

    if (req.file) {
      profile.profileImage = `/uploads/${req.file.filename}`;
    }

    await profile.save();

    res.status(200).json({ success: true, profile });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

exports.updateSocialLinks = async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = new Profile({});
    }

    const { instagram, facebook, linkedin, x } = req.body;
    if (instagram !== undefined) profile.socialLinks.instagram = instagram;
    if (facebook !== undefined) profile.socialLinks.facebook = facebook;
    if (linkedin !== undefined) profile.socialLinks.linkedin = linkedin;
    if (x !== undefined) profile.socialLinks.x = x;

    await profile.save();

    res.status(200).json({ success: true, profile });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
