const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const appError = require('../utils/AppError.js');
const httpStatusText = require('../utils/httpstatustext.js');
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if(!authHeader)
    {
        const error = appError.create('No token provided' , 401 , httpStatusText.ERROR);
    }
    const token = authHeader.split(' ')[1];
    try{
        jwt.verify(token, process.env.JWT_Secret_Key);
        next();
    }catch(err){
        const error = appError.create('Invalid token' , 401 , httpStatusText.ERROR);
        return next(error);
    }
};
module.exports = verifyToken;