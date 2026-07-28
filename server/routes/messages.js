const express = require('express');
const { sendMessage, getMessages, markRead, deleteMessage } = require('../controllers/messageController');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.post('/', sendMessage);
router.get('/', protect, adminOnly, getMessages);
router.put('/:id/read', protect, adminOnly, markRead);
router.delete('/:id', protect, adminOnly, deleteMessage);

module.exports = router;
