const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const connectDb = require('./config/db')
const product = require('./routes/productRoutes')
const user = require('./routes/userRoutes')
const {notFound, errorHandler} = require('./middleware/error')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 5000

const app = express()

// connecting database

connectDb()

// middleware

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: 'http://localhost:3000',
    credentials:true
}))
app.use(cookieParser())
// Routes 

app.use('/api/v1/products', product)
app.use('/api/v1/users', user)

// error middleware

app.use(notFound)
app.use(errorHandler)


app.listen(PORT, ()=>{
    console.log('Server Running')
})