const express = require('express');
const { getProfile, updateProfile, updateSocialLinks } = require('../controllers/profileController');
const { protect, adminOnly } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/', getProfile);
router.put('/', protect, adminOnly, upload.single('profileImage'), updateProfile);
router.put('/social-links', protect, adminOnly, updateSocialLinks);

module.exports = router;
