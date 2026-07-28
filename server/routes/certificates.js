const express = require('express');
const { getCertificates, createCertificate, deleteCertificate } = require('../controllers/certificateController');
const { protect, adminOnly } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/', getCertificates);
router.post('/', protect, adminOnly, upload.single('image'), createCertificate);
router.delete('/:id', protect, adminOnly, deleteCertificate);

module.exports = router;
