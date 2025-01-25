const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const connectDb = require('./config/db')
const product = require('./routes/productRoutes')
const {notFound, errorHandler} = require('./middleware/error')
const cors = require('cors')

connectDb()
const app = express()

const PORT = process.env.PORT || 5000

// middleware

app.use(express.json())
app.use(cors())

// Routes 

app.use('/api/v1', product)

// error middleware

app.use(notFound)
app.use(errorHandler)


app.listen(PORT, ()=>{
    console.log('Server Running')
})