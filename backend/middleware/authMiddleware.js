const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const asyncHandler = require('../middleware/asyncHandler')

exports.protected = asyncHandler(async(req, res, next)=>{
    const {token} = req.cookies
    console.log(token)
    if(!token){
        return next(new Error('Please Login to access this resource'))
    }

    const decodeData = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decodeData.id)
    next()
})