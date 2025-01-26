import {createSlice} from '@reduxjs/toolkit'
import { updateCart } from '../utils/cartUtils'

const initialState = JSON.parse(localStorage.getItem('primart-cart')) || {
    cartItems: [],
    shippingAddress: {}
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action)=>{
            const item = action.payload

            const existItem = state.cartItems.find(x=>x._id === item._id)

            if(existItem){
                state.cartItems = state.cartItems.map(x=> x._id === existItem._id?item: x)
            }else{
                state.cartItems = [...state.cartItems, item]
            }

            return updateCart(state)
        },
        removeFromCart: (state, action)=>{
            const id = action.payload

            state.cartItems = state.cartItems.filter((item)=>item._id !== id)

            return updateCart(state)
        },
        updateQuantity: (state, action)=>{
            const {_id: id, quantity} = action.payload
            let newArr = []

            if(quantity){
                state.cartItems = state.cartItems.map(x=> x._id === id? action.payload: x)
            }else{
                state.cartItems = state.cartItems.filter((item)=>item._id !== id)
            }

            return updateCart(state)
        }
    }
})

export const {addToCart, removeFromCart, updateQuantity} = cartSlice.actions

export default cartSlice.reducer