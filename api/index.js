const express = require('express');
const cors = require('cors');
const { expressAuth } = require('./middleware/expressAuth');
const app = express();
const port = 5000;
const cookieParser = require("cookie-parser") 
require('dotenv').config();

const taskRoute = require('./routes/taskRoute');
const reportRoute = require('./routes/reportRoute');


// CORS middleware configuration
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'Set-Cookie']
}));

// Middleware for parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// Routes
app.use('/api/tasks',expressAuth, taskRoute);
app.use('/api/tasks/reports',expressAuth, reportRoute);


// Start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});