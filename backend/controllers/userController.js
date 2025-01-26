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
    const {name, email, password, image} = req.body
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('User already exits for given credentials.')
    }

    const user = await User.create({name, email, password, image})

    if(user){
        sendToken(user, 201, res)
    }else{
        res.status(401)
        throw new Error("Invalid user credentials.")
    }
})
exports.logout = asyncHandler(async(req, res)=>{
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
})
exports.getUserProfile = asyncHandler(async(req, res)=>{
   const user = await User.findById(req.user.id).select('-password')
   res.status(200).json({
    success: true,
    user
   })
})

exports.updateUserProfile = asyncHandler(async(req, res)=>{

    const user = await User.findById(req.user.id)

    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.fullAddress = req.body.fullAddress || user.fullAddress

        const updatedUser = await user.save()

        res.status(200).json({
            success: true,
            message: 'User Profile Updated!'
        })
    }else{
        res.status(404)
        throw new Error('User not found!')
    }
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
