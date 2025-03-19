import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  email: "",
  error: "",
  emailSent: false,
}

const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload
      if (state.error) state.error = ""
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    clearError: (state) => {
      state.error = ""
    },
    setEmailSent: (state, action) => {
      state.emailSent = action.payload
    },
    // eslint-disable-next-line no-unused-vars
    resetState: (state) => {
      return initialState
    },
    sendResetLinkSuccess: (state) => {
      state.emailSent = true
      state.error = ""
    },
  },
})

export const { setEmail, setError, clearError, setEmailSent, resetState, sendResetLinkSuccess } =
  forgotPasswordSlice.actions

export default forgotPasswordSlice.reducer

