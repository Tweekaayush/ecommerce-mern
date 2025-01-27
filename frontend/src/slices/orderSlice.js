import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import { clearCartItems } from './cartSlice'
import { clearErrors } from './productSlice'

const initialState = {
    loading: false,
    data: {
        allOrders: {},
        createdOrder: '',
        orderDetails: {}
    },
    error: ''
}

export const createOrder = createAsyncThunk('createOrder', async(payload, {rejectWithValue, dispatch})=>{
    try {
        const res = await axios.post('http://localhost:5000/api/v1/orders', payload, {
            withCredentials: 'include'
        })

        dispatch(clearCartItems())

        return res.data.createdOrder
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const getOrderById = createAsyncThunk('getOrderById', async(payload, {rejectWithValue, dispatch})=>{
    try {
        const res = await axios.get(`http://localhost:5000/api/v1/orders/${payload}`, {
            withCredentials: 'include'
        })

        return res.data.order
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        clearOrderErrors: (state)=>{
            state.error = ''
        },
        clearCreatedOrder: (state)=>{
            state.createdOrder = ''
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(createOrder.pending, (state, action)=>{
            state.loading = true
        })
        builder.addCase(createOrder.fulfilled, (state, action)=>{
            state.loading = false
            state.data.createdOrder = action.payload._id
        })
        builder.addCase(createOrder.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(getOrderById.pending, (state, action)=>{
            state.loading = true
        })
        builder.addCase(getOrderById.fulfilled, (state, action)=>{
            state.loading = false
            state.data.orderDetails = action.payload
        })
        builder.addCase(getOrderById.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })
    }
})

export const { clearOrderErrors, clearCreatedOrder } = orderSlice.actions

export default orderSlice.reducer