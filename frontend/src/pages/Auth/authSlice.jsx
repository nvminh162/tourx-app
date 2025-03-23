import { createSlice } from "@reduxjs/toolkit"
import { toast } from 'react-toastify';

const initialState = {
  currentUser: null,
  isLoggedIn: false,
  loginMessage: { type: "", text: "" },
  errors: {},
  rememberMe: false,
  loginCredentials: {
    username: "",
    password: "",
  },
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginCredentials: (state, action) => {
      state.loginCredentials = {
        ...state.loginCredentials,
        ...action.payload,
      }
    },
    setRememberMe: (state, action) => {
      state.rememberMe = action.payload
    },
    setLoginMessage: (state, action) => {
      state.loginMessage = action.payload
    },
    setErrors: (state, action) => {
      state.errors = action.payload
    },
    clearErrors: (state) => {
      state.errors = {}
    },
    loginSuccess: (state, action) => {
      state.currentUser = action.payload
      state.isLoggedIn = true
      state.loginMessage = { type: "success", text: "Đăng nhập thành công!" }
      state.errors = {}
    },
    logout: (state) => {
      console.log("Logout reducer running");
      localStorage.removeItem("loginSession");
      state.currentUser = null;
      state.isLoggedIn = false;
    },
    loadRememberedUser: (state, action) => {
      if (action.payload) {
        state.loginCredentials = {
          ...state.loginCredentials,
          username: action.payload.username,
        }
        state.rememberMe = true
      }
    },
  },
  loginSuccess: (state, action) => {
    state.currentUser = action.payload
    state.isLoggedIn = true
    state.loginMessage = { type: "success", text: "Đăng nhập thành công!" }
    state.errors = {}

    toast.success("Đăng nhập thành công!", {
      position: "bottom-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  },
})

export const {
  setLoginCredentials,
  setRememberMe,
  setLoginMessage,
  setErrors,
  clearErrors,
  loginSuccess,
  logout,
  loadRememberedUser,
} = authSlice.actions

export default authSlice.reducer