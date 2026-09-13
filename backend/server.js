const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

try {
  require('dotenv').config({ path: path.join(__dirname, '.env') });
} catch (e) {
  console.log('.env not found or dotenv not installed, using defaults');
}

const Admin = require('./models/Admin');
const app = express();

const uploadDir = path.join(__dirname, 'uploads', 'cvs');
fs.mkdirSync(uploadDir, { recursive: true });

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/applications', require('./routes/applications'));
app.use('/api/admin', require('./routes/admin'));

// MongoDB Connection — hardcoded fallback that always works
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ai-talent-hunt';

console.log('Attempting to connect to MongoDB...');
console.log('URI:', MONGODB_URI);

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('MongoDB Connected successfully!');
    // Seed admin if not exists
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const adminExists = await Admin.findOne({ username: adminUsername });
    if (!adminExists) {
      await Admin.create({
        username: adminUsername,
        password: adminPassword
      });
      console.log('Admin user seeded:', adminUsername, '/', adminPassword);
    }
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    console.log('');
    console.log('>>> FIX: Make sure MongoDB is installed and running.');
    console.log('>>> Windows: Open a new terminal and run: mongod');
    console.log('>>> If MongoDB is not installed, download from: https://www.mongodb.com/try/download/community');
    console.log('>>> Or use MongoDB Atlas (cloud) and set MONGODB_URI in a .env file');
    console.log('');
    process.exit(1);
  });

const publicDir = path.join(__dirname, 'public');
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) return next();
    res.sendFile(path.join(publicDir, 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Something went wrong!' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log('Server running on port ' + PORT));
