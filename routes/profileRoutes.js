const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, uploadProfileImage, deleteProfileImage } = require('../controllers/profileController');
const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../config/cloudinary');

router.route('/')
    .get(protect, getProfile)
    .put(protect, updateProfile);

router.post('/image', protect, upload.single('image'), uploadProfileImage);
router.delete('/image', protect, deleteProfileImage);

module.exports = router;
