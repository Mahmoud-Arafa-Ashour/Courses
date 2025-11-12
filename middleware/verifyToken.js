const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const appError = require('../utils/appError.js');
const httpStatusText = require('../utils/httpStatusText.js');
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if(!authHeader)
    {
        const error = appError.create('No token provided' , 401 , httpStatusText.ERROR);
        return next(error);
    }
    const token = authHeader.split(' ')[1];
    try{
        const currentUser =  jwt.verify(token, process.env.JWT_Secret_Key);
        req.currentUser = currentUser;
        next();
    }catch(err){
        const error = appError.create(err.message , 401 , httpStatusText.ERROR);
        return next(error);
    }
};
module.exports = verifyToken;