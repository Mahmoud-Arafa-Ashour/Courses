const express = require('express');
const verifyToken = require('../middleware/verifyToken.js');

const router = express.Router();
const{
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse
} = require('../services/courses_services');

const {
    createCourseValidation,
    updateCourseValidation
} = require('../validations/course_validation');

router
.route('/')
.get(verifyToken,getAllCourses)
.post(verifyToken,createCourseValidation,createCourse);

router
.route('/:courseId')
.get(verifyToken,getCourseById)
.patch(verifyToken,updateCourseValidation,updateCourse)
.delete(verifyToken,deleteCourse);

module.exports = router;