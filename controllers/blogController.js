const path = require('path');
const fs = require('fs');
const Blog = require('../models/blogModel');

const createBlog = (req, res) => {
  const { title, content } = req.body;
  const image = req.file ? req.file.path : null;
  const newBlog = Blog.createBlog({ title, content, image });
  res.status(201).json(newBlog);
};

const getAllBlogs = (req, res) => {
  const blogs = Blog.getAllBlogs();
  res.json(blogs);
};

const getBlogById = (req, res) => {
  const blog = Blog.getBlogById(Number(req.params.id));
  if (!blog) return res.status(404).json({ message: "Blog not found" });
  res.json(blog);
};

const updateBlog = (req, res) => {
  const updatedData = { ...req.body };
  if (req.file) updatedData.image = req.file.path;
  const updatedBlog = Blog.updateBlog(Number(req.params.id), updatedData);
  if (!updatedBlog) return res.status(404).json({ message: "Blog not found" });
  res.json(updatedBlog);
};

const deleteBlog = (req, res) => {
  const success = Blog.deleteBlog(Number(req.params.id));
  if (!success) return res.status(404).json({ message: "Blog not found" });
  res.json({ message: "Blog deleted successfully" });
};

const serveImage = (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(__dirname, '../uploads', filename);
  if (fs.existsSync(filepath)) {
    res.sendFile(filepath);
  } else {
    res.status(404).json({ message: "Image not found" });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  serveImage
};
