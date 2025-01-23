// middleware/errorHandler.js
const ErrorHandler = require('../utils/errorhandler');

const errorHandler = (err, req, res, next) => {
   
    if (err instanceof ErrorHandler) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    }

    return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
    });
};

module.exports = errorHandler;
