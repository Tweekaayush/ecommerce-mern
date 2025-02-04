const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/userModel");
const {
  sendPasswordResetLink,
  sendToken,
  verifyReceivedToken,
} = require("../utils/generateToken");
const Wishlist = require("../models/wishlistModel");
const sendEmail = require("../utils/sendEmail");
const cloudinary = require('cloudinary')

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

  const uploadResult = await cloudinary.uploader.upload(image, {
    folder: "users",
  });

  const user = await User.create({ name, email, password, image: uploadResult.url });

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

exports.userCount = asyncHandler(async (req, res) => {
  const userCount = await User.countDocuments({});

  if (userCount) {
    res.status(200).json({
      success: true,
      userCount,
    });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

exports.forgetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User does not exist");
  }

  const resetPasswordUrl = sendPasswordResetLink(user);
  const message = `Your password reset link is:- \n\n ${resetPasswordUrl} \n\n If you have not requested this Email then, please ignore it`;
  await sendEmail({
    email: user.email,
    subject: "Primart Password Recovery",
    message,
  });
  res.status(200).json({
    success: true,
    message: `Email sent to ${user.email} successfully`,
  });
});

exports.resetPassword = asyncHandler(async (req, res) => {
  const { password, user: id, token } = req.body;

  const user = await User.findById(id);

  if (!user) {
    res.status(404);
    throw new Error("User does not exist");
  }

  const verify = verifyReceivedToken(user, token);

  if (verify) {
    user.password = password;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully.",
    });
  } else {
    res.status(404);
    throw new Error("Invalid request");
  }
});

exports.getWishlist = asyncHandler(async (req, res) => {
  const wishlist = await Wishlist.findOne({ user: req.user.id });

  if (wishlist) {
    res.status(200).json({
      success: true,
      wishlist: wishlist.wishlist_items,
    });
  } else {
    const newWishlist = new Wishlist({
      user: req.user.id,
      wishlist_items: [],
    });

    const createdWishlist = await newWishlist.save();

    res.status(200).json({
      success: true,
      wishlist: createdWishlist.wishlist_items,
    });
  }
});

exports.addToWishlist = asyncHandler(async (req, res) => {
  const { _id, name, price, image, rating } = req.body;

  const wishlist = await Wishlist.findOne({ user: req.user.id });

  if (wishlist) {
    wishlist.wishlist_items.forEach((item) => {
      if (item.product.toString() === _id) {
        res.status(400);
        throw new Error("Product already in wishlist");
      }
    });

    wishlist.wishlist_items.push({
      name,
      image,
      price,
      rating,
      product: _id,
    });

    const updatedWishlist = await wishlist.save();

    res.status(200).json({
      success: true,
      message: "Added to wishlist",
    });
  } else {
    console.log("hi");
    const newWishlist = new Wishlist({
      user: req.user.id,
      wishlist_items: [],
    });

    newWishlist.wishlist_items.push({
      name,
      image,
      price,
      rating,
      product: _id,
    });
    const updatedWishlist = await newWishlist.save();
    res.status(200).json({
      success: true,
      message: "Added to wishlist",
    });
  }
});

exports.removeFromWishlist = asyncHandler(async (req, res) => {
  const wishlist = await Wishlist.findOne({ user: req.user.id });

  if (wishlist) {
    const newWishlist = wishlist.wishlist_items.filter((item) => {
      console.log(item.product.toString(), req.body._id);
      return item.product.toString() !== req.body._id;
    });

    console.log(newWishlist);

    wishlist.wishlist_items = newWishlist;

    const updatedWishlist = await wishlist.save();

    res.status(200).json({
      success: true,
      message: "removed from wishlist",
    });
  } else {
    res.status(400);
    throw new Error("Some error occured");
  }
});
