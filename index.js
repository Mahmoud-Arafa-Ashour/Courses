const express = require('express');
const coursesRouter = require('./router/courses_routes');
const usersRouter = require('./router/users_routes');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const httpStatusText = require('./utils/httpstatustext.js');

const uri =process.env.Database_URL; ;

mongoose.
connect(uri)
.then(() => console.log('MongoDB connected'));

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/courses", coursesRouter);
app.use("/api/users", usersRouter);
app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({status : err.statusText || httpStatusText.ERROR , message : err.message || 'Internal Server Error' });
});
app.all(/.*/ , (req,res,next) => {
    res.status(404).json({status:httpStatusText.ERROR , message: 'Route not found' });
});

app.listen(+process.env.Port || 3000,() => {
    console.log('Server is running on port' , process.env.Port);
});
