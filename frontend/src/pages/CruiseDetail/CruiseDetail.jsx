import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Star, MapPin, ChevronLeft, ChevronRight, X } from "lucide-react";
import emailjs from '@emailjs/browser';

import CruiseFeatures from "./CruiseFeatures";
import CruiseRoom from "./CruiseRoom";
import CruiseIntroduce from "./CruiseIntroduce";
import CruiseReviews from "./CruiseReviews";
import SectionHeader from "../../components/SectionHeader/SectionHeader";

// Xóa import JSON cứng
// import serviceCruise from "../../data/mocks/Services/cruises.json";
import { getAllCruises, getCruiseById } from '../../services/cruiseService';

const CruiseDetail = () => {
  const navigate = useNavigate();
  const { cruiseSlug } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [cruise, setCruise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.858237982653!2d106.68427047522368!3d10.822158889329383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174deb3ef536f31%3A0x8b7bb8b7c956157b!2sIndustrial%20University%20of%20Ho%20Chi%20Minh%20City!5e0!3m2!1sen!2s!4v1741966573439!5m2!1sen!2s";
  
  // State cho chức năng đặt tàu
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingFormData, setBookingFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: 1,
    bookingDate: ''
  });
  const [bookingErrors, setBookingErrors] = useState({});
  const [bookingLoading, setBookingLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  // Fetch cruise data from API
  useEffect(() => {
    const fetchCruiseData = async () => {
      try {
        setLoading(true);
        const cruises = await getAllCruises();
        const foundCruise = cruises.find(item => item.to === `/${cruiseSlug}`);

        if (foundCruise) {
          setCruise(foundCruise);
        } else {
          // Nếu không tìm thấy theo slug, có thể thử fetch theo ID
          try {
            // Giả sử cruiseSlug có thể là ID
            const cruiseData = await getCruiseById(cruiseSlug);
            if (cruiseData) {
              setCruise(cruiseData);
            } else {
              navigate("/404", { replace: true });
            }
          } catch (err) {
            navigate("/404", { replace: true });
            console.log(err);
          }
        }
      } catch (err) {
        console.error("Error fetching cruise data:", err);
        setError("Không thể tải thông tin du thuyền. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchCruiseData();
  }, [cruiseSlug, navigate]);

  // Validate booking form field
  const validateBookingField = (id, value) => {
    switch (id) {
      case 'name':
        return value.trim() ? '' : 'Vui lòng nhập họ và tên';
      case 'email':
        if (!value.trim()) return 'Vui lòng nhập email';
        return /\S+@\S+\.\S+/.test(value) ? '' : 'Email không hợp lệ';
      case 'phone':
        if (!value.trim()) return 'Vui lòng nhập số điện thoại';
        return /^\d+$/.test(value) ? '' : 'Số điện thoại phải là số';
      case 'guests':
        if (!value) return 'Vui lòng nhập số lượng khách';
        return parseInt(value) > 0 ? '' : 'Số lượng khách phải lớn hơn 0';
      case 'bookingDate':
        return value ? '' : 'Vui lòng chọn ngày đặt tàu';
      default:
        return '';
    }
  };

  // Validate entire booking form
  const validateBookingForm = () => {
    const newErrors = {};
    Object.entries(bookingFormData).forEach(([key, value]) => {
      const error = validateBookingField(key, value);
      if (error) newErrors[key] = error;
    });
    setBookingErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle booking form input change
  const handleBookingChange = (e) => {
    const { id, value } = e.target;
    setBookingFormData(prev => ({ ...prev, [id]: value }));
    
    // Validate field on change
    const error = validateBookingField(id, value);
    setBookingErrors(prev => ({ ...prev, [id]: error }));
  };

  // Handle booking form submission
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateBookingForm()) return;
    
    setBookingLoading(true);
    try {
      // Tính tổng tiền dựa trên số lượng khách
      const totalPrice = bookingFormData.guests * cruise.price;
      
      // Chuẩn bị dữ liệu gửi email
      const emailData = {
        ...bookingFormData,
        cruiseName: cruise.name,
        cruisePrice: cruise.price.toLocaleString('vi-VN'),
        cruiseLocation: cruise.location,
        totalPrice: totalPrice.toLocaleString('vi-VN'),
        subject: `Xác nhận đặt du thuyền ${cruise.name}`
      };
      
      // Gửi email bằng EmailJS
      await emailjs.send(
        import.meta.env.VITE_SERVICE_ID_2,
        import.meta.env.VITE_TEMPLATE_ID_2,
        emailData,
        import.meta.env.VITE_PUBLIC_KEY_2
      );
      
      setFormSuccess(true);
      
      // Sau 3 giây, đóng modal và reset
      setTimeout(() => {
        setIsBookingModalOpen(false);
        setFormSuccess(false);
        setBookingSuccess(true);
        
        // Reset form
        setBookingFormData({
          name: '',
          email: '',
          phone: '',
          guests: 1,
          bookingDate: ''
        });
        
        // Ẩn thông báo thành công sau 3 giây
        setTimeout(() => setBookingSuccess(false), 3000);
      }, 3000);
      
    } catch (error) {
      console.error('Lỗi khi gửi email đặt tàu:', error);
      setBookingErrors({ submit: 'Đã xảy ra lỗi khi gửi thông tin đặt tàu. Vui lòng thử lại sau.' });
    } finally {
      setBookingLoading(false);
    }
  };

  // Đóng modal đặt tàu
  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setFormSuccess(false);
    setBookingErrors({});
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-red-500 text-center">
          <h2 className="text-2xl font-bold mb-2">Có gì đó sai sai?</h2>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-primary-light text-black rounded-md hover:bg-primary-base hover:text-white transition"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  if (!cruise) return null;

  const { images, name, price, location, rating } = cruise;
  const today = new Date().toISOString().split('T')[0]; // Lấy ngày hiện tại

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

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

              <button onClick={() => scrollToSection("cruise-map")} className="text-teal-500 text-sm hover:underline">
                Xem bản đồ và lịch trình
              </button>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="text-teal-700 text-2xl md:text-3xl font-bold text-right">{price.toLocaleString("vi-VN")} đ/khách</div>
            <button 
              onClick={() => setIsBookingModalOpen(true)}
              className="mt-3 bg-teal-600 hover:bg-teal-700 text-white py-2 px-6 rounded-md transition duration-200 flex items-center justify-center w-full"
            >
              Đặt ngay
            </button>
            
            {/* Hiển thị thông báo đặt tàu thành công */}
            {bookingSuccess && (
              <div className="mt-3 bg-green-100 text-green-800 px-4 py-2 rounded-md text-sm">
                Đặt tàu thành công! Thông tin đã được gửi đến email của bạn.
              </div>
            )}
          </div>
        </div>

        <div className="relative mt-4 mb-8">
          <div className="w-full h-[28rem] md:h-[32rem] overflow-hidden rounded-lg relative">
            <img src={images[currentImageIndex]} alt={`Hình ${currentImageIndex + 1}`} className="w-full h-full object-cover" />
          </div>
          <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100">
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100">
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {images.map((image, index) => (
            <button key={index} onClick={() => goToImage(index)} className={`relative rounded-lg overflow-hidden border-2 transition-all ${currentImageIndex === index ? "border-teal-500 scale-105" : "border-transparent opacity-80"}`}>
              <img src={image} alt={`Thumbnail ${index + 1}`} className="w-16 h-12 md:w-20 md:h-16 object-cover" />
            </button>
          ))}
        </div>
      </div>
      <CruiseFeatures />
      <CruiseRoom />
      <CruiseIntroduce />
      <SectionHeader id="cruise-map" title="Bản đồ và lịch trình" description="Du thuyền xuất phát từ Cảng tàu khách quốc tế Hạ Long, Quảng Ninh" className="px-8 py-20">
        <div className="h-96">
          <iframe className="w-full h-full" src={mapUrl} allowFullScreen loading="lazy"></iframe>
        </div>
      </SectionHeader>
      <CruiseReviews />
      
      {/* Modal Form Đặt Tàu */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Đặt du thuyền</h2>
                <button 
                  onClick={closeBookingModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {formSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Đặt tàu thành công!</h3>
                  <p className="text-gray-600">Thông tin đặt tàu đã được gửi đến email của bạn.</p>
                </div>
              ) : (
                <>
                  <div className="bg-teal-50 p-4 rounded-lg mb-6">
                    <h3 className="font-semibold text-teal-800 mb-2">{name}</h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Giá: {price.toLocaleString("vi-VN")} đ/khách</p>
                      <p>Địa điểm: {location}</p>
                    </div>
                  </div>

                  <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleBookingSubmit}>
                    {/* Trường Họ và tên */}
                    <div className="md:col-span-2">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Họ và tên <span className="text-red-500">*</span>
                      </label>
                      <div className="flex w-full items-center rounded-lg bg-white border border-gray-300 shadow-sm focus-within:ring-2 focus-within:ring-teal-400 transition-all">
                        <input
                          id="name"
                          type="text"
                          placeholder="Nhập họ và tên"
                          value={bookingFormData.name}
                          onChange={handleBookingChange}
                          className="px-4 py-3 block w-full bg-transparent text-base text-gray-900 placeholder:text-gray-400 focus:outline-none rounded-lg"
                        />
                      </div>
                      {bookingErrors.name && <p className="text-red-500 text-xs mt-1">{bookingErrors.name}</p>}
                    </div>

                    {/* Trường Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <div className="flex w-full items-center rounded-lg bg-white border border-gray-300 shadow-sm focus-within:ring-2 focus-within:ring-teal-400 transition-all">
                        <input
                          id="email"
                          type="email"
                          placeholder="Nhập email"
                          value={bookingFormData.email}
                          onChange={handleBookingChange}
                          className="px-4 py-3 block w-full bg-transparent text-base text-gray-900 placeholder:text-gray-400 focus:outline-none rounded-lg"
                        />
                      </div>
                      {bookingErrors.email && <p className="text-red-500 text-xs mt-1">{bookingErrors.email}</p>}
                    </div>

                    {/* Trường Số điện thoại */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Số điện thoại <span className="text-red-500">*</span>
                      </label>
                      <div className="flex w-full items-center rounded-lg bg-white border border-gray-300 shadow-sm focus-within:ring-2 focus-within:ring-teal-400 transition-all">
                        <input
                          id="phone"
                          type="text"
                          placeholder="Nhập số điện thoại"
                          value={bookingFormData.phone}
                          onChange={handleBookingChange}
                          className="px-4 py-3 block w-full bg-transparent text-base text-gray-900 placeholder:text-gray-400 focus:outline-none rounded-lg"
                        />
                      </div>
                      {bookingErrors.phone && <p className="text-red-500 text-xs mt-1">{bookingErrors.phone}</p>}
                    </div>

                    {/* Trường Số lượng khách */}
                    <div>
                      <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
                        Số lượng khách <span className="text-red-500">*</span>
                      </label>
                      <div className="flex w-full items-center rounded-lg bg-white border border-gray-300 shadow-sm focus-within:ring-2 focus-within:ring-teal-400 transition-all">
                        <input
                          id="guests"
                          type="number"
                          min="1"
                          placeholder="Nhập số lượng khách"
                          value={bookingFormData.guests}
                          onChange={handleBookingChange}
                          className="px-4 py-3 block w-full bg-transparent text-base text-gray-900 placeholder:text-gray-400 focus:outline-none rounded-lg"
                        />
                      </div>
                      {bookingErrors.guests && <p className="text-red-500 text-xs mt-1">{bookingErrors.guests}</p>}
                    </div>

                    {/* Trường Ngày đặt tàu */}
                    <div>
                      <label htmlFor="bookingDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Ngày đặt tàu <span className="text-red-500">*</span>
                      </label>
                      <div className="flex w-full items-center rounded-lg bg-white border border-gray-300 shadow-sm focus-within:ring-2 focus-within:ring-teal-400 transition-all">
                        <input
                          id="bookingDate"
                          type="date"
                          min={today}
                          value={bookingFormData.bookingDate}
                          onChange={handleBookingChange}
                          className="px-4 py-3 block w-full bg-transparent text-base text-gray-900 placeholder:text-gray-400 focus:outline-none rounded-lg"
                        />
                      </div>
                      {bookingErrors.bookingDate && <p className="text-red-500 text-xs mt-1">{bookingErrors.bookingDate}</p>}
                    </div>

                    {/* Thông báo lỗi khi submit */}
                    {bookingErrors.submit && (
                      <div className="md:col-span-2">
                        <p className="text-red-500 text-sm">{bookingErrors.submit}</p>
                      </div>
                    )}

                    {/* Tổng tiền dự kiến */}
                    <div className="md:col-span-2 bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Tổng tiền dự kiến:</span>
                        <span className="font-bold text-teal-700">
                          {(bookingFormData.guests * price).toLocaleString("vi-VN")} đ
                        </span>
                      </div>
                    </div>

                    {/* Nút đặt tàu */}
                    <div className="md:col-span-2 mt-4">
                      <button
                        type="submit"
                        disabled={bookingLoading}
                        className="w-full bg-teal-600 py-3 text-white text-base font-semibold rounded-xl hover:bg-teal-700 transition duration-300 disabled:bg-teal-300"
                      >
                        {bookingLoading ? (
                          <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          </div>
                        ) : (
                          'Xác nhận đặt tàu'
                        )}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CruiseDetail;