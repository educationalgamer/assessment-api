const express = require('express');
const bodyParser = require('body-parser');
const database = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const communityRoutes = require('./routes/communityRoutes');
const roleRoutes = require('./routes/roleRoutes');
const memberRoutes = require('./routes/memberRoutes');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/v1/users', userRoutes);
app.use('/v1/communities', communityRoutes);
app.use('/v1/roles', roleRoutes);
app.use('/v1/members', memberRoutes);

// Error handling middleware
app.use(errorHandler);
app.listen(3000);

module.exports = app;
