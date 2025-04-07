import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Star, MapPin, ChevronLeft, ChevronRight, X } from 'lucide-react';
import emailjs from '@emailjs/browser';

import HotelFeatures from './HotelFeatures';
import HotelRoom from './HotelRoom';
import HotelIntroduce from './HotelIntroduce';
import HotelReviews from './HotelReviews';
import SectionHeader from '../../components/SectionHeader/SectionHeader';

// Xóa import JSON cứng
// import serviceHotel from "../../data/mocks/Services/hotels.json"
import { getAllHotels, getHotelById, saveHotelBooking } from '../../services/hotelService';

const HotelDetail = () => {
    const navigate = useNavigate();
    const { hotelSlug } = useParams();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const mapUrl =
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.858237982653!2d106.68427047522368!3d10.822158889329383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174deb3ef536f31%3A0x8b7bb8b7c956157b!2sIndustrial%20University%20of%20Ho%20Chi%20Minh%20City!5e0!3m2!1sen!2s!4v1741966573439!5m2!1sen!2s';

    // State cho chức năng đặt phòng
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [bookingFormData, setBookingFormData] = useState({
        name: '',
        email: '',
        phone: '',
        guests: 1,
        checkInDate: '',
        checkOutDate: '',
        roomType: 'standard', // Mặc định là phòng Standard
    });
    const [bookingErrors, setBookingErrors] = useState({});
    const [bookingLoading, setBookingLoading] = useState(false);
    const [formSuccess, setFormSuccess] = useState(false);

    // Fetch hotel data from API
    useEffect(() => {
        const fetchHotelData = async () => {
            try {
                setLoading(true);
                const hotels = await getAllHotels();
                const foundHotel = hotels.find((item) => item.to === `/${hotelSlug}`);

                if (foundHotel) {
                    setHotel(foundHotel);
                } else {
                    // Nếu không tìm thấy theo slug, có thể thử fetch theo ID
                    try {
                        // Giả sử hotelSlug có thể là ID
                        const hotelData = await getHotelById(hotelSlug);
                        if (hotelData) {
                            setHotel(hotelData);
                        } else {
                            navigate('/404', { replace: true });
                        }
                    } catch (err) {
                        navigate('/404', { replace: true });
                        console.log(err);
                    }
                }
            } catch (err) {
                console.error('Error fetching hotel data:', err);
                setError('Không thể tải thông tin khách sạn. Vui lòng thử lại sau.');
            } finally {
                setLoading(false);
            }
        };

        fetchHotelData();
    }, [hotelSlug, navigate]);

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
            case 'checkInDate':
                return value ? '' : 'Vui lòng chọn ngày nhận phòng';
            case 'checkOutDate':
                if (!value) return 'Vui lòng chọn ngày trả phòng';
                if (bookingFormData.checkInDate && new Date(value) <= new Date(bookingFormData.checkInDate)) {
                    return 'Ngày trả phòng phải sau ngày nhận phòng';
                }
                return '';
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
        setBookingFormData((prev) => ({ ...prev, [id]: value }));

        // Validate field on change
        const error = validateBookingField(id, value);
        setBookingErrors((prev) => ({ ...prev, [id]: error }));
    };

    // Tính số ngày lưu trú
    const calculateStayDuration = () => {
        if (!bookingFormData.checkInDate || !bookingFormData.checkOutDate) return 0;

        const checkIn = new Date(bookingFormData.checkInDate);
        const checkOut = new Date(bookingFormData.checkOutDate);
        const diffTime = checkOut.getTime() - checkIn.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return diffDays > 0 ? diffDays : 0;
    };

    // Tính giá theo loại phòng
    const getRoomPrice = () => {
        if (!hotel) return 0;
        const basePrice = hotel.price;

        switch (bookingFormData.roomType) {
            case 'deluxe':
                return basePrice * 1.5;
            case 'suite':
                return basePrice * 2;
            case 'standard':
            default:
                return basePrice;
        }
    };

    // Handle booking form submission
    // Then modify the handleBookingSubmit function:
    const handleBookingSubmit = async (e) => {
        e.preventDefault();

        if (!validateBookingForm()) return;

        setBookingLoading(true);
        try {
            // Tính tổng tiền dựa trên số ngày và loại phòng
            const stayDuration = calculateStayDuration();
            const roomPrice = getRoomPrice();
            const totalPrice = stayDuration * roomPrice;

            const roomTypes = {
                standard: 'Phòng Standard',
                deluxe: 'Phòng Deluxe',
                suite: 'Phòng Suite',
            };

            // Chuẩn bị dữ liệu gửi email
            const emailData = {
                ...bookingFormData,
                hotelName: hotel.name,
                hotelLocation: hotel.location,
                roomType: roomTypes[bookingFormData.roomType],
                roomPrice: roomPrice.toLocaleString('vi-VN'),
                stayDuration: stayDuration,
                totalPrice: totalPrice.toLocaleString('vi-VN'),
                subject: `Xác nhận đặt phòng khách sạn ${hotel.name}`,
            };

            // Gửi email bằng EmailJS
            await emailjs.send(
                import.meta.env.VITE_SERVICE_ID_3,
                import.meta.env.VITE_TEMPLATE_ID_3,
                emailData,
                import.meta.env.VITE_PUBLIC_KEY_3,
            );

            // Lưu đặt phòng vào MongoDB
            const bookingDBData = {
                name: bookingFormData.name,
                email: bookingFormData.email,
                phone: bookingFormData.phone,
                guests: parseInt(bookingFormData.guests),
                checkInDate: bookingFormData.checkInDate,
                checkOutDate: bookingFormData.checkOutDate,
                roomType: roomTypes[bookingFormData.roomType],
                hotelName: hotel.name,
                hotelLocation: hotel.location,
                totalPrice: totalPrice,
                stayDuration: stayDuration,
            };

            await saveHotelBooking(bookingDBData);

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
                    checkInDate: '',
                    checkOutDate: '',
                    roomType: 'standard',
                });

                // Ẩn thông báo thành công sau 3 giây
                setTimeout(() => setBookingSuccess(false), 3000);
            }, 3000);
        } catch (error) {
            console.error('Lỗi khi xử lý đặt phòng:', error);
            setBookingErrors({ submit: 'Đã xảy ra lỗi khi gửi thông tin đặt phòng. Vui lòng thử lại sau.' });
        } finally {
            setBookingLoading(false);
        }
    };

    // Đóng modal đặt phòng
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
                    <h2 className="text-2xl font-bold mb-2">Có gì đó sai sai</h2>
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

    if (!hotel) return null;

    const { images, name, price, location, rating } = hotel;
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
            element.scrollIntoView({ behavior: 'smooth' });
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

                            <button
                                onClick={() => scrollToSection('hotel-map')}
                                className="text-teal-500 text-sm hover:underline"
                            >
                                Xem bản đồ và vị trí
                            </button>
                        </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <div className="text-teal-700 text-2xl md:text-3xl font-bold text-right">
                            {price.toLocaleString('vi-VN')} đ/đêm
                        </div>
                        <button
                            onClick={() => setIsBookingModalOpen(true)}
                            className="mt-3 bg-teal-600 hover:bg-teal-700 text-white py-2 px-6 rounded-md transition duration-200 flex items-center justify-center w-full"
                        >
                            Đặt phòng ngay
                        </button>

                        {/* Hiển thị thông báo đặt phòng thành công */}
                        {bookingSuccess && (
                            <div className="mt-3 bg-green-100 text-green-800 px-4 py-2 rounded-md text-sm">
                                Đặt phòng thành công! Thông tin đã được gửi đến email của bạn.
                            </div>
                        )}
                    </div>
                </div>

                <div className="relative mt-4 mb-8">
                    <div className="w-full h-[28rem] md:h-[32rem] overflow-hidden rounded-lg relative">
                        <img
                            src={images[currentImageIndex] || '/placeholder.svg'}
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
                            className={`relative rounded-lg overflow-hidden border-2 transition-all ${currentImageIndex === index ? 'border-teal-500 scale-105' : 'border-transparent opacity-80'}`}
                        >
                            <img
                                src={image || '/placeholder.svg'}
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

            {/* Modal Form Đặt Phòng */}
            {isBookingModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold text-gray-800">Đặt phòng khách sạn</h2>
                                <button onClick={closeBookingModal} className="text-gray-500 hover:text-gray-700">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {formSuccess ? (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg
                                            className="w-8 h-8 text-green-500"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M5 13l4 4L19 7"
                                            ></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Đặt phòng thành công!</h3>
                                    <p className="text-gray-600">Thông tin đặt phòng đã được gửi đến email của bạn.</p>
                                </div>
                            ) : (
                                <>
                                    <div className="bg-teal-50 p-4 rounded-lg mb-6">
                                        <h3 className="font-semibold text-teal-800 mb-2">{name}</h3>
                                        <div className="text-sm text-gray-600 space-y-1">
                                            <p>Giá: {price.toLocaleString('vi-VN')} đ/đêm (Phòng Standard)</p>
                                            <p>Địa điểm: {location}</p>
                                        </div>
                                    </div>

                                    <form
                                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                        onSubmit={handleBookingSubmit}
                                    >
                                        {/* Trường Họ và tên */}
                                        <div className="md:col-span-2">
                                            <label
                                                htmlFor="name"
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                            >
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
                                            {bookingErrors.name && (
                                                <p className="text-red-500 text-xs mt-1">{bookingErrors.name}</p>
                                            )}
                                        </div>

                                        {/* Trường Email */}
                                        <div>
                                            <label
                                                htmlFor="email"
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                            >
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
                                            {bookingErrors.email && (
                                                <p className="text-red-500 text-xs mt-1">{bookingErrors.email}</p>
                                            )}
                                        </div>

                                        {/* Trường Số điện thoại */}
                                        <div>
                                            <label
                                                htmlFor="phone"
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                            >
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
                                            {bookingErrors.phone && (
                                                <p className="text-red-500 text-xs mt-1">{bookingErrors.phone}</p>
                                            )}
                                        </div>

                                        {/* Trường Số lượng khách */}
                                        <div>
                                            <label
                                                htmlFor="guests"
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                            >
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
                                            {bookingErrors.guests && (
                                                <p className="text-red-500 text-xs mt-1">{bookingErrors.guests}</p>
                                            )}
                                        </div>

                                        {/* Trường Loại phòng */}
                                        <div className="md:col-span-2">
                                            <label
                                                htmlFor="roomType"
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                            >
                                                Loại phòng <span className="text-red-500">*</span>
                                            </label>
                                            <div className="flex w-full items-center rounded-lg bg-white border border-gray-300 shadow-sm focus-within:ring-2 focus-within:ring-teal-400 transition-all">
                                                <select
                                                    id="roomType"
                                                    value={bookingFormData.roomType}
                                                    onChange={handleBookingChange}
                                                    className="px-4 py-3 block w-full bg-transparent text-base text-gray-900 focus:outline-none rounded-lg"
                                                >
                                                    <option value="standard">
                                                        Phòng Standard - {price.toLocaleString('vi-VN')}đ/đêm
                                                    </option>
                                                    <option value="deluxe">
                                                        Phòng Deluxe - {(price * 1.5).toLocaleString('vi-VN')}đ/đêm
                                                    </option>
                                                    <option value="suite">
                                                        Phòng Suite - {(price * 2).toLocaleString('vi-VN')}đ/đêm
                                                    </option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* Trường Ngày nhận phòng */}
                                        <div>
                                            <label
                                                htmlFor="checkInDate"
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                            >
                                                Ngày nhận phòng <span className="text-red-500">*</span>
                                            </label>
                                            <div className="flex w-full items-center rounded-lg bg-white border border-gray-300 shadow-sm focus-within:ring-2 focus-within:ring-teal-400 transition-all">
                                                <input
                                                    id="checkInDate"
                                                    type="date"
                                                    min={today}
                                                    value={bookingFormData.checkInDate}
                                                    onChange={handleBookingChange}
                                                    className="px-4 py-3 block w-full bg-transparent text-base text-gray-900 placeholder:text-gray-400 focus:outline-none rounded-lg"
                                                />
                                            </div>
                                            {bookingErrors.checkInDate && (
                                                <p className="text-red-500 text-xs mt-1">{bookingErrors.checkInDate}</p>
                                            )}
                                        </div>

                                        {/* Trường Ngày trả phòng */}
                                        <div>
                                            <label
                                                htmlFor="checkOutDate"
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                            >
                                                Ngày trả phòng <span className="text-red-500">*</span>
                                            </label>
                                            <div className="flex w-full items-center rounded-lg bg-white border border-gray-300 shadow-sm focus-within:ring-2 focus-within:ring-teal-400 transition-all">
                                                <input
                                                    id="checkOutDate"
                                                    type="date"
                                                    min={bookingFormData.checkInDate || today}
                                                    value={bookingFormData.checkOutDate}
                                                    onChange={handleBookingChange}
                                                    className="px-4 py-3 block w-full bg-transparent text-base text-gray-900 placeholder:text-gray-400 focus:outline-none rounded-lg"
                                                />
                                            </div>
                                            {bookingErrors.checkOutDate && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {bookingErrors.checkOutDate}
                                                </p>
                                            )}
                                        </div>

                                        {/* Thông báo lỗi khi submit */}
                                        {bookingErrors.submit && (
                                            <div className="md:col-span-2">
                                                <p className="text-red-500 text-sm">{bookingErrors.submit}</p>
                                            </div>
                                        )}

                                        {/* Tổng tiền dự kiến */}
                                        {bookingFormData.checkInDate && bookingFormData.checkOutDate && (
                                            <div className="md:col-span-2 bg-gray-50 p-3 rounded-lg">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-700">Số đêm:</span>
                                                    <span className="font-medium">{calculateStayDuration()} đêm</span>
                                                </div>
                                                <div className="flex justify-between items-center mt-1">
                                                    <span className="text-gray-700">Tổng tiền dự kiến:</span>
                                                    <span className="font-bold text-teal-700">
                                                        {(calculateStayDuration() * getRoomPrice()).toLocaleString(
                                                            'vi-VN',
                                                        )}{' '}
                                                        đ
                                                    </span>
                                                </div>
                                            </div>
                                        )}

                                        {/* Nút đặt phòng */}
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
                                                    'Xác nhận đặt phòng'
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

export default HotelDetail;
