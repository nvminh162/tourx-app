import { useState, useEffect, useRef } from "react"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import config from "../../../config"
import { getCurrentUser, isLoggedIn } from "../../../utils/auth"
import { logout } from "../../../pages/Auth/authSlice"

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Handle logout with Redux and toast
  const handleLogout = () => {
    // Clear any existing toasts
    toast.dismiss()

    // Remove user from localStorage
    localStorage.removeItem("loginSession")

    // Dispatch Redux logout action
    dispatch(logout())

    setIsOpen(false)
  }

  const currentUser = isLoggedIn() ? getCurrentUser() : null
  const fullName = currentUser?.fullname || "Không xác định"
  const username = currentUser?.username || "Không xác định"

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center rounded-full focus:text-primary-base text-2xl cursor-pointer h-13 w-13"
        type="button"
      >
        {currentUser ? (
          <img
            className="w-8 h-8 rounded-full"
            src="https://avatars.githubusercontent.com/u/121565657?v=4"
            alt="user photo"
          />
        ) : (
          <FontAwesomeIcon icon={faUser} />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-52">
          {currentUser ? (
            <>
              <div className="px-4 py-3 text-sm text-gray-900 text-start">
                <div>Xin chào, {fullName}</div>
                <div className="font-medium truncate">@{username}</div>
              </div>
              <ul className="py-2 text-sm text-gray-700">
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-primary-base hover:text-white">
                    Hồ sơ cá nhân
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-primary-base hover:text-white">
                    Tra cứu đơn đặt
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-primary-base hover:text-white">
                    Lịch sử giao dịch
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-primary-base hover:text-white">
                    Cài đặt
                  </a>
                </li>
              </ul>
              <div className="py-2">
                <Link
                  to={config.routes.auth}
                  onClick={handleLogout} // Use the new handleLogout function
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-primary-base hover:text-white"
                >
                  Đăng xuất
                </Link>
              </div>
            </>
          ) : (
            <div className="p-4">
              <Link
                to={config.routes.auth}
                onClick={() => {
                  handleScrollTop()
                  setIsOpen(false)
                }}
              >
                Đăng nhập
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default UserDropdown