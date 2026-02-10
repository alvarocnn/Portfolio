const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const authRoutes = require('./Routes/authRoutes');
const taskListRoutes = require('./Routes/taskListRoutes');
const taskRoutes = require('./Routes/taskRoutes');
const userRoutes = require('./Routes/userRoutes');

app.use('/api', authRoutes);
app.use('/api', taskListRoutes);
app.use('/api', taskRoutes);
app.use('/api', userRoutes);

module.exports = app;

