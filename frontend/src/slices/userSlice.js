import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    loading: false,
    data: {
        _id: '',
        name: '',
        email: '',
        isAdmin: false,
        image: ''
    },
    error: ''
}

export const loadUser = createAsyncThunk('loadUser', async(payload, {rejectWithValue})=>{
    try {
        const res = await axios.get('http://localhost:5000/api/v1/users/profile', {
            withCredentials: true
        })
        return res.data.user
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const login = createAsyncThunk('login', async(payload, {rejectWithValue})=>{
    try {
        const res = await axios.post('http://localhost:5000/api/v1/users/login', payload,{
            withCredentials: 'include'
        })
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder)=>{
        builder.addCase(loadUser.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(loadUser.fulfilled, (state, action)=>{
            state.loading = false
            state.data = action.payload
        })
        builder.addCase(loadUser.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(login.rejected, (state, action)=>{
            state.error = action.payload
        })
    }
})

export default userSlice.reducer