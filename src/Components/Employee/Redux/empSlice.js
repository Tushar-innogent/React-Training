import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value:null
}

const EmployeeSlice = createSlice({
    name:'employee',
    initialState,
    reducers: {
        assign(state, action){
            state.value = action.payload;
        }
    }
})

export const { assign } = EmployeeSlice.actions;

export default EmployeeSlice.reducer;