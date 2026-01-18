const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI);

const authRoutes = require('./routes/auth.routes');
const projectRoutes = require('./routes/project.routes');
const chatRoutes = require('./routes/chat.routes');
const healthRoutes = require('./routes/health.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/uploads', express.static('uploads'));

app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/chat', chatRoutes);

module.exports = app;
