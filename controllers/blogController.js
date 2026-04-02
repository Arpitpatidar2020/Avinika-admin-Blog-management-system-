const Blog = require('../models/Blog');
const { cloudinary } = require('../config/cloudinary');

// @desc    Create a new blog
// @route   POST /api/blogs
// @access  Private (Admin)
const createBlog = async (req, res) => {
    try {
        console.log('Received Blog Data:', req.body); // Debug Log
        const { title, slug, description, content, category, tags, featuredImage, detailImage } = req.body;

        const blogExists = await Blog.findOne({ slug });
        if (blogExists) {
            return res.status(400).json({ message: 'Blog with this slug already exists' });
        }

        const blog = await Blog.create({
            title,
            slug,
            description,
            content,
            category,
            tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
            featuredImage,
            detailImage: detailImage || '', // Only save if provided
            author: req.admin ? req.admin.name : 'Unknown Author' // Safely handle admin
        });

        res.status(201).json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all blogs (Admin view)
// @route   GET /api/blogs
// @access  Private (Admin)
const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({}).sort({ createdAt: -1 });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get published blogs (Public view)
// @route   GET /api/blogs/published
// @access  Public
const getPublishedBlogs = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 0;
        const blogs = await Blog.find({ status: 'Published' })
            .sort({ createdAt: -1 })
            .limit(limit);
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single blog by slug
// @route   GET /api/blogs/:slug
// @access  Public
const getBlogBySlug = async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug });
        if (blog) {
            res.json(blog);
        } else {
            res.status(404).json({ message: 'Blog not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a blog
// @route   PUT /api/blogs/:id
// @access  Private (Admin)
const updateBlog = async (req, res) => {
    try {
        console.log('Update Received Data:', req.body); // Debug Log
        const blog = await Blog.findById(req.params.id);

        if (blog) {
            blog.title = req.body.title || blog.title;
            blog.slug = req.body.slug || blog.slug;
            blog.description = req.body.description || blog.description;
            blog.content = req.body.content || blog.content;
            blog.category = req.body.category || blog.category;
            blog.status = req.body.status || blog.status;
            
            if (req.body.featuredImage !== undefined) {
                blog.featuredImage = req.body.featuredImage;
            }

            if (req.body.detailImage !== undefined) {
                blog.detailImage = req.body.detailImage;
            }
            
            if (req.body.tags) {
                blog.tags = req.body.tags.split(',').map(tag => tag.trim());
            }

            const updatedBlog = await blog.save();
            res.json(updatedBlog);
        } else {
            res.status(404).json({ message: 'Blog not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single blog by ID (Admin)
// @route   GET /api/blogs/:id
// @access  Private (Admin)
const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (blog) {
            res.json(blog);
        } else {
            res.status(404).json({ message: 'Blog not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
// @access  Private (Admin)
const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (blog) {
            // Delete image from Cloudinary if exists
            // Helper to delete image from Cloudinary
            const deleteCloudinaryImage = async (url) => {
                if (url && url.includes('cloudinary.com')) {
                    try {
                        const parts = url.split('/');
                        const fileName = parts[parts.length - 1].split('.')[0];
                        const folder = parts[parts.length - 2];
                        const publicId = `${folder}/${fileName}`;
                        await cloudinary.uploader.destroy(publicId);
                    } catch (cloudinaryError) {
                        console.error('Cloudinary Removal Error:', cloudinaryError);
                    }
                }
            };

            await deleteCloudinaryImage(blog.featuredImage);
            await deleteCloudinaryImage(blog.detailImage);

            await blog.deleteOne();
            res.json({ message: 'Blog removed and image cleaned from cloud' });
        } else {
            res.status(404).json({ message: 'Blog not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createBlog,
    getBlogs,
    getPublishedBlogs,
    getBlogBySlug,
    getBlogById,
    updateBlog,
    deleteBlog
};
