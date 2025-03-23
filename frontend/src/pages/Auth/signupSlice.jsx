import { createSlice } from "@reduxjs/toolkit"
import { toast } from 'react-toastify';

const initialState = {
  formData: {
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  errors: {},
  signupMessage: { type: "", text: "" },
  isSubmitting: false,
}

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    setFormField: (state, action) => {
      const { field, value } = action.payload
      state.formData[field] = value
      // Clear error when user types
      if (state.errors[field]) {
        state.errors = {
          ...state.errors,
          [field]: "",
        }
      }
    },
    setFormData: (state, action) => {
      state.formData = {
        ...state.formData,
        ...action.payload,
      }
    },
    setErrors: (state, action) => {
      state.errors = action.payload
    },
    clearErrors: (state) => {
      state.errors = {}
    },
    setSignupMessage: (state, action) => {
      state.signupMessage = action.payload
    },
    setIsSubmitting: (state, action) => {
      state.isSubmitting = action.payload
    },
    resetForm: (state) => {
      state.formData = initialState.formData
      state.errors = {}
      state.signupMessage = { type: "", text: "" }
      state.isSubmitting = false
    },
    signupSuccess: (state) => {
      state.signupMessage = {
        type: "success",
        text: "Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.",
      }
      state.formData = initialState.formData
      state.errors = {}
      state.isSubmitting = false
    },
  },
  signupSuccess: (state) => {
    state.signupMessage = {
      type: "success",
      text: "Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.",
    }
    state.formData = initialState.formData
    state.errors = {}
    state.isSubmitting = false
    
    toast.success("Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  }
})

export const {
  setFormField,
  setFormData,
  setErrors,
  clearErrors,
  setSignupMessage,
  setIsSubmitting,
  resetForm,
  signupSuccess,
} = signupSlice.actions

export default signupSlice.reducer

