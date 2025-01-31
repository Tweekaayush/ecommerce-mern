const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const connectDb = require('./config/db')
const product = require('./routes/productRoutes')
const user = require('./routes/userRoutes')
const order = require('./routes/orderRoutes')
const {notFound, errorHandler} = require('./middleware/error')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 5000
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

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
app.use('/api/v1/orders', order)
app.post('/api/v1/payment', async(req, res)=>{

    const {order, email} = req.body
    console.log(order._id)
    try{

        const line_items = order.orderItems.map((item)=>{
            return{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name,
                        // images: [item.image]
                    },
                    unit_amount: item.price * 100
                },
                quantity: item.quantity,
            }
        })


        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            ui_mode: 'hosted',
            success_url: `http://localhost:3000/success/${order._id}`,
            cancel_url: `http://localhost:3000/failed`,
            line_items: line_items,
            payment_method_types: ['card'],
            customer_email: email,
            shipping_options: [
                {
                  shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {
                      amount: order.shippingPrice * 100,
                      currency: 'usd',
                    },
                    display_name: 'Shipping Price',
                    tax_behavior: 'exclusive',
                    tax_code: 'txcd_92010001',
                    delivery_estimate: {
                      minimum: {
                        unit: 'business_day',
                        value: 5,
                      },
                      maximum: {
                        unit: 'business_day',
                        value: 7,
                      },
                    },
                  },
                },
              ],
        })
        res.json({session_id:session.id, url: session.url})
    }catch(e){
        console.log(e)
        res.status(500)
    }
})

// error middleware

app.use(notFound)
app.use(errorHandler)


app.listen(PORT, ()=>{
    console.log('Server Running')
})