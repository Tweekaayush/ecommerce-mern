const jwt = require('jsonwebtoken')

const sendToken = (user, statusCode, res) =>{
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
        })

        const options = {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            expires: new Date(
                Date.now() + 30 * 24 * 60 * 60 * 1000
            )   
        }

        res.status(statusCode).cookie('token', token, options).json({
            success: true,
            user,
            token
        })
}

module.exports = sendToken