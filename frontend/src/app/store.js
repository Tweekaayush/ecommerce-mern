import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productReducer from '../slices/productSlice'
import userReducer from '../slices/userSlice'
import cartReducer from '../slices/cartSlice'
import orderReducer from '../slices/orderSlice'

const rootReducer = combineReducers({
    products: productReducer,
    user: userReducer,
    cart: cartReducer,
    orders: orderReducer
})

const store = configureStore({
    reducer: rootReducer
})

export default store