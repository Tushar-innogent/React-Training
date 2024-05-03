import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../Training/productSlice'

export default configureStore({
  reducer: {
    product :  productReducer,   
  },
})