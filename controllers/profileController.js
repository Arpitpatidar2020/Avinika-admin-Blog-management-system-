const Admin = require('../models/Admin');
const { cloudinary } = require('../config/cloudinary');

// @desc    Get admin profile
// @route   GET /api/profile
// @access  Private
const getProfile = async (req, res) => {
    try {
        if (!req.admin) {
            console.error('getProfile Error: req.admin is undefined');
            return res.status(401).json({ message: 'Not authorized' });
        }
        
        const admin = await Admin.findById(req.admin._id);
        if (admin) {
            res.json({
                _id: admin._id,
                name: admin.name,
                email: admin.email,
                profileImage: admin.profileImage,
            });
        } else {
            console.error('getProfile Error: Admin not found for ID:', req.admin._id);
            res.status(404).json({ message: 'Admin not found' });
        }
    } catch (error) {
        console.error('getProfile System Error:', error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update admin profile
// @route   PUT /api/profile
// @access  Private
const updateProfile = async (req, res) => {
    try {
        if (!req.admin) {
            console.error('updateProfile Error: req.admin is undefined');
            return res.status(401).json({ message: 'Not authorized' });
        }

        const admin = await Admin.findById(req.admin._id);

        if (admin) {
            admin.name = req.body.name || admin.name;
            admin.email = req.body.email || admin.email;
            
            if (req.body.profileImage !== undefined) {
                admin.profileImage = req.body.profileImage;
            }

            if (req.body.password) {
                admin.password = req.body.password;
            }

            const updatedAdmin = await admin.save();
            res.json({
                _id: updatedAdmin._id,
                name: updatedAdmin.name,
                email: updatedAdmin.email,
                profileImage: updatedAdmin.profileImage,
            });
        } else {
            console.error('updateProfile Error: Admin not found for ID:', req.admin._id);
            res.status(404).json({ message: 'Admin not found' });
        }
    } catch (error) {
        console.error('updateProfile System Error:', error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Upload profile image
// @route   POST /api/profile/image
// @access  Private
const uploadProfileImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload an image' });
        }
        res.json({ url: req.file.path });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete profile image from Cloudinary
// @route   DELETE /api/profile/image
// @access  Private
const deleteProfileImage = async (req, res) => {
    const { imageUrl } = req.body;
    if (!imageUrl) {
        return res.status(400).json({ message: 'Image URL is required' });
    }

    try {
        // Extract public_id from URL
        // Example URL: https://res.cloudinary.com/demo/image/upload/v12345/folder/image_name.jpg
        const parts = imageUrl.split('/');
        const fileName = parts[parts.length - 1].split('.')[0];
        const folder = parts[parts.length - 2];
        const publicId = `${folder}/${fileName}`;

        await cloudinary.uploader.destroy(publicId);
        res.json({ message: 'Image deleted from cloud' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getProfile, updateProfile, uploadProfileImage, deleteProfileImage };
