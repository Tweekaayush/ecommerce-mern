import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import { clearCartItems } from './cartSlice'
import { clearErrors } from './productSlice'

const initialState = {
    loading: false,
    data: {
        allOrders: {},
        orderDetails: {_id: ''}
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

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        clearOrderErrors: (state)=>{
            state.error = ''
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(createOrder.pending, (state, action)=>{
            state.loading = true
        })
        builder.addCase(createOrder.fulfilled, (state, action)=>{
            state.loading = false
            state.data.orderDetails = action.payload
        })
        builder.addCase(createOrder.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })
    }
})

export const { clearOrderErrors } = orderSlice.actions

export default orderSlice.reducer