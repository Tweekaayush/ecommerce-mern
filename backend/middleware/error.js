exports.notFound = (req, res, next)=>{
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}

exports.errorHandler = (err, req, res, next) =>{
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode
    let message = err.message || 'Internal Server Error';
    console.log(message)

    res.status(statusCode).json({
        success: false,
        message,
    })
}