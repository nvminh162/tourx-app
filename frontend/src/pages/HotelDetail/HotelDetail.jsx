import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Star, MapPin, ChevronLeft, ChevronRight } from "lucide-react"

import HotelFeatures from "./HotelFeatures"
import HotelRoom from "./HotelRoom"
import HotelIntroduce from "./HotelIntroduce"
import HotelReviews from "./HotelReviews"
import SectionHeader from "../../components/SectionHeader/SectionHeader"
import serviceHotel from "../../data/mocks/Services/hotels.json"

const HotelDetail = () => {
  const navigate = useNavigate()
  const { hotelSlug } = useParams()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.858237982653!2d106.68427047522368!3d10.822158889329383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174deb3ef536f31%3A0x8b7bb8b7c956157b!2sIndustrial%20University%20of%20Ho%20Chi%20Minh%20City!5e0!3m2!1sen!2s!4v1741966573439!5m2!1sen!2s"

  const hotel = serviceHotel.find((item) => item.to === `/${hotelSlug}`)

  useEffect(() => {
    if (!hotel) {
      navigate("/404", { replace: true })
    }
  }, [hotel, navigate])

  if (!hotel) return null

  const { images, name, price, location, rating } = hotel

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  const goToImage = (index) => {
    setCurrentImageIndex(index)
  }

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="space-y-20 py-20">
      <div>
        <div className="flex flex-col lg:flex-row gap-10 justify-between items-start mb-6 pb-20 container lg:w-6xl px-5 lg:px-0 mx-auto">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{name}</h1>
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <div className="bg-amber-100 text-amber-800 rounded-full px-3 py-1 text-sm flex items-center">
                <Star className="w-4 h-4 mr-1 fill-amber-500 text-amber-500" />
                <span className="font-medium">{rating.score}</span>
                <span className="text-gray-600 ml-1">({rating.count} đánh giá)</span>
              </div>

              <div className="flex items-center text-gray-600 text-sm">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{location}</span>
              </div>

              <button onClick={() => scrollToSection("hotel-map")} className="text-teal-500 text-sm hover:underline">
                Xem bản đồ và vị trí
              </button>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="text-teal-700 text-2xl md:text-3xl font-bold text-right">
              {price.toLocaleString("vi-VN")} đ/đêm
            </div>
          </div>
        </div>

        <div className="relative mt-4 mb-8">
          <div className="w-full h-[28rem] md:h-[32rem] overflow-hidden rounded-lg relative">
            <img
              src={images[currentImageIndex] || "/placeholder.svg"}
              alt={`Hình ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`relative rounded-lg overflow-hidden border-2 transition-all ${currentImageIndex === index ? "border-teal-500 scale-105" : "border-transparent opacity-80"}`}
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`Thumbnail ${index + 1}`}
                className="w-16 h-12 md:w-20 md:h-16 object-cover"
              />
            </button>
          ))}
        </div>
      </div>
      <HotelFeatures />
      <HotelRoom />
      <HotelIntroduce />
      <SectionHeader
        id="hotel-map"
        title="Bản đồ và vị trí"
        description="Khách sạn nằm tại vị trí trung tâm, thuận tiện di chuyển"
        className="px-8 py-20"
      >
        <div className="h-96">
          <iframe className="w-full h-full" src={mapUrl} allowFullScreen loading="lazy"></iframe>
        </div>
      </SectionHeader>
      <HotelReviews />
    </div>
  )
}

export default HotelDetail