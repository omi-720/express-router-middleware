const express = require('express');
const path = require('path');
const app = express();
const blogRoutes = require('./routes/blogRoutes');
const imageRoutes = require('./routes/imageRoutes');

// Inbuilt middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Request logger middleware (bonus)
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} - ${duration}ms`);
  });
  next();
});

// Routes
app.use('/blogs', blogRoutes);
app.use('/images', imageRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
