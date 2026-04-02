const express = require('express');
const router = express.Router();
const {
    createBlog,
    getBlogs,
    getPublishedBlogs,
    getBlogBySlug,
    getBlogById,
    updateBlog,
    deleteBlog
} = require('../controllers/blogController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.get('/published', getPublishedBlogs);
router.get('/slug/:slug', getBlogBySlug);

// Private routes (Admin)
router.post('/', protect, createBlog);
router.get('/', protect, getBlogs);
router.get('/:id', protect, getBlogById);
router.put('/:id', protect, updateBlog);
router.delete('/:id', protect, deleteBlog);

module.exports = router;
