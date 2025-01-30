import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import {loadStripe} from '@stripe/stripe-js';


const initialState = {
    loading: false,
    paymentStatus: false,
    error: ''
}

export const makePayment = createAsyncThunk('makePayment', async(payload, {rejectWithValue})=>{
    try {
        const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY)

        const res = await axios.post(`http://localhost:5000/api/v1/payment`, payload, {
            withCredentials: true
        })

        alert(res.data)

        const result = stripe.redirectToCheckout({
            sessionId: res.data.session_id
        });


        if(result.error){
            return rejectWithValue(false)
        }

        return true
    } catch (error) {
        return rejectWithValue(false)
    }
})

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(makePayment.pending, (state, action)=>{
            state.loading = true
        })   
        builder.addCase(makePayment.fulfilled, (state, action)=>{
            state.loading = true
            state.paymentStatus = true
        })   
        builder.addCase(makePayment.rejected, (state, action)=>{
            state.loading = true
            state.paymentStatus = false
        })   
    }
})

export default paymentSlice.reducer
