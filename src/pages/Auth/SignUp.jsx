import { useState } from "react"
import { Eye, EyeOff, User, Mail } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import halongbayImg from "../../assets/images/Hero/halongbay.png"

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState({})
  const [signupMessage, setSignupMessage] = useState({ type: "", text: "" })
  const navigate = useNavigate()

  const togglePasswordVisibility = () => setShowPassword(!showPassword)
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword)

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))

    // Clear error when user types
    if (errors[id]) {
      setErrors((prev) => ({
        ...prev,
        [id]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!formData.fullname.trim()) {
      newErrors.fullname = "Tên đầy đủ không được để trống"
    }

    if (!formData.username.trim()) {
      newErrors.username = "Tên người dùng không được để trống"
    } else if (formData.username.length < 3) {
      newErrors.username = "Tên người dùng phải có ít nhất 3 ký tự"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email không được để trống"
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email không hợp lệ"
    }

    if (!formData.password) {
      newErrors.password = "Mật khẩu không được để trống"
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu nhập lại không khớp"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSignupMessage({ type: "", text: "" })

    if (validateForm()) {
      // Get existing users or initialize empty array
      const users = JSON.parse(localStorage.getItem("users") || "[]")

      // Check if username or email already exists
      const usernameExists = users.some((user) => user.username === formData.username)
      const emailExists = users.some((user) => user.email === formData.email)

      if (usernameExists) {
        setErrors((prev) => ({
          ...prev,
          username: "Tên người dùng đã tồn tại",
        }))
        return
      }

      if (emailExists) {
        setErrors((prev) => ({
          ...prev,
          email: "Email đã được sử dụng",
        }))
        return
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        fullname: formData.fullname,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        createdAt: new Date().toISOString(),
      }

      // Add to users array
      users.push(newUser)

      // Save to localStorage
      localStorage.setItem("users", JSON.stringify(users))

      // Show success message
      setSignupMessage({
        type: "success",
        text: "Đăng ký thành công! Đang chuyển hướng đến trang đăng nhập...",
      })

      // Redirect to login page after successful signup
      setTimeout(() => {
        navigate("/auth")
      }, 2000)
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

        {signupMessage.text && (
          <div
            className={`mb-4 p-3 rounded-md ${
              signupMessage.type === "error"
                ? "bg-red-100 text-red-700 border border-red-200"
                : "bg-green-100 text-green-700 border border-green-200"
            }`}
          >
            {signupMessage.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <input
              type="text"
              id="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="Tên đầy đủ"
              className={`w-full p-3 pl-4 pr-10 rounded-md bg-white/70 border ${
                errors.fullname ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-gray-400"
              } focus:outline-none focus:ring-2`}
            />
            <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            {errors.fullname && <p className="text-red-500 text-sm mt-1">{errors.fullname}</p>}
          </div>

          <div className="relative">
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Tên người dùng hoặc số diện thoại"
              className={`w-full p-3 pl-4 pr-10 rounded-md bg-white/70 border ${
                errors.username ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-gray-400"
              } focus:outline-none focus:ring-2`}
            />
            <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>

          <div className="relative">
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className={`w-full p-3 pl-4 pr-10 rounded-md bg-white/70 border ${
                errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-gray-400"
              } focus:outline-none focus:ring-2`}
            />
            <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Mật khẩu"
              className={`w-full p-3 pl-4 pr-10 rounded-md bg-white/70 border ${
                errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-gray-400"
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
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Nhập lại mật khẩu"
              className={`w-full p-3 pl-4 pr-10 rounded-md bg-white/70 border ${
                errors.confirmPassword ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-gray-400"
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
            className="w-full py-3 px-4 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-full transition duration-200"
          >
            Đăng ký
          </button>
        </form>

        <p className="mt-6 text-center text-gray-700">
          Bạn đã có tài khoản?{" "}
          <Link to="/auth" className="font-medium hover:underline">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp