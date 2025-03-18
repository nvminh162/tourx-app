"use client"

import { useState } from "react"
import { X, Minus, Plus, ArrowRight } from "lucide-react"

const CruiseRoom = () => {
  const [rooms, setRooms] = useState([
    {
      id: "delta-suite",
      name: "Phòng Delta Suite",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=150&auto=format&fit=crop",
      size: 33,
      beds: 2,
      price: 4150000,
      quantity: 0,
    },
    {
      id: "ocean-suite",
      name: "Phòng Ocean Suite",
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=150&auto=format&fit=crop",
      size: 33,
      beds: 2,
      price: 4370000,
      quantity: 0,
    },
    {
      id: "captain-suite",
      name: "Phòng Captain Suite",
      image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=150&auto=format&fit=crop",
      size: 38,
      beds: 2,
      price: 4620000,
      quantity: 0,
    },
    {
      id: "regal-suite",
      name: "Phòng Regal Suite",
      image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=150&auto=format&fit=crop",
      size: 46,
      beds: 2,
      price: 4870000,
      quantity: 0,
    },
  ])

  const [showModal, setShowModal] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    date: "",
    note: "",
  })

  // Form errors state
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    date: "",
  })

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 0) return

    setRooms(rooms.map((room) => (room.id === id ? { ...room, quantity: newQuantity } : room)))
  }

  const clearSelection = () => {
    setRooms(rooms.map((room) => ({ ...room, quantity: 0 })))
  }

  const totalPrice = rooms.reduce((sum, room) => sum + room.price * room.quantity, 0)

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price)
  }

  const formatDisplayDate = (dateString) => {
    if (!dateString) return ""

    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) return ""

      const day = date.getDate().toString().padStart(2, "0")
      const month = (date.getMonth() + 1).toString().padStart(2, "0")
      const year = date.getFullYear()

      return `${day}/${month}/${year}`
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      return ""
    }
  }

  const parseDateInput = (dateString) => {
    if (!dateString) return ""

    // Check if the input matches DD/MM/YYYY format
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/
    const match = dateString.match(regex)

    if (!match) return ""

    const day = match[1]
    const month = match[2]
    const year = match[3]

    // Validate date parts
    const numYear = Number.parseInt(year, 10)
    const numMonth = Number.parseInt(month, 10) - 1 // JS months are 0-indexed
    const numDay = Number.parseInt(day, 10)

    const date = new Date(numYear, numMonth, numDay)

    // Check if date is valid
    if (date.getFullYear() !== numYear || date.getMonth() !== numMonth || date.getDate() !== numDay) {
      return ""
    }

    // Return in YYYY-MM-DD format for the input value
    return `${year}-${month}-${day}`
  }

  const handleDateInputChange = (value) => {
    // Allow typing with slashes
    let formattedValue = value.replace(/[^\d/]/g, "")

    // Auto-add slashes
    if (formattedValue.length === 2 && !formattedValue.includes("/") && !formData.date.includes("/")) {
      formattedValue += "/"
    } else if (formattedValue.length === 5 && formattedValue.charAt(2) === "/" && !formattedValue.includes("/", 3)) {
      formattedValue += "/"
    }

    // Update the display value
    const dateValue = parseDateInput(formattedValue)

    setFormData({
      ...formData,
      date: dateValue || formattedValue,
    })

    // Clear error when user types
    if (errors.date) {
      setErrors({
        ...errors,
        date: "",
      })
    }
  }

  const openBookingModal = () => {
    setShowModal(true)
    // Reset form data and errors when opening modal
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      date: "",
      note: "",
    })
    setErrors({
      fullName: "",
      email: "",
      phone: "",
      date: "",
    })
    setSubmitSuccess(false)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData({
      ...formData,
      [id]: value,
    })

    // Clear error when user types
    if (errors[id]) {
      setErrors({
        ...errors,
        [id]: "",
      })
    }
  }

  // Validate form
  const validateForm = () => {
    let isValid = true
    const newErrors = { ...errors }

    // Validate full name
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Vui lòng nhập họ và tên"
      isValid = false
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Họ và tên phải có ít nhất 2 ký tự"
      isValid = false
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email"
      isValid = false
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email không hợp lệ"
      isValid = false
    }

    // Validate phone number (Vietnamese format)
    const phoneRegex = /^(0|\+84)(\d{9,10})$/
    if (!formData.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại"
      isValid = false
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ"
      isValid = false
    }

    // Validate date
    if (!formData.date) {
      newErrors.date = "Vui lòng chọn ngày đi"
      isValid = false
    } else {
      // Check if it's a valid date string in YYYY-MM-DD format
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/
      if (!dateRegex.test(formData.date)) {
        // If it's not in YYYY-MM-DD format, check if it's in DD/MM/YYYY format
        const displayDateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/
        if (!displayDateRegex.test(formData.date)) {
          newErrors.date = "Định dạng ngày không hợp lệ (DD/MM/YYYY)"
          isValid = false
        } else {
          // Convert to YYYY-MM-DD for validation
          const parts = formData.date.split("/")
          const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`
          const selectedDate = new Date(formattedDate)
          const today = new Date()
          today.setHours(0, 0, 0, 0)

          if (isNaN(selectedDate.getTime())) {
            newErrors.date = "Ngày không hợp lệ"
            isValid = false
          } else if (selectedDate < today) {
            newErrors.date = "Ngày đi phải là ngày trong tương lai"
            isValid = false
          } else {
            // Update the formData with the correct format
            setFormData({
              ...formData,
              date: formattedDate,
            })
          }
        }
      } else {
        const selectedDate = new Date(formData.date)
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        if (isNaN(selectedDate.getTime())) {
          newErrors.date = "Ngày không hợp lệ"
          isValid = false
        } else if (selectedDate < today) {
          newErrors.date = "Ngày đi phải là ngày trong tương lai"
          isValid = false
        }
      }
    }

    setErrors(newErrors)
    return isValid
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Show success message
        setSubmitSuccess(true)
        setIsSubmitting(false)

        // Reset form after 2 seconds and close modal
        setTimeout(() => {
          closeModal()
        }, 2000)
      } catch (error) {
        console.error("Error submitting form:", error)
        setIsSubmitting(false)
      }
    }
  }

  return (
    <div className="container lg:w-6xl place-self-center px-5 lg:px-0 mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Các loại phòng & giá</h2>

      {/* Decorative wave pattern */}
      <div className="flex mb-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="w-3 h-3 text-teal-400">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2 12C2 12 5 8 12 8C19 8 22 12 22 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 rounded-xl p-6 relative">
        {/* Clear selection button */}
        <button
          onClick={clearSelection}
          className="absolute right-6 top-6 bg-white text-gray-600 text-sm py-2 px-3 rounded-full flex items-center gap-1 hover:bg-gray-100 transition-colors"
        >
          <X className="w-4 h-4" />
          <span>Xoá lựa chọn</span>
        </button>

        {/* Room list */}
        <div className="space-y-4 mt-8">
          {rooms.map((room) => (
            <div key={room.id} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={room.image || "/placeholder.svg"}
                    alt={room.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />

                  <div>
                    <a href="#" className="text-gray-800 font-medium hover:text-teal-600 transition-colors">
                      {room.name}
                    </a>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
                          <path d="M2 10H22" stroke="currentColor" strokeWidth="2" />
                        </svg>
                        <span>{room.size} m²</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="2" y="8" width="20" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
                          <path d="M2 13H22" stroke="currentColor" strokeWidth="2" />
                        </svg>
                        <span>Tối đa: {room.beds} 🛏️</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 w-full md:w-auto">
                  <div className="text-teal-700 font-bold">
                    {formatPrice(room.price)} đ<div className="text-xs font-normal text-gray-500">/KHÁCH</div>
                  </div>

                  <div className="flex items-center gap-2 ml-auto md:ml-0">
                    <button
                      onClick={() => updateQuantity(room.id, room.quantity - 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>

                    <input
                      type="number"
                      value={room.quantity}
                      onChange={(e) => updateQuantity(room.id, Number.parseInt(e.target.value) || 0)}
                      className="w-10 text-center border-none focus:ring-0 bg-transparent"
                      min="0"
                    />

                    <button
                      onClick={() => updateQuantity(room.id, room.quantity + 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total and booking section */}
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200">
          <div>
            <div className="text-gray-600">Tổng tiền</div>
            <div className="text-xl font-bold text-gray-800">{formatPrice(totalPrice)} đ</div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={openBookingModal}
              className="text-gray-700 hover:text-teal-600 font-medium transition-colors"
            >
              Thuê trọn tàu
            </button>
            <button className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-full flex items-center gap-2 transition-colors">
              <span>Đặt ngay</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal for "Thuê trọn tàu" */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Thuê trọn tàu</h3>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="p-4">
                {submitSuccess ? (
                  <div className="bg-green-50 text-green-700 p-4 rounded-md mb-4 flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Yêu cầu của bạn đã được gửi thành công!</span>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                        Họ và tên <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border ${errors.fullName ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500`}
                        placeholder="Nhập họ và tên của bạn"
                      />
                      {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500`}
                        placeholder="Nhập email của bạn"
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Số điện thoại <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border ${errors.phone ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500`}
                        placeholder="Nhập số điện thoại của bạn"
                      />
                      {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                    </div>

                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                        Ngày đi <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="date"
                          value={formData.date ? formatDisplayDate(formData.date) : ""}
                          onChange={(e) => handleDateInputChange(e.target.value)}
                          className={`w-full px-3 py-2 border ${errors.date ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500`}
                          placeholder="DD/MM/YYYY"
                          maxLength={10}
                        />
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                          <input
                            type="date"
                            className="sr-only"
                            onChange={(e) => {
                              if (e.target.value) {
                                setFormData({
                                  ...formData,
                                  date: e.target.value,
                                })
                                // Clear error when date is selected
                                if (errors.date) {
                                  setErrors({
                                    ...errors,
                                    date: "",
                                  })
                                }
                              }
                            }}
                            onFocus={(e) => e.target.showPicker()}
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault()
                              const dateInput = e.currentTarget.previousSibling
                              dateInput.showPicker()
                            }}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                      {errors.date && <p className="mt-1 text-sm text-red-500">{errors.date}</p>}
                    </div>

                    <div>
                      <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">
                        Ghi chú
                      </label>
                      <textarea
                        id="note"
                        rows={3}
                        value={formData.note}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Nhập yêu cầu đặc biệt (nếu có)"
                      ></textarea>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 border-t flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md mr-2"
                >
                  Huỷ
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || submitSuccess}
                  className={`px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-md flex items-center ${isSubmitting || submitSuccess ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Đang gửi...
                    </>
                  ) : submitSuccess ? (
                    "Đã gửi"
                  ) : (
                    "Gửi yêu cầu"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default CruiseRoom

