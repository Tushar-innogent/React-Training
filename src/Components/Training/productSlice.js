import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: null
  };
  
export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
   assign(state, action) {
    // console.log(action.payload)
        state.value = action.payload; 
   },
  },
}
)

// Action creators are generated for each case reducer function
export const { assign } = productSlice.actions

export default productSlice.reducer