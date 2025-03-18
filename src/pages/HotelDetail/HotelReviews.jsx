"use client"

import { useState } from "react"
import { Search, ChevronLeft, ChevronRight, Send } from "lucide-react"

const HotelReviews = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [userRating, setUserRating] = useState(0)
  const [reviewText, setReviewText] = useState("")
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")

  const reviews = [
    {
      id: 1,
      author: "Tran Quoc Viet",
      rating: 4,
      comment: "Phòng sạch sẽ, nhân viên thân thiện",
      date: "07/03/2025",
    },
    {
      id: 2,
      author: "Nguyen Quynh Chi",
      rating: 5,
      comment: "Tuyệt vời, view đẹp",
      date: "02/02/2025",
    },
    {
      id: 3,
      author: "Nguyen Minh Tuan",
      rating: 5,
      comment:
        "Khách sạn rất tốt, dịch vụ chuyên nghiệp. Phòng đẹp, sạch sẽ và thoáng mát. Nhân viên thân thiện và nhiệt tình.",
      date: "01/02/2025",
    },
    {
      id: 4,
      author: "Nguyen Trung Kien",
      rating: 5,
      comment:
        "Trải nghiệm tuyệt vời! Tầm nhìn ra vịnh Hạ Long rất đẹp và thức ăn tại nhà hàng rất ngon. Phòng sạch sẽ, đầy đủ tiện nghi. Đặc biệt là hồ bơi trên tầng thượng thật tuyệt vời. Tôi rất hài lòng với kỳ nghỉ tại đây cùng gia đình. Chúng tôi đã có một kỳ nghỉ tuyệt vời và sẽ quay lại Citadines Marina Hạ Long một lần nữa trong tương lai gần! Tôi cảm ơn tất cả nhân viên.",
      date: "01/02/2025",
    },
    {
      id: 5,
      author: "Tran Doanh",
      rating: 5,
      comment:
        "Khách sạn đẹp, phong cảnh vịnh Hạ Long nhìn từ phòng gần như hoàn hảo. Tôi sẽ nhất trí cho mọi người rằng nên ở khách sạn này một lần.",
      date: "01/02/2025",
    },
  ]

  const totalPages = 3
  const ratingCounts = {
    1: 0,
    2: 0,
    3: 0,
    4: 1,
    5: 11,
  }

  const averageRating = 4.92

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
  }

  const handleRatingClick = (rating) => {
    setUserRating(rating)
  }

  const handleSubmitReview = (e) => {
    e.preventDefault()
    // Here you would typically send the review to your backend
    alert("Cảm ơn bạn đã gửi đánh giá!")
    // Reset form
    setUserRating(0)
    setReviewText("")
    setUserName("")
    setUserEmail("")
  }

  const renderStars = (rating, interactive = false) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <div
            key={star}
            className={`${interactive ? "cursor-pointer" : ""}`}
            onClick={interactive ? () => handleRatingClick(star) : undefined}
          >
            <svg
              className={`w-5 h-5 ${star <= rating ? "text-amber-400" : "text-gray-300"}`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
            </svg>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="container lg:w-6xl place-self-center px-5 lg:px-0 mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Đánh giá (12)</h2>

        <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm đánh giá"
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>

          <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-full text-sm flex items-center justify-center gap-1 transition-colors">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 5V19M5 12H19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Viết đánh giá</span>
          </button>
        </div>
      </div>

      {/* Decorative wave pattern */}
      <div className="flex mb-6">
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

      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold text-amber-500">{averageRating}</div>
            <div className="flex text-amber-400 mt-1">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
              </svg>
            </div>
          </div>

          <div className="flex-1 w-full">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-2 mb-1">
                <div className="w-10 text-sm text-gray-600">{star} sao</div>
                <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-amber-400 h-full rounded-full"
                    style={{ width: `${(ratingCounts[star] / 12) * 100}%` }}
                  ></div>
                </div>
                <div className="w-20 text-sm text-gray-600 text-right">{ratingCounts[star]} Đánh giá</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews list */}
      <div className="space-y-4 mb-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex flex-col">
              <div className="flex mb-2">{renderStars(review.rating)}</div>

              <div className="font-medium text-gray-800 mb-1">{review.author}</div>

              <div className="text-sm text-gray-500 mb-3">{review.date}</div>

              <p className="text-gray-600">{review.comment}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mb-8">
        <div className="text-sm text-gray-600">
          Đang xem: <span className="font-medium">{currentPage}</span> / {totalPages}
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-2 rounded-md ${currentPage === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:bg-gray-100"}`}
            aria-label="Previous page"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {[1, 2, 3].map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-8 h-8 rounded-md flex items-center justify-center ${
                currentPage === page ? "bg-primary-light text-white" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-md ${currentPage === totalPages ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:bg-gray-100"}`}
            aria-label="Next page"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Review form */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Viết đánh giá</h3>

        <form onSubmit={handleSubmitReview}>
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-2">Chọn rating</label>
            <div className="flex gap-2">{renderStars(userRating, true)}</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Họ và tên *</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Nhập họ và tên"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Địa chỉ email *</label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="Nhập email"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-2">Đánh giá của bạn *</label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Nhập nội dung đánh giá"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent min-h-[100px]"
              required
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-full flex items-center gap-2 transition-colors"
            >
              <span>Gửi</span>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default HotelReviews

