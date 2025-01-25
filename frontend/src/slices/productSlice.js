import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    data: {
        products: [],
        trendingProducts: [],
        bestSellingProducts: [],
        productDetails: {}
    },
    error: ''
}

export const getProducts = createAsyncThunk('getProducts', async(payload, {rejectWithValue})=>{

    try {
        const products = await axios.get('http://localhost:5000/api/v1/products')
        return products.data   
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const getProductById = createAsyncThunk('getProductById', async(payload, {rejectWithValue})=>{
    try {
        const product = await axios.get(`http://localhost:5000/api/v1/products/${payload}`)
        return product.data        
    } catch (error) {
        return rejectWithValue(error.message)
    }

})

export const getTrendingProducts = createAsyncThunk('getTrendingProducts', async(payload, {rejectWithValue})=>{
    try {
        const products = await axios.get(`http://localhost:5000/api/v1/products/trending`)
        return products.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const getBestSellingProducts = createAsyncThunk('getBestSellingProducts', async(payload, {rejectWithValue})=>{
    try {
        const products = await axios.get(`http://localhost:5000/api/v1/products/bestselling`)
        return products.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        clearErrors: (state, action)=>{
            state.error = ''
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(getProducts.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(getProducts.fulfilled, (state, action)=>{
            state.loading = false
            state.data.products = action.payload
        })
        builder.addCase(getProducts.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(getTrendingProducts.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(getTrendingProducts.fulfilled, (state, action)=>{
            state.loading = false
            state.data.trendingProducts = action.payload
        })
        builder.addCase(getTrendingProducts.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(getBestSellingProducts.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(getBestSellingProducts.fulfilled, (state, action)=>{
            state.loading = false
            state.data.bestSellingProducts = action.payload
        })
        builder.addCase(getBestSellingProducts.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(getProductById.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(getProductById.fulfilled, (state, action)=>{
            state.loading = false
            state.data.productDetails = action.payload
        })
        builder.addCase(getProductById.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })
    }
})


export const { clearErrors } = productSlice.actions

export default productSlice.reducer