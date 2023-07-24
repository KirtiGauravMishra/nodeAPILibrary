const errorHandler = (err, req, res, next) => {
    const defaultError = {
        statusCode: err.statusCode || 500,
        message: err.message || 'Internal Server Error,Pleas try again later'
    }
    if (err.name === 'ValidationError') {
        defaultError.statusCode = 400
        defaultError.message = Object.values(err.errors).map((val) => val.message).join(',')
    }
    res.status(defaultError.statusCode).json({
        message: defaultError.message,
        stack: process.env === 'production' ? '' : err.stack,
    })
}

module.exports = errorHandler;