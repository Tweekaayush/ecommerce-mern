import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import { clearCartItems } from './cartSlice'
import { makePayment } from './paymentSlice'
import BASE_URL from '../constants/constants'

const initialState = {
    loading: false,
    data: {
        myOrders: [],
        orderDetails: {},
        allOrders: []
    },
    error: ''
}

export const createOrder = createAsyncThunk('createOrder', async(payload, {rejectWithValue, dispatch, getState})=>{
    try {

        const {email} = getState().user.data.user
        
        const res = await axios.post(`${BASE_URL}/api/v1/orders`, payload, {
            withCredentials: 'include'
        })

        dispatch(makePayment({email: email, order: {...res.data.createdOrder}}))
        dispatch(clearCartItems())

    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})

export const getOrderById = createAsyncThunk('getOrderById', async(payload, {rejectWithValue, dispatch})=>{
    try {
        const res = await axios.get(`${BASE_URL}/api/v1/orders/${payload}`, {
            withCredentials: 'include'
        })

        return res.data.order
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})

export const getMyOrders = createAsyncThunk('getMyOrders', async(payload, {rejectWithValue, dispatch})=>{
    try {
        const res = await axios.get(`${BASE_URL}/api/v1/orders/user?page=${payload}`, {
            withCredentials: 'include'
        })

        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})

export const getAllOrders = createAsyncThunk('getAllOrders', async(payload, {rejectWithValue, dispatch})=>{
    try {
        const res = await axios.get(`${BASE_URL}/api/v1/orders?page=${payload}`, {
            withCredentials: 'include'
        })

        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})

export const updateOrderToDelivered = createAsyncThunk('updateOrderToDelivered', async(payload, {dispatch, rejectWithValue})=>{
    try {
        const res = await axios.put(`${BASE_URL}/api/v1/orders/${payload}/deliver`, payload, {
            withCredentials: true
        })

        dispatch(getOrderById(payload))
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})

export const updateOrderToPaid = createAsyncThunk('updateOrderToPaid', async(payload, {dispatch, rejectWithValue})=>{
    try {
        const res = await axios.put(`${BASE_URL}/api/v1/orders/${payload}/pay`, payload, {
            withCredentials: true
        })

    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})

export const getOrdersInfo = createAsyncThunk('ordersInfo', async(payload, {dispatch, rejectWithValue})=>{
    try {
        const res = await axios.get(`${BASE_URL}/api/v1/orders/info`, {
            withCredentials: true
        })

        return res.data

    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        clearOrderErrors: (state)=>{
            state.error = ''
        },
        clearOrders: (state)=>{
            state.data = {
                myOrders: [],
                orderDetails: {},
                allOrders: []
            }
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(createOrder.pending, (state, action)=>{
            state.loading = true
        })
        builder.addCase(createOrder.fulfilled, (state, action)=>{
            state.loading = false
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
        builder.addCase(updateOrderToDelivered.pending, (state, action)=>{
            state.loading = true
        })
        builder.addCase(updateOrderToDelivered.fulfilled, (state, action)=>{
            state.loading = false
        })
        builder.addCase(updateOrderToDelivered.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(updateOrderToPaid.pending, (state, action)=>{
            state.loading = true
        })
        builder.addCase(updateOrderToPaid.fulfilled, (state, action)=>{
            state.loading = false
        })
        builder.addCase(updateOrderToPaid.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(getMyOrders.pending, (state, action)=>{
            state.loading = true
        })
        builder.addCase(getMyOrders.fulfilled, (state, action)=>{
            state.loading = false
            state.data.myOrders = action.payload.orders
            state.data.totalPages = action.payload.totalPages
        })
        builder.addCase(getMyOrders.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(getAllOrders.pending, (state, action)=>{
            state.loading = true
        })
        builder.addCase(getAllOrders.fulfilled, (state, action)=>{
            state.loading = false
            state.data.allOrders = action.payload.orders
            state.data.totalPages = action.payload.totalPages
        })
        builder.addCase(getAllOrders.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(getOrdersInfo.pending, (state, action)=>{
            state.loading = true
        })
        builder.addCase(getOrdersInfo.fulfilled, (state, action)=>{
            state.loading = false
            state.data.ordersInfo = action.payload
        })
        builder.addCase(getOrdersInfo.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })
    }
})

export const { clearOrderErrors, clearOrders } = orderSlice.actions

export default orderSlice.reducer