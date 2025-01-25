import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productReducer from '../slices/productSlice'

const rootReducer = combineReducers({
    products: productReducer
})

const store = configureStore({
    reducer: rootReducer
})

export default store