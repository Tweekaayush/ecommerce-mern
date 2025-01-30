import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    data: {
        products: [],
        trendingProducts: [],
        bestSellingProducts: [],
        productDetails: {},
        categories: [],
        totalPages: 0,
    },
    successMessage: '',
    error: ''
}

export const getProducts = createAsyncThunk('getProducts', async(payload, {rejectWithValue})=>{

    try {
        const {page, category} = payload
        const products = await axios.get(`http://localhost:5000/api/v1/products?page=${page}&category=${category}`,{
            withCredentials: 'include'
        })
        return products.data   
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})

export const getAllCategories = createAsyncThunk('getAllCategories', async(payload, {rejectWithValue})=>{

    try {
        const products = await axios.get('http://localhost:5000/api/v1/products/categories',{
            withCredentials: 'include'
        })
        return products.data.categories   
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})

export const getProductById = createAsyncThunk('getProductById', async(payload, {rejectWithValue})=>{
    try {
        const product = await axios.get(`http://localhost:5000/api/v1/products/${payload}`,{
            withCredentials: 'include'
        })
        return product.data        
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }

})

export const getTrendingProducts = createAsyncThunk('getTrendingProducts', async(payload, {rejectWithValue})=>{
    try {
        const products = await axios.get(`http://localhost:5000/api/v1/products/trending`, {
            withCredentials: 'include'
        })
        return products.data
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})

export const getBestSellingProducts = createAsyncThunk('getBestSellingProducts', async(payload, {rejectWithValue})=>{
    try {
        const products = await axios.get(`http://localhost:5000/api/v1/products/bestselling`, {
            withCredentials: 'include'
        })
        return products.data
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})

export const updateProduct = createAsyncThunk('updateProduct', async(payload, {rejectWithValue}) =>{
    try {
        const res = await axios.put(`http://localhost:5000/api/v1/products/${payload.id}`, payload, {
            withCredentials: true
        })

        return res.data

    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})

export const deleteProduct = createAsyncThunk('deleteProduct', async(payload, {dispatch, rejectWithValue})=>{
    try {
        const res = await axios.delete(`http://localhost:5000/api/v1/products/${payload}`, {
            withCredentials: true
        })

        dispatch(getProducts({page: 1, category: ''}))

        return res.data.message
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})

export const addReview = createAsyncThunk('addReview', async(payload, {dispatch, rejectWithValue})=>{
    try {
        const res = await axios.post(`http://localhost:5000/api/v1/products/${payload._id}/reviews`, payload, {
            withCredentials: true
        })

        dispatch(getProductById(payload._id))

        return res.data.message

    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        clearProductErrors: (state, action)=>{
            state.error = ''
        },
        clearProductSuccessMessage: (state, action)=>{
            state.successMessage = ''
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(getProducts.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(getProducts.fulfilled, (state, action)=>{
            state.loading = false
            state.data.products = action.payload.products
            state.data.totalPages = action.payload.totalPages
        })
        builder.addCase(getProducts.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(getAllCategories.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(getAllCategories.fulfilled, (state, action)=>{
            state.loading = false
            state.data.categories = action.payload
        })
        builder.addCase(getAllCategories.rejected, (state, action)=>{
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
        builder.addCase(updateProduct.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(updateProduct.fulfilled, (state, action)=>{
            state.loading = false
            state.data.productDetails = action.payload.product
            state.successMessage = action.payload.message
        })
        builder.addCase(updateProduct.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(deleteProduct.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(deleteProduct.fulfilled, (state, action)=>{
            state.loading = false
            state.successMessage = action.payload
        })
        builder.addCase(deleteProduct.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(addReview.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(addReview.fulfilled, (state, action)=>{
            state.loading = false
            state.successMessage = action.payload
        })
        builder.addCase(addReview.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })
    }
})


export const { clearProductErrors, clearProductSuccessMessage } = productSlice.actions

export default productSlice.reducer