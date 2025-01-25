const mongoose = require('mongoose')

const checkObjectId = (req, res, next) => {
    if(!mongoose.isValidObjectId(req.params.id)){
        res.status(404)
        throw new Error(`Invalid ObjectId of: ${req.params.id}`)
    }
    next()
}

module.exports = checkObjectId