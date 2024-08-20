const express = require('express');
const Blog = require('../models/blog');
const router = express.Router();

// INDEX - Show all blogs
router.get('/', async (req, res) => {
    const blogs = await Blog.find().sort({ createdAt: 'desc' });
    res.render('index', { blogs });
});

// NEW - Show form to create new blog
router.get('/blogs/new', (req, res) => {
    res.render('new');
});

// CREATE - Add new blog to DB
router.post('/blogs', async (req, res) => {
    const blog = new Blog({
        title: req.body.title,
        content: req.body.content
    });
    try {
        await blog.save();
        res.redirect('/');
    } catch (err) {
        res.render('new');
    }
});

// SHOW - Shows more info about one blog
router.get('/blogs/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    res.render('show', { blog });
});

// EDIT - Show edit form for one blog
router.get('/blogs/:id/edit', async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    res.render('edit', { blog });
});

// UPDATE - Update a particular blog
router.put('/blogs/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    blog.title = req.body.title;
    blog.content = req.body.content;
    try {
        await blog.save();
        res.redirect(`/blogs/${req.params.id}`);
    } catch (err) {
        res.render('edit');
    }
});

// DELETE - Delete a particular blog
router.delete('/blogs/:id', async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

module.exports = router;
