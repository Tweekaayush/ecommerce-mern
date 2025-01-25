const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const connectDb = require('./config/db')
const product = require('./routes/productRoutes')
const {notFound, errorHandler} = require('./middleware/error')

connectDb()
const app = express()

const PORT = process.env.PORT || 5000

// Routes 

app.use('/api/v1', product)

// error middleware

app.use(notFound)
app.use(errorHandler)


app.listen(PORT, ()=>{
    console.log('Server Running')
})