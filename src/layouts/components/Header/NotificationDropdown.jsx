import { useState, useRef, useEffect } from "react"
import Badge from "@mui/material/Badge"
import Button from "../../../components/Button"
import notificationsJson from "../../../data/mocks/Notifications/notifications.json"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBell } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import config from "../../../config"

export default function NotificationDropdown() {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    const getIconForType = (type) => {
        switch (type) {
            case "message":
                return (
                    <svg
                        className="w-2 h-2 text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 18 18"
                    >
                        <path d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z" />
                        <path d="M4.439 9a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239Z" />
                    </svg>
                )
            case "follow":
                return (
                    <svg
                        className="w-2 h-2 text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 18"
                    >
                        <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-2V5a1 1 0 0 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 0 0 2 0V9h2a1 1 0 1 0 0-2Z" />
                    </svg>
                )
            case "like":
                return (
                    <svg
                        className="w-2 h-2 text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 18"
                    >
                        <path d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z" />
                    </svg>
                )
            case "mention":
                return (
                    <svg
                        className="w-2 h-2 text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 18"
                    >
                        <path d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z" />
                    </svg>
                )
            case "video":
                return (
                    <svg
                        className="w-2 h-2 text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 14"
                    >
                        <path d="M11 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm8.585 1.189a.994.994 0 0 0-.9-.138l-2.965.983a1 1 0 0 0-.685.949v8a1 1 0 0 0 .675.946l2.965 1.02a1.013 1.013 0 0 0 1.032-.242A1 1 0 0 0 20 12V2a1 1 0 0 0-.415-.811Z" />
                    </svg>
                )
            default:
                return null
        }
    }

    const getNotificationContent = (notification) => {
        switch (notification.type) {
            case "message":
                return (
                    <div className="text-gray-600 text-sm mb-1.5">
                        Tin nhắn mới từ <span className="font-semibold text-gray-800">{notification.user.name}</span>:{" "}
                        {notification.content}
                    </div>
                )
            case "follow":
                return (
                    <div className="text-gray-600 text-sm mb-1.5">
                        <span className="font-semibold text-gray-800">{notification.user.name}</span> and{" "}
                        <span className="font-medium text-gray-800">{notification.count} người khác</span> đã theo dõi bạn.
                    </div>
                )
            case "like":
                return (
                    <div className="text-gray-600 text-sm mb-1.5">
                        <span className="font-semibold text-gray-800">{notification.user.name}</span> and{" "}
                        <span className="font-medium text-gray-800">{notification.count} người khác</span> yêu thích tin của bạn. Hãy chia sẻ thêm khoảnh khắc của bạn đến mọi người.
                    </div>
                )
            case "mention":
                return (
                    <div className="text-gray-600 text-sm mb-1.5">
                        <span className="font-semibold text-gray-800">{notification.user.name}</span> đã nhắc đến bạn trong một bình luận:{" "}
                        <span className="font-medium text-blue-600">@{notification.mention}</span> {notification.content}
                    </div>
                )
            case "video":
                return (
                    <div className="text-gray-600 text-sm mb-1.5">
                        <span className="font-semibold text-gray-800">{notification.user.name}</span> đã đăng một video mới:{" "}
                        {notification.content}
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <Button
                className="text-2xl rounded-full cursor-pointer h-13 w-13 focus:text-primary-base"
                onClick={toggleDropdown}
                variant="ghost"
            >
                <Badge badgeContent={100} color="error">
                    <FontAwesomeIcon icon={faBell} shake />
                </Badge>
            </Button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 z-20 w-80 mt-2 bg-white divide-y divide-gray-200 rounded-lg shadow-lg border border-gray-200">
                    <div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50">
                        Thông báo
                    </div>
                    <div className="divide-y divide-gray-200 max-h-[400px] overflow-y-auto">
                        {notificationsJson.map((notification) => (
                            <a href="#" key={notification.id} className="flex px-4 py-3 hover:bg-gray-50" onClick={toggleDropdown}>
                                <div className="shrink-0 relative">
                                    <img
                                        className="rounded-full w-11 h-11"
                                        src={notification.user.avatar}
                                        alt={`${notification.user.name} avatar`}
                                    />
                                    <div
                                        className={`absolute flex items-center justify-center w-5 h-5 ms-6 -mt-5 ${notification.iconColor} border border-white rounded-full`}
                                    >
                                        {getIconForType(notification.type)}
                                    </div>
                                </div>
                                <div className="w-full ps-3">
                                    {getNotificationContent(notification)}
                                    <div className="text-xs text-blue-600">{notification.timestamp}</div>
                                </div>
                            </a>
                        ))}
                    </div>
                    <Link
                        to={config.routes.home}
                        onClick={toggleDropdown}
                        className="block py-2 text-sm font-medium text-center text-gray-700 rounded-b-lg bg-gray-50 hover:bg-gray-100"
                    >
                        <div className="inline-flex items-center">
                            <svg
                                className="w-4 h-4 me-2 text-gray-500"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 14"
                            >
                                <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                            </svg>
                            Xem tất cả
                        </div>
                    </Link>
                </div>
            )}
        </div>
    )
}