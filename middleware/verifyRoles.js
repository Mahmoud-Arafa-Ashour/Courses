const appError = require('../utils/AppError.js');
const httpStatusText = require('../utils/httpstatustext.js');

module.exports = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.currentUser.role)) {
            const error = appError.create('You do not have permission to perform this action', 403, httpStatusText.FAIL);
            return next(error);
        }
        next();
    };
};