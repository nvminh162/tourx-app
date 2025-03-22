//REDUX_TOOLKIT
import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../pages/Auth/authSlice"
import signupReducer from "../pages/Auth/signupSlice"
import forgotPasswordReducer from "../pages/Auth/forgotPasswordSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    signup: signupReducer,
    forgotPassword: forgotPasswordReducer,
  },
})

export default store

