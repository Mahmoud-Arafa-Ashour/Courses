const User = require('../models/users.model.js');
const httpStatusText = require('../utils/httpStatusText.js');
const asyncHandler = require('../middleware/asyncWrraper.js');
const appError = require('../utils/appError.js');
const { get } = require('mongoose');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken.js');

const getAllUsers = async (req,res) => {
    const queryParams = req.query;
    const limit = parseInt(queryParams.limit) || 2;
    const page = parseInt(queryParams.page) || 1;
    const skip = (page - 1) * limit;
    const totalUsers = await User.countDocuments();
    const users = await User.find({} , {"__v":0}).limit(limit).skip(skip);
    const hasNextPage = skip + users.length < totalUsers;
    const hasPreviousPage = page > 1;
    res.json({status : httpStatusText.SUCCESS, data: {users: users} , page: page , hasNextPage: hasNextPage , hasPreviousPage: hasPreviousPage });
}

const getUserById = asyncHandler(async (req,res,next) => {
    const user = await User.findById(req.params.courseId);
    if(!User) {
        const error = appError.create('User not found' , 404 , httpStatusText.ERROR);
        return next(error);
    }   
    res.json({status:httpStatusText.SUCCESS , data:{user : user}});
})

const register = asyncHandler(async (req,res,next)=> {
    const {firstName, lastName, email, password , role , Avatar} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        firstName,
        lastName,
        email,
        password : hashedPassword,
        role,
        Avatar : req.file.filename
    })
    const token = await generateToken({id: newUser._id, email: newUser.email , role: newUser.role});
    newUser.token = token;
    await newUser.save();
    res.status(201).json({status : httpStatusText.SUCCESS ,data:{newUser , token : token}});
})

const updateUser = asyncHandler(async (req,res,next) => {
    const UserId = req.params.userId;
    const user = await Course.findByIdAndUpdate(UserId , {$set:{...req.body}} , {new:true});
    res.status(200).json({status : httpStatusText.SUCCESS , data : user , message : 'User updated successfully' });
})

const deleteUser = asyncHandler(async (req,res,next) => {
const userId = +req.params.userId;
await Course.deleteone({_id: userId});
res.status(200).json({status : httpStatusText.SUCCESS , data : null ,  message : 'User deleted successfully' });
})

const login = asyncHandler(async (req,res,next) => {
    const {email, password , role} = req.body;
    console.log("body:", req.body);
    if(!email || !password){
        const error = appError.create('email and password are required' , 400 , httpStatusText.ERROR);
        return next(error);
    }
    const user = await User.findOne({email : req.body.email});
    if(!user){
        const error = appError.create('Invalid email or password' , 401 , httpStatusText.ERROR);
        return next(error);
    }
    const isPasswordValid = await bcrypt.compare(password , user.password);
    if(!isPasswordValid){
        const error = appError.create('Invalid password' , 401 , httpStatusText.ERROR);
        return next(error);
    }
    const token = await generateToken({id: user._id, email: user.email , role: user.role});
    user.token = token;
    await user.save();
    res.status(200).json({status : httpStatusText.SUCCESS , data : {user} , message : 'Login successful' });
});


module.exports = {
    getAllUsers,
    getUserById,
    register,
    updateUser,
    deleteUser,
    login
};
