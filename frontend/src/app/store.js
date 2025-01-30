import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productReducer from '../slices/productSlice'
import userReducer from '../slices/userSlice'
import cartReducer from '../slices/cartSlice'
import orderReducer from '../slices/orderSlice'
import paymentReducer from '../slices/paymentSlice'

const rootReducer = combineReducers({
    products: productReducer,
    user: userReducer,
    cart: cartReducer,
    orders: orderReducer,
    payment: paymentReducer
})

const store = configureStore({
    reducer: rootReducer
})

export default store