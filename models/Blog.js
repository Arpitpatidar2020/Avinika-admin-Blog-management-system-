const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    tags: [{
        type: String
    }],
    featuredImage: {
        type: String,
        required: true
    },
    detailImage: {
        type: String,
        required: false
    },
    author: {
        type: String,
        default: 'Avinika Solution'
    },
    status: {
        type: String,
        enum: ['Draft', 'Published'],
        default: 'Draft'
    }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
