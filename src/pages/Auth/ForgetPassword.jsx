import { Mail, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import halongbayImg from "../../assets/images/Hero/halongbay.png"
import { setEmail, setError, clearError, sendResetLinkSuccess } from "./forgotPasswordSlice"
import { forgotPasswordEmailSelector, forgotPasswordErrorSelector, emailSentSelector } from "../../redux/selectors"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useEffect } from "react"

const ForgetPassword = () => {
  const dispatch = useDispatch()

  const email = useSelector(forgotPasswordEmailSelector)
  const error = useSelector(forgotPasswordErrorSelector)
  const emailSent = useSelector(emailSentSelector)

  // ADDED: Show toast when error changes
  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      })
    }
  }, [error])

  // ADDED: Show toast when email is sent
  useEffect(() => {
    if (emailSent) {
      toast.success("Chúng tôi đã gửi liên kết đặt lại mật khẩu đến địa chỉ email của bạn.", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      })
    }
  }, [emailSent])

  const validateEmail = () => {
    dispatch(clearError())

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email.trim()) {
      dispatch(setError("Email không được để trống"))
      return false
    } else if (!emailRegex.test(email)) {
      dispatch(setError("Email không hợp lệ"))
      return false
    }

    // Check if email exists in users
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const userExists = users.some((user) => user.email === email)

    if (!userExists) {
      dispatch(setError("Email không tồn tại trong hệ thống"))
      return false
    }

    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateEmail()) {
      // In a real application, you would send an email here
      // For this demo, we'll just simulate it
      dispatch(sendResetLinkSuccess())
    }
  }

  const handleEmailChange = (e) => {
    dispatch(setEmail(e.target.value))
  }

  const handleResendEmail = () => {
    // ADDED: Show toast when resending email
    toast.info("Đang gửi lại email...", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    })

    setTimeout(() => {
      toast.success("Đã gửi lại email thành công!", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      })
    }, 1000)
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src={halongbayImg || "/placeholder.svg"} alt="Travel background" className="object-cover w-full h-full" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Forgot Password Form */}
      <div className="relative z-10 w-full max-w-md p-8 mx-4 rounded-lg backdrop-blur-sm bg-white/20">
        <Link to="/auth" className="inline-flex items-center text-gray-700 hover:text-gray-900 mb-6">
          <ArrowLeft size={16} className="mr-2" />
          Quay lại đăng nhập
        </Link>

        <h1 className="text-3xl font-semibold text-center mb-4 text-gray-800">Quên mật khẩu</h1>
        <p className="text-center text-gray-700 mb-8">
          {emailSent
            ? "Kiểm tra email của bạn để biết liên kết đặt lại"
            : "Nhập email của bạn và chúng tôi sẽ gửi cho bạn một liên kết để đặt lại mật khẩu"}
        </p>

        {!emailSent ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Địa chỉ Email"
                className={`w-full p-3 pl-4 pr-10 rounded-md bg-white/70 border ${
                  error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-gray-400"
                } focus:outline-none focus:ring-2`}
              />
              <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
              {/* REMOVED: Error message is now shown as toast */}
              {/* {error && <p className="text-red-500 text-sm mt-1">{error}</p>} */}
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-full transition duration-200"
            >
              Gửi liên kết đặt lại
            </button>
          </form>
        ) : (
          <div className="text-center">
            {/* REMOVED: Success message is now shown as toast */}
            {/* <div className="bg-green-100 text-green-800 p-4 rounded-md mb-6">
              Chúng tôi đã gửi liên kết đặt lại mật khẩu đến địa chỉ email của bạn.
            </div> */}
            <button
              onClick={handleResendEmail}
              className="w-full py-3 px-4 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-full transition duration-200"
            >
              Gửi lại Email
            </button>
          </div>
        )}
      </div>

      {/* ADDED: Toast container */}
      <ToastContainer />
    </div>
  )
}

export default ForgetPassword