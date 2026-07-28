const express = require('express');
const { getProjects, getFeaturedProjects, getProject, createProject, updateProject, deleteProject } = require('../controllers/projectController');
const { protect, adminOnly } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/featured', getFeaturedProjects);
router.get('/', getProjects);
router.get('/:id', getProject);
router.post('/', protect, adminOnly, upload.single('image'), createProject);
router.put('/:id', protect, adminOnly, upload.single('image'), updateProject);
router.delete('/:id', protect, adminOnly, deleteProject);

module.exports = router;
