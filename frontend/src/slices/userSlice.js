import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    loading: false,
    data: {
        user: {},
        usersListAdmin: [],
        userDetailsAdmin: {}
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
        return rejectWithValue(error.response.data.message)
    }
})

export const signup = createAsyncThunk('signup', async(payload, {rejectWithValue})=>{
    try {
        const res = await axios.post('http://localhost:5000/api/v1/users/signup', payload,{
            withCredentials: 'include'
        })
        return res.data.user
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})

export const login = createAsyncThunk('login', async(payload, {rejectWithValue})=>{
    try {
        const res = await axios.post('http://localhost:5000/api/v1/users/login', payload,{
            withCredentials: 'include'
        })
        return res.data.user
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})

export const logout = createAsyncThunk('logout', async(payload, {rejectWithValue})=>{
    try {
        const res = await axios.post('http://localhost:5000/api/v1/users/logout', payload, {
          withCredentials: 'include'  
        })
        console.log(res.data)
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})

export const updateUserProfile = createAsyncThunk('updateUserProfile', async(payload, {rejectWithValue})=>{
    try {
        const res = await axios.put(`http://localhost:5000/api/v1/users/profile`, payload, {
            withCredentials: true
        })

        return res.data.user
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})

export const getAllUsers= createAsyncThunk('getAllUser', async(payload, {rejectWithValue})=>{
    try {
        const res = await axios.get(`http://localhost:5000/api/v1/users/all?page=${payload}`,{
            withCredentials: true
        })

        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})

export const deleteUser= createAsyncThunk('deleteUser', async(payload, {rejectWithValue})=>{
    try {
        const res = await axios.delete(`http://localhost:5000/api/v1/users/${payload}`,{
            withCredentials: true
        })

    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})

export const updateUser = createAsyncThunk('updateUser', async(payload, {dispatch, rejectWithValue})=>{
    try {
        const res = await axios.put(`http://localhost:5000/api/v1/users/${payload._id}`, payload, {
            withCredentials: true
        })

        dispatch(getAllUsers())
    } catch (error) {
        return rejectWithValue(error.response.data.message)
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
            state.data.user = action.payload
        })
        builder.addCase(loadUser.rejected, (state, action)=>{
            state.loading = false
        })
        builder.addCase(login.pending, (state, action)=>{
            state.loading = true
        })
        builder.addCase(login.fulfilled, (state, action)=>{
            state.loading = false
            state.data.user = action.payload
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
            state.data.user = action.payload
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
            state.data = {
                user: {},
                usersListAdmin: [],
                userDetailsAdmin: {}
            }
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
            state.data.user = action.payload
        })
        builder.addCase(updateUserProfile.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(getAllUsers.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(getAllUsers.fulfilled, (state, action)=>{
            state.loading = false
            state.data.usersListAdmin = action.payload.users
            state.data.totalPages = action.payload.totalPages
        })
        builder.addCase(getAllUsers.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(deleteUser.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(deleteUser.fulfilled, (state, action)=>{
            state.loading = false
        })
        builder.addCase(deleteUser.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(updateUser.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(updateUser.fulfilled, (state, action)=>{
            state.loading = false
        })
        builder.addCase(updateUser.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })
    }
})

export const {clearUsersErrors} = userSlice.actions

export default userSlice.reducer