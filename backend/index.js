const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const connectDb = require('./config/db')
const product = require('./routes/productRoutes')
const user = require('./routes/userRoutes')
const order = require('./routes/orderRoutes')
const payment = require('./routes/paymentRoutes')
const {notFound, errorHandler} = require('./middleware/error')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 5000
const cloudinary = require('cloudinary')
const fileUpload = require("express-fileupload")
const app = express()


app.get('/', (req, res)=>{
  res.json('Server Running')
})

// connecting database

connectDb()

//cloudinary config

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// middleware

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials:true
}))
app.use(cookieParser())
app.use(fileUpload())

// Routes 

app.use('/api/v1/products', product)
app.use('/api/v1/users', user)
app.use('/api/v1/orders', order)
app.use('/api/v1/payment', payment)

// error middleware

app.use(notFound)
app.use(errorHandler)


app.listen(PORT, ()=>{
    console.log('Server Running')
})