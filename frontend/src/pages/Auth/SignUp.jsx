import { useEffect, useState } from "react"
import { Eye, EyeOff, User, Mail } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import halongbayImg from "../../assets/images/Hero/halongbay.png"
import { setFormField, setErrors, clearErrors, setIsSubmitting, signupSuccess } from "./signupSlice"
import {
  signupFormDataSelector,
  signupErrorsSelector,
  signupMessageSelector,
  isSubmittingSelector,
} from "../../redux/selectors"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"


const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const formData = useSelector(signupFormDataSelector)
  const errors = useSelector(signupErrorsSelector)
  const signupMessage = useSelector(signupMessageSelector)
  const isSubmitting = useSelector(isSubmittingSelector)

  // ADDED: Show toast when signupMessage changes
  useEffect(() => {
    if (signupMessage.text) {
      if (signupMessage.type === "error") {
        toast.error(signupMessage.text, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        })
      } else if (signupMessage.type === "success") {
        toast.success(signupMessage.text, {
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
  }, [signupMessage])

  const togglePasswordVisibility = () => setShowPassword(!showPassword)
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword)

  const handleChange = (e) => {
    const { id, value } = e.target
    dispatch(setFormField({ field: id, value }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.fullname?.trim()) {
      newErrors.fullname = "Tên đầy đủ không được để trống"
    }

    if (!formData.username?.trim()) {
      newErrors.username = "Tên người dùng không được để trống"
    }

    if (!formData.email?.trim()) {
      newErrors.email = "Email không được để trống"
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Email không hợp lệ"
      }
    }

    if (!formData.password) {
      newErrors.password = "Mật khẩu không được để trống"
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu không khớp"
    }

    dispatch(setErrors(newErrors))
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(setIsSubmitting(true))
    dispatch(clearErrors())

    if (validateForm()) {
      // Get existing users
      const users = JSON.parse(localStorage.getItem("users") || "[]")

      // Check if username or email already exists
      const usernameExists = users.some((user) => user.username === formData.username)
      const emailExists = users.some((user) => user.email === formData.email)

      if (usernameExists) {
        dispatch(setErrors({ username: "Tên người dùng đã tồn tại" }))
        dispatch(setIsSubmitting(false))
        // ADDED: Show toast for username exists error
        toast.error("Tên người dùng đã tồn tại", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        })
        return
      }

      if (emailExists) {
        dispatch(setErrors({ email: "Email đã tồn tại" }))
        dispatch(setIsSubmitting(false))
        // ADDED: Show toast for email exists error
        toast.error("Email đã tồn tại", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        })
        return
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        fullname: formData.fullname,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      }

      // Add to users array
      users.push(newUser)
      localStorage.setItem("users", JSON.stringify(users))

      dispatch(signupSuccess())

      // Redirect to login page after successful signup
      setTimeout(() => {
        navigate("/auth")
      }, 2000)
    } else {
      dispatch(setIsSubmitting(false))
    }
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src={halongbayImg || "/placeholder.svg"} alt="Travel background" className="object-cover w-full h-full" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Signup Form */}
      <div className="relative z-10 w-full max-w-md p-8 mx-4 rounded-lg backdrop-blur-sm bg-white/20">
        <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">ĐĂNG KÝ</h1>

        {/* REMOVED: Message block is replaced with toast notifications */}
        {/* {signupMessage.text && (
                    <div
                        className={`mb-4 p-3 rounded-md ${
                            signupMessage.type === "error"
                                ? "bg-red-100 text-red-700 border border-red-200"
                                : "bg-green-100 text-green-700 border border-green-200"
                        }`}
                    >
                        {signupMessage.text}
                    </div>
                )} */}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <input
              type="text"
              id="fullname"
              value={formData.fullname || ""}
              onChange={handleChange}
              placeholder="Tên đầy đủ"
              className={`w-full p-3 pl-4 pr-10 rounded-md bg-white/70 border ${errors.fullname ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-gray-400"
                } focus:outline-none focus:ring-2`}
            />
            <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            {errors.fullname && <p className="text-red-500 text-sm mt-1">{errors.fullname}</p>}
          </div>

          <div className="relative">
            <input
              type="text"
              id="username"
              value={formData.username || ""}
              onChange={handleChange}
              placeholder="Tên người dùng hoặc số diện thoại"
              className={`w-full p-3 pl-4 pr-10 rounded-md bg-white/70 border ${errors.username ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-gray-400"
                } focus:outline-none focus:ring-2`}
            />
            <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>

          <div className="relative">
            <input
              type="email"
              id="email"
              value={formData.email || ""}
              onChange={handleChange}
              placeholder="Email"
              className={`w-full p-3 pl-4 pr-10 rounded-md bg-white/70 border ${errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-gray-400"
                } focus:outline-none focus:ring-2`}
            />
            <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={formData.password || ""}
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

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              value={formData.confirmPassword || ""}
              onChange={handleChange}
              placeholder="Nhập lại mật khẩu"
              className={`w-full p-3 pl-4 pr-10 rounded-md bg-white/70 border ${errors.confirmPassword ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-gray-400"
                } focus:outline-none focus:ring-2`}
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-full transition duration-200 disabled:opacity-70"
          >
            {isSubmitting ? "Đang xử lý..." : "Đăng ký"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-700">
          Bạn đã có tài khoản?{" "}
          <Link to="/auth" className="font-medium hover:underline">
            Đăng nhập
          </Link>
        </p>
      </div>

      {/* ADDED: Toast container */}
      <ToastContainer />
    </div>
  )
}

export default SignUp