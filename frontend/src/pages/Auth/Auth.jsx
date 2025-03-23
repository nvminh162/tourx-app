import { useState, useEffect } from "react"
import { Eye, EyeOff, User } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import halongbayImg from "../../assets/images/Hero/halongbay.png"
import {
  setLoginCredentials,
  setRememberMe,
  setLoginMessage,
  setErrors,
  loginSuccess,
  loadRememberedUser,
} from "./authSlice"
import {
  loginMessageSelector,
  authErrorsSelector,
  rememberMeSelector,
  loginCredentialsSelector,
} from "../../redux/selectors"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { loginUser } from '../../services/userService';
import { setIsSubmitting } from "./signupSlice"


const Auth = () => {
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const loginMessage = useSelector(loginMessageSelector)
  const errors = useSelector(authErrorsSelector)
  const rememberMe = useSelector(rememberMeSelector)
  const loginCredentials = useSelector(loginCredentialsSelector)
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

  // ADDED: Show toast when loginMessage changes
  useEffect(() => {
    if (loginMessage.text) {
      if (loginMessage.type === "error") {
        toast.error(loginMessage.text, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        })
      } else if (loginMessage.type === "success" && isLoggedIn) {
        toast.success(loginMessage.text, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        })
      }
    }
  }, [loginMessage, isLoggedIn])

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleChange = (e) => {
    const { id, value } = e.target
    dispatch(
      setLoginCredentials({
        [id]: value,
      }),
    )

    // Clear error when user types
    if (errors[id]) {
      dispatch(
        setErrors({
          ...errors,
          [id]: "",
        }),
      )
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!loginCredentials.username?.trim()) {
      newErrors.username = "Tên người dùng không được để trống"
    }

    if (!loginCredentials.password) {
      newErrors.password = "Mật khẩu không được để trống"
    } else if (loginCredentials.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự"
    }

    dispatch(setErrors(newErrors))
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoginMessage({ type: "", text: "" }));

    if (validateForm()) {
      try {
        dispatch(setIsSubmitting(true));

        // Login using the userService
        const userSession = await loginUser({
          username: loginCredentials.username,
          password: loginCredentials.password
        });

        // Save remember me preference
        if (rememberMe) {
          localStorage.setItem(
            "rememberedUser",
            JSON.stringify({
              username: loginCredentials.username,
              rememberMe: true,
            })
          );
        } else {
          localStorage.removeItem("rememberedUser");
        }

        // Update Redux store
        dispatch(loginSuccess({
          id: userSession.id,
          fullname: userSession.fullname,
          username: userSession.username,
          email: userSession.email,
          isLoggedIn: true
        }));

        setTimeout(() => {
          navigate("/");
        }, 1500);
      } catch (error) {
        // Keep the error toast message
        dispatch(setLoginMessage({
          type: "error",
          text: error.message || "Đăng nhập thất bại. Vui lòng kiểm tra thông tin đăng nhập."
        }));
      } finally {
        dispatch(setIsSubmitting(false));
      }
    }
  };

  // Check for remembered user on component mount
  useEffect(() => {
    const rememberedUser = JSON.parse(localStorage.getItem("rememberedUser") || "null")
    if (rememberedUser) {
      dispatch(loadRememberedUser(rememberedUser))
    }

    // Check if user is already logged in
    const currentUser = JSON.parse(localStorage.getItem("loginSession") || "null")
    if (currentUser && currentUser.isLoggedIn) {
      dispatch(loginSuccess(currentUser))
      navigate("/")
    }
  }, [dispatch, navigate])

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src={halongbayImg || "/placeholder.svg"} alt="Travel background" className="object-cover w-full h-full" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Login Form */}
      <div className="relative z-10 w-full max-w-md p-8 mx-4 rounded-lg backdrop-blur-sm bg-white/20">
        <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">LOGIN</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              id="username"
              value={loginCredentials.username || ""}
              onChange={handleChange}
              placeholder="Tên người dùng hoặc số điện thoại"
              className={`w-full p-3 pl-4 pr-10 rounded-md bg-white/70 border ${errors.username ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-gray-400"
                } focus:outline-none focus:ring-2`}
            />
            <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={loginCredentials.password || ""}
              onChange={handleChange}
              placeholder="Mật khẩu"
              className={`w-full p-3 pl-4 pr-10 rounded-md bg-white/70 border ${errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-gray-400"
                } focus:outline-none focus:ring-2`}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={() => dispatch(setRememberMe(!rememberMe))}
                className="w-4 h-4 border-gray-300 rounded focus:ring-gray-500"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                Nhớ mật khẩu
              </label>
            </div>
            <Link to="/forgot-password" className="text-sm text-gray-700 hover:underline">
              Quên mật khẩu?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-full transition duration-200"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-700">OR</p>
          <p className="mt-6 text-gray-700">
            Không có đăng nhập tài khoản?{" "}
            <Link to="/signup" className="font-medium hover:underline">
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>

      {/* ADDED: Toast container */}
      <ToastContainer />
    </div>
  )
}

export default Auth