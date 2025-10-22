const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../db.json');

function readDB() {
  const data = fs.readFileSync(dbPath, 'utf-8');
  return JSON.parse(data);
}

function writeDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

function getAllBlogs() {
  const db = readDB();
  return db.blogs;
}

function getBlogById(id) {
  const db = readDB();
  return db.blogs.find(blog => blog.id === id);
}

function createBlog(blog) {
  const db = readDB();
  const newId = db.blogs.length ? db.blogs[db.blogs.length - 1].id + 1 : 1;
  const newBlog = { id: newId, ...blog };
  db.blogs.push(newBlog);
  writeDB(db);
  return newBlog;
}

function updateBlog(id, updatedData) {
  const db = readDB();
  const index = db.blogs.findIndex(blog => blog.id === id);
  if (index === -1) return null;
  db.blogs[index] = { ...db.blogs[index], ...updatedData };
  writeDB(db);
  return db.blogs[index];
}

function deleteBlog(id) {
  const db = readDB();
  const index = db.blogs.findIndex(blog => blog.id === id);
  if (index === -1) return false;
  db.blogs.splice(index, 1);
  writeDB(db);
  return true;
}

module.exports = {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog
};
