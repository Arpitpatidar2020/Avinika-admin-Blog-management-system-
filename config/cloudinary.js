const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'avinika_blog',
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    },
});

const upload = multer({ storage: storage });

/**
 * Robustly delete an image from Cloudinary given its URL.
 * Extracts the public_id correctly by handling versions and folders.
 */
const deleteFromCloudinary = async (url) => {
    if (!url || typeof url !== 'string' || !url.includes('cloudinary.com')) return;
    
    try {
        // Extract parts after the 'upload' segment
        const parts = url.split('/');
        const uploadIndex = parts.indexOf('upload');
        if (uploadIndex === -1) return;

        // Skip 'upload' and the optional 'v12345678' version segment
        let publicIdParts = parts.slice(uploadIndex + 1);
        if (publicIdParts[0].startsWith('v') && /^\d+$/.test(publicIdParts[0].substring(1))) {
            publicIdParts = publicIdParts.slice(1);
        }

        // Join remaining parts and remove the file extension
        const fullPath = publicIdParts.join('/');
        const publicId = fullPath.substring(0, fullPath.lastIndexOf('.'));

        if (publicId) {
            const result = await cloudinary.uploader.destroy(publicId);
            console.log(`Cloudinary Delete [${publicId}]:`, result.result);
            return result;
        }
    } catch (error) {
        console.error('Cloudinary Deletion Error:', error);
        throw error;
    }
};

module.exports = { cloudinary, upload, deleteFromCloudinary };
