const mongoose = require('mongoose')

const checkObjectId = (req, res, next) => {
    if(!mongoose.isValidObjectId(req.params.id)){
        res.status(404)
        throw new Error(`Product not found`)
    }
    next()
}

module.exports = checkObjectId