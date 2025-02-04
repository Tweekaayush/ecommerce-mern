const jwt = require("jsonwebtoken");

exports.sendToken = (user, statusCode, res) => {
  const token = jwt.sign(
    { id: user._id, name: user.name },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      user: { ...user._doc, password: "" },
      token,
    });
};

exports.sendPasswordResetLink = (user) => {
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET + user.password,
    {
      expiresIn: "1m",
    }
  );

  return `${process.env.CLIENT_URL}/password/reset?token=${token}&user=${user._id}`;
  
};

exports.verifyReceivedToken = (user, token) => {
  const verify = jwt.verify(token, process.env.JWT_SECRET + user.password);
  return verify;
};
