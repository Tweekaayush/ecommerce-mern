import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    loading: false,
    data: {},
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

export const signup = createAsyncThunk('signup', async(payload, {rejectWithValue})=>{
    try {
        const res = await axios.post('http://localhost:5000/api/v1/users/signup', payload,{
            withCredentials: 'include'
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
        return res.data.user
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const logout = createAsyncThunk('logout', async(payload, {rejectWithValue})=>{
    try {
        const res = await axios.post('http://localhost:5000/api/v1/users/logout', payload, {
          withCredentials: 'include'  
        })
        console.log(res.data)
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const updateUserProfile = createAsyncThunk('updateUserProfile', async(payload, {rejectWithValue})=>{
    try {
        const res = await axios.put(`http://localhost:5000/api/v1/users/profile`, payload, {
            withCredentials: true
        })

        return res.data.user
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearUsersErrors: (state)=>{
            state.error = ''
        }
    },
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
        builder.addCase(login.pending, (state, action)=>{
            state.loading = true
        })
        builder.addCase(login.fulfilled, (state, action)=>{
            state.loading = false
            state.data = action.payload
        })
        builder.addCase(login.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(signup.pending, (state, action)=>{
            state.loading = true
        })
        builder.addCase(signup.fulfilled, (state, action)=>{
            state.loading = false
            state.data = action.payload
        })
        builder.addCase(signup.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(logout.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(logout.fulfilled, (state)=>{
            state.loading = false
            state.data = {}
        })
        builder.addCase(logout.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(updateUserProfile.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(updateUserProfile.fulfilled, (state, action)=>{
            state.loading = false
            state.data = action.payload
        })
        builder.addCase(updateUserProfile.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })
    }
})

export const {clearUsersErrors} = userSlice.actions

export default userSlice.reducer