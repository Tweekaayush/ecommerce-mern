import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productReducer from '../slices/productSlice'
import userReducer from '../slices/userSlice'

const rootReducer = combineReducers({
    products: productReducer,
    user: userReducer
})

const store = configureStore({
    reducer: rootReducer
})

export default store