const Course = require('../models/courses.model.js');
const { validationResult } = require('express-validator');
const httpStatusText = require('../utils/httpStatusText.js');
const asyncHandler = require('../middleware/asyncWrraper.js');
const appError = require('../utils/appError.js');

const getAllCourses = async (req,res) => {
    const queryParams = req.query;
    const limit = parseInt(queryParams.limit) || 2;
    const page = parseInt(queryParams.page) || 1;
    const skip = (page - 1) * limit;
    const totalCourses = await Course.countDocuments();
    const courses = await Course.find({} , {"__v":0}).limit(limit).skip(skip);
    const hasNextPage = skip + courses.length < totalCourses;
    const hasPreviousPage = page > 1;
    res.json({status : httpStatusText.SUCCESS, data: {courses: courses} , page: page , hasNextPage: hasNextPage , hasPreviousPage: hasPreviousPage });
}

const getCourseById = asyncHandler(async (req,res,next) => {
    const course = await Course.findById(req.params.courseId);
    if(!course) {
        const error = appError.create('Course not found' , 404 , httpStatusText.ERROR);
        return next(error);
    }   
    res.json({status:httpStatusText.SUCCESS , data:{course : course}});
})

const createCourse = asyncHandler(async (req,res,next)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = appError.create(errors.array() , 400 , httpStatusText.ERROR);
        return next(error);
    }
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.status(201).json({status : httpStatusText.SUCCESS ,data:{newCourse}});
})

const updateCourse = asyncHandler(async (req,res,next) => {
    const courseId = req.params.courseId;
    const course = await Course.findByIdAndUpdate(courseId , {$set:{...req.body}} , {new:true});
    res.status(200).json({status : httpStatusText.SUCCESS , data : course});
})

const deleteCourse = asyncHandler(async (req,res,next) => {
const courseId = req.params._id;
await Course.deleteOne({_id: courseId});
res.status(200).json({status : httpStatusText.SUCCESS , data : null ,  message : 'Course deleted successfully' });
})


module.exports = {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse
};
