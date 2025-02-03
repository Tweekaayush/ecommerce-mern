import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import { clearOrders } from './orderSlice'

const initialState = {
    loading: false,
    data: {
        user: {},
        usersListAdmin: [],
        userDetailsAdmin: {},
        wishlist: []
    },
    successMessage: '',
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

export const logout = createAsyncThunk('logout', async(payload, {dispatch, rejectWithValue})=>{
    try {
        const res = await axios.post('http://localhost:5000/api/v1/users/logout', payload, {
          withCredentials: 'include'  
        })

        dispatch(clearOrders())

        return res.data.message

    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})

export const forgetPassword = createAsyncThunk('forgetPassword', async(payload, {rejectWithValue})=>{
    try {
        const res = await axios.post('http://localhost:5000/api/v1/users/forget', payload, {
          withCredentials: 'include'  
        })

        return res.data.message

    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})

export const resetPassword = createAsyncThunk('resetPassword', async(payload, {rejectWithValue})=>{
    try {
        const res = await axios.post('http://localhost:5000/api/v1/users/reset', payload, {
          withCredentials: 'include'  
        })

        return res.data.message

    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})

export const updateUserProfile = createAsyncThunk('updateUserProfile', async(payload, {rejectWithValue})=>{
    try {
        const res = await axios.put(`http://localhost:5000/api/v1/users/profile`, payload, {
            withCredentials: true
        })

        return res.data
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

export const deleteUser= createAsyncThunk('deleteUser', async(payload, {rejectWithValue, dispatch})=>{
    try {
        const res = await axios.delete(`http://localhost:5000/api/v1/users/${payload}`,{
            withCredentials: true
        })

        dispatch(getAllUsers())

        return res.data.message

    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})

export const updateUser = createAsyncThunk('updateUser', async(payload, {dispatch, rejectWithValue})=>{
    try {
        const res = await axios.put(`http://localhost:5000/api/v1/users/${payload._id}`, payload, {
            withCredentials: true
        })

        dispatch(getUserById(payload._id))
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})

export const getUserById = createAsyncThunk('getUserById', async(payload, {dispatch, rejectWithValue})=>{
    try {
        const res = await axios.get(`http://localhost:5000/api/v1/users/${payload}`, {
            withCredentials: true
        })

        return res.data.userDetailsAdmin

    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})

export const getUserCount = createAsyncThunk('getUserCount', async(payload, {rejectWithValue})=>{
    try {
        const res = await axios.get('http://localhost:5000/api/v1/users/count', {
            withCredentials: true
        })

        return res.data.userCount
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})

export const addToWishlist = createAsyncThunk('addToWishlist', async(payload, {dispatch, rejectWithValue})=>{
    try {
        const res = await axios.post('http://localhost:5000/api/v1/users/wishlist', payload, {
            withCredentials: true
        })
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})

export const removeFromWishlist = createAsyncThunk('removeFromWishlist', async(payload, {dispatch, rejectWithValue})=>{
    try {
        const res = await axios.put('http://localhost:5000/api/v1/users/wishlist', payload, {
            withCredentials: true
        })

        dispatch(getWishlist())
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})

export const getWishlist = createAsyncThunk('getWishlist', async(payload, {rejectWithValue})=>{
    try {
        const res = await axios.get('http://localhost:5000/api/v1/users/wishlist', {
            withCredentials: true
        })
        return res.data
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
        },
        clearUserSuccessMessage: (state)=>{
            state.successMessage = ''
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
            state.successMessage = 'Logged In Successfully'
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
            state.successMessage = 'Signed Up Successfully'
        })
        builder.addCase(signup.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(logout.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(logout.fulfilled, (state, action)=>{
            state.loading = false
            state.data = {
                user: {},
                usersListAdmin: [],
                userDetailsAdmin: {}
            }
            state.successMessage = action.payload
        })
        builder.addCase(logout.rejected, (state, action)=>{
            state.loading = false
        })
        builder.addCase(updateUserProfile.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(updateUserProfile.fulfilled, (state, action)=>{
            state.loading = false
            state.data.user = action.payload.user
            state.successMessage = action.payload.message
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
        })
        builder.addCase(deleteUser.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(deleteUser.fulfilled, (state, action)=>{
            state.loading = false
            state.successMessage = action.payload
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
        builder.addCase(getUserById.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(getUserById.fulfilled, (state, action)=>{
            state.loading = false
            state.data.userDetailsAdmin = action.payload
        })
        builder.addCase(getUserById.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(getUserCount.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(getUserCount.fulfilled, (state, action)=>{
            state.loading = false
            state.data.userCount = action.payload
        })
        builder.addCase(getUserCount.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(forgetPassword.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(forgetPassword.fulfilled, (state, action)=>{
            state.loading = false
            state.successMessage = action.payload
        })
        builder.addCase(forgetPassword.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(resetPassword.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(resetPassword.fulfilled, (state, action)=>{
            state.loading = false
            state.successMessage = action.payload
        })
        builder.addCase(resetPassword.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(getWishlist.pending, (state, action)=>{
            state.loading = true
        })
        builder.addCase(getWishlist.fulfilled, (state, action)=>{
            state.loading = false
            state.data.wishlist = action.payload.wishlist
        })
        builder.addCase(getWishlist.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(addToWishlist.pending, (state, action)=>{
            state.loading = true
        })
        builder.addCase(addToWishlist.fulfilled, (state, action)=>{
            state.loading = false
            state.data.wishlist = action.payload.wishlist
            state.successMessage = action.payload.message
        })
        builder.addCase(addToWishlist.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(removeFromWishlist.pending, (state, action)=>{
            state.loading = true
        })
        builder.addCase(removeFromWishlist.fulfilled, (state, action)=>{
            state.loading = false
            state.data.wishlist = action.payload.wishlist
            state.successMessage = action.payload.message
        })
        builder.addCase(removeFromWishlist.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })
    }
})

export const {clearUsersErrors, clearUserSuccessMessage} = userSlice.actions

export default userSlice.reducer