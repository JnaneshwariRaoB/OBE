const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const departmentRoutes = require('./routes/departmentRoutes');
const authRoutes = require('./routes/authRoutes');
const hodRoutes = require('./routes/hodRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Authentication routes
app.use('/api/auth', authRoutes);

// Department routes
app.use('/api/departments', departmentRoutes);

// HOD routes
app.use('/api/hods', hodRoutes);

module.exports = app;
