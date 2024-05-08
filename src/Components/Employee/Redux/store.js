import { configureStore } from "@reduxjs/toolkit";
import EmployeeSlice from '../Redux/empSlice';

export default configureStore ({
    reducer: {
        employee : EmployeeSlice
    }
})