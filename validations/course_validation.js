const { body, validationResult } = require('express-validator');

const createCourseValidation = [
    body('tittle')
        .isLength({min: 3})
        .withMessage('Name must be at least 3 characters long')
        .notEmpty()
        .withMessage('Name is required') ,
        body('price')
        .notEmpty()
        .withMessage('Price is required')
];

const updateCourseValidation = [
     body('tittle')
        .isLength({min: 3})
        .withMessage('Name must be at least 3 characters long')
        .notEmpty()
        .withMessage('Name is required') ,
        body('price')
        .notEmpty()
        .withMessage('Price is required')
];

module.exports = {
    createCourseValidation,
    updateCourseValidation
};