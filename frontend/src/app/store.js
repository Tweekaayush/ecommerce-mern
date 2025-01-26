import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productReducer from '../slices/productSlice'
import userReducer from '../slices/userSlice'
import cartReducer from '../slices/cartSlice'

const rootReducer = combineReducers({
    products: productReducer,
    user: userReducer,
    cart: cartReducer
})

const store = configureStore({
    reducer: rootReducer
})

export default store