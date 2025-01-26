const asyncHandler = require('../middleware/asyncHandler')
const User = require('../models/userModel')
const sendToken = require('../utils/generateToken')

exports.login = asyncHandler(async(req, res)=>{
    const {email, password} = req.body
    const user = await User.findOne({email})

    if(user && await user.matchPassword(password)){
        sendToken(user, 200, res)
    }else{
        res.status(401);
        throw new Error('Invalid email or password')
    }
})

exports.signup = asyncHandler(async(req, res)=>{
    res.send('signup')
})
exports.logout = asyncHandler(async(req, res)=>{
    res.send('logout')
})
exports.getUserProfile = asyncHandler(async(req, res)=>{
   const user = await User.findById(req.user.id)
   res.status(200).json({
    success: true,
    user: {
        _id: user._id,
        name: user.name,
        image: user.image,
        email: user.email,
        image: user.image,
        isAdmin: user.isAdmin
    }
   })
})
exports.updateUserProfile = asyncHandler(async(req, res)=>{
    res.send('update user profile')
})
exports.getUsers = asyncHandler(async(req,res)=>{
    res.send('get all users')
})
exports.getUserById = asyncHandler(async(req,res)=>{
    res.send('get user by id')
})
exports.deleteUser = asyncHandler(async(req,res)=>{
    res.send('delete user')
})
exports.updateUser = asyncHandler(async(req,res)=>{
    res.send('update user')
})
