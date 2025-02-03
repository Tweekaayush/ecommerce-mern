const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/userModel");
const sendToken = require("../utils/generateToken");
const Wishlist = require('../models/wishlistModel')

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    sendToken(user, 200, res);
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

exports.signup = asyncHandler(async (req, res) => {
  const { name, email, password, image } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exits for given credentials.");
  }

  const user = await User.create({ name, email, password, image });

  if (user) {
    sendToken(user, 201, res);
  } else {
    res.status(401);
    throw new Error("Invalid user credentials.");
  }
});

exports.logout = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
});

exports.getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.status(200).json({
    success: true,
    user,
  });
});

exports.updateUserProfile = asyncHandler(async (req, res) => {
  const { name, email, password, fullAddress } = req.body;
  const user = await User.findById(req.user.id);

  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;

    if (password) {
      user.password = password;
    }

    if (fullAddress?.address) {
      user.fullAddress.address = fullAddress.address;
      user.fullAddress.city = fullAddress.city;
      user.fullAddress.postalCode = fullAddress.postalCode;
      user.fullAddress.country = fullAddress.country;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      user: updatedUser,
      message: "User Profile Updated!",
    });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

exports.getUsers = asyncHandler(async (req, res) => {
  const paginate = 6;
  const page = Number(req.query.page) || 1;
  const users = await User.find({})
    .limit(paginate)
    .skip(paginate * (page - 1));
  const count = await User.countDocuments();
  res.status(200).json({
    success: true,
    users,
    page,
    totalPages: Math.ceil(count / paginate),
  });
});

exports.getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.status(200).json({
      success: true,
      userDetailsAdmin: user,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Cannot delete admin user");
    }
    await User.deleteOne({ _id: user._id });

    res.status(200).json({
      success: true,
      message: "User deleted Successfully",
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

exports.updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.isAdmin = true;

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      updatedUser: { ...updatedUser._doc, password: "" },
      message: "User Role Updated!",
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

exports.userCount = asyncHandler(async(req, res)=>{

  const userCount = await User.countDocuments({})

  if(userCount){
    res.status(200).json({
      success: true,
      userCount
    })
  }else{
    res.status(404)
    throw new Error('Resource not found')
  }

})

exports.forgetPassword = asyncHandler(async(req, res)=>{
  const {email} = req.body

  console.log(email)

  res.status(200).json({
    success: true,
    message: 'Password reset link has been sent to your email.'
  })
})

exports.resetPassword = asyncHandler(async(req, res)=>{
  const {password} = req.body

  console.log(password)

  res.status(200).json({
    success: true,
    message: 'Password reset successfully.'
  })
})

exports.getWishlist = asyncHandler(async(req, res)=>{

  const wishlist = await Wishlist.find({user: req.user.id})

  res.status(200).json({
    success:true,
    wishlist: wishlist[0].wishlist_items
  })
})

exports.addToWishlist = asyncHandler(async(req, res)=>{

  const {_id, name, price, image, rating} = req.body

  const wishlist = await Wishlist.find({user: req.user.id})

  if(wishlist.length !== 0){

    wishlist[0].wishlist_items.forEach((item)=>{
      if(item.product.toString() === _id){
        res.status(400)
        throw new Error('Product already in wishlist')
      }
    })
    
    wishlist[0].wishlist_items.push({
      name,
      image,
      price,
      rating,
      product: _id
    })

    const updatedWishlist = await wishlist[0].save()

    res.status(200).json({
      success:true,
      message: 'Added to wishlist'
    })
  }else{
    console.log('hi')
    const newWishlist = new Wishlist({
      user: req.user.id,
      wishlist_items: []
    })

    newWishlist.wishlist_items.push({
      name,
      image,
      price,
      rating,
      product: _id
    })
    const updatedWishlist = await newWishlist.save()
    res.status(200).json({
      success:true,
      message: 'Added to wishlist'
    })
  }
})

exports.removeFromWishlist = asyncHandler(async(req, res)=>{

  const wishlist = await Wishlist.find({user: req.user.id})

  if(wishlist.length){

    const newWishlist = wishlist[0].wishlist_items.filter((item)=> {
      console.log(item.product.toString(), req.body._id)
      return item.product.toString() !== req.body._id
    })

    console.log(newWishlist)

    wishlist[0].wishlist_items = newWishlist

    const updatedWishlist = await wishlist[0].save()

    res.status(200).json({
      success:true,
      message: 'removed from wishlist'
    })
  }else{
    res.status(400)
    throw new Error('Some error occured')
  }

})