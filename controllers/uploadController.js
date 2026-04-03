const { deleteFromCloudinary } = require('../config/cloudinary');

const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        // req.file.path is the Cloudinary URL when using multer-storage-cloudinary
        res.status(200).json({ url: req.file.path });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteImage = async (req, res) => {
    try {
        const { imageUrl } = req.body;
        if (!imageUrl) {
            return res.status(400).json({ message: 'Image URL is required' });
        }
        await deleteFromCloudinary(imageUrl);
        res.status(200).json({ message: 'Image deleted from cloud' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { uploadImage, deleteImage };
