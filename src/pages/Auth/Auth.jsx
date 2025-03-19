import { useState, useEffect } from "react"
import { Eye, EyeOff, User } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import halongbayImg from "../../assets/images/Hero/halongbay.png"

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [errors, setErrors] = useState({})
  const [loginMessage, setLoginMessage] = useState({ type: "", text: "" })
  const navigate = useNavigate()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

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

    if (!formData.username.trim()) {
      newErrors.username = "Tên người dùng không được để trống"
    }

    if (!formData.password) {
      newErrors.password = "Mật khẩu không được để trống"
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoginMessage({ type: "", text: "" })

    if (validateForm()) {
      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]")

      // Find user by username or phone
      const user = users.find(
        (u) => u.username === formData.username || u.phone === formData.username || u.email === formData.username,
      )

      if (!user) {
        setLoginMessage({
          type: "error",
          text: "Tài khoản không tồn tại",
        })
        return
      }

      // Check password
      if (user.password !== formData.password) {
        setLoginMessage({
          type: "error",
          text: "Mật khẩu không chính xác",
        })
        return
      }

      // Login successful
      const currentUser = {
        id: user.id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        isLoggedIn: true,
      }

      // Save current user to localStorage
      localStorage.setItem("loginSession", JSON.stringify(currentUser))

      // Save to remember me if checked
      if (rememberMe) {
        localStorage.setItem(
          "rememberedUser",
          JSON.stringify({
            username: formData.username,
            rememberMe: true,
          }),
        )
      } else {
        localStorage.removeItem("rememberedUser")
      }

      setLoginMessage({
        type: "success",
        text: "Đăng nhập thành công!",
      })

      // Redirect to home page after successful login
      setTimeout(() => {
        navigate("/")
      }, 1500)
    }
  }

  // Check for remembered user on component mount
  useEffect(() => {
    const rememberedUser = JSON.parse(localStorage.getItem("rememberedUser") || "null")
    if (rememberedUser) {
      setFormData((prev) => ({
        ...prev,
        username: rememberedUser.username || "",
      }))
      setRememberMe(true)
    }

    // Check if user is already logged in
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null")
    if (currentUser && currentUser.isLoggedIn) {
      navigate("/")
    }
  }, [navigate])

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

        {loginMessage.text && (
          <div
            className={`mb-4 p-3 rounded-md ${
              loginMessage.type === "error"
                ? "bg-red-100 text-red-700 border border-red-200"
                : "bg-green-100 text-green-700 border border-green-200"
            }`}
          >
            {loginMessage.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Tên người dùng hoặc số điện thoại"
              className={`w-full p-3 pl-4 pr-10 rounded-md bg-white/70 border ${
                errors.username ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-gray-400"
              } focus:outline-none focus:ring-2`}
            />
            <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
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

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
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
    </div>
  )
}

export default Auth