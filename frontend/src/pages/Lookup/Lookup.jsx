import { useState, useEffect } from 'react';
import { Hotel, Ship, Plane, Info, X, Calendar, Users, MapPin, CreditCard, Clock } from 'lucide-react';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import Hero from '../../components/Hero/Hero';
import videoHaLongBay from "../../assets/videos/HaLongBay"
import imgHero from "../../assets/images/Hero"
import { getAllHotelBookings } from '../../services/hotelService';
import { getAllCruiseBookings } from '../../services/cruiseService';
import ApiDebugger from '../../components/Debug/ApiDebugger';
import { getCurrentUser, isLoggedIn } from '../../utils/auth';

// eslint-disable-next-line react/prop-types
const Modal = ({ open, onClose, children }) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity">
            <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-0 relative animate-fadeIn overflow-hidden">
                <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 rounded-full p-1 hover:bg-gray-100 transition-colors z-10"
                    onClick={onClose}
                    aria-label="Đóng"
                >
                    <X size={20} />
                </button>
                {children}
            </div>
        </div>
    );
};

// Fallback mock data in case API fails
const mockHotelBookings = [];
const mockCruiseBookings = [];
const mockFlightBookings = [];

const TABS = [
    { key: 'hotel', label: 'Khách sạn', icon: Hotel },
    { key: 'cruise', label: 'Du thuyền', icon: Ship },
    { key: 'flight', label: 'Chuyến bay', icon: Plane },
];
const FILTERS = [
    { key: 'all', label: 'Tất cả' },
    { key: 'active', label: 'Hiệu lực' },
    { key: 'expired', label: 'Hết hiệu lực' },
];

// Helper function to safely format dates
const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    } catch (error) {
        console.error('Error formatting date:', error);
        return '';
    }
};

const Lookup = () => {
    const [tab, setTab] = useState('hotel');
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [loggedInUser, setLoggedInUser] = useState(null);
    
    // Store API data
    const [hotelBookings, setHotelBookings] = useState([]);
    const [cruiseBookings, setCruiseBookings] = useState([]);

    // Fetch data and current user on component mount
    useEffect(() => {
        // Kiểm tra đăng nhập
        if (!isLoggedIn()) {
            setError('Bạn cần đăng nhập để xem thông tin đặt chỗ.');
            return;
        }
        
        const user = getCurrentUser();
        setLoggedInUser(user);
        console.log('Logged in user:', user);
        
        if (user && user.phone) {
            fetchAllBookings();
        } else {
            setError('Không tìm thấy thông tin người dùng.');
        }
    }, []);
    
    // Kiểm tra xem booking có phải của người dùng hiện tại không (chỉ dựa trên số điện thoại)
    const isUserBooking = (booking) => {
        if (!loggedInUser || !loggedInUser.phone || !booking.phone) return false;
        
        // Chỉ so sánh số điện thoại
        return booking.phone === loggedInUser.phone;
    };
    
    // Fetch data when tab changes
    useEffect(() => {
        if (!loggedInUser) return;
        
        if (tab === 'hotel' && hotelBookings.length === 0) {
            fetchHotelBookings();
        } else if (tab === 'cruise' && cruiseBookings.length === 0) {
            fetchCruiseBookings();
        }
    }, [tab, loggedInUser]);

    // Fetch all booking data
    const fetchAllBookings = async () => {
        setLoading(true);
        try {
            await Promise.all([
                fetchHotelBookings(),
                fetchCruiseBookings()
            ]);
        } catch (error) {
            console.error('Error fetching all bookings:', error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch hotel bookings
    const fetchHotelBookings = async () => {
        try {
            const response = await getAllHotelBookings();
            if (response && response.data) {
                console.log('All hotel bookings from API:', response.data.length);
                
                // Lọc chỉ lấy booking của người dùng hiện tại (dựa trên số điện thoại)
                const userBookings = response.data.filter(booking => isUserBooking(booking));
                console.log('User hotel bookings:', userBookings.length);
                
                setHotelBookings(userBookings);
            }
        } catch (error) {
            console.error('Error fetching hotel bookings:', error);
            setError('Không thể tải dữ liệu đặt phòng. Vui lòng thử lại sau.');
        }
    };

    // Fetch cruise bookings
    const fetchCruiseBookings = async () => {
        try {
            const response = await getAllCruiseBookings();
            if (response && response.data) {
                console.log('All cruise bookings from API:', response.data.length);
                
                // Lọc chỉ lấy booking của người dùng hiện tại (dựa trên số điện thoại)
                const userBookings = response.data.filter(booking => isUserBooking(booking));
                console.log('User cruise bookings:', userBookings.length);
                
                setCruiseBookings(userBookings);
            }
        } catch (error) {
            console.error('Error fetching cruise bookings:', error);
            setError('Không thể tải dữ liệu đặt du thuyền. Vui lòng thử lại sau.');
        }
    };

    // Lấy dữ liệu theo tab
    const getDataByTab = () => {
        if (tab === 'hotel') return hotelBookings.length > 0 ? hotelBookings : mockHotelBookings;
        if (tab === 'cruise') return cruiseBookings.length > 0 ? cruiseBookings : mockCruiseBookings;
        if (tab === 'flight') return mockFlightBookings;
        return [];
    };

    // Lọc theo filter
    const filterBookings = (data) => {
        const now = new Date();
        if (filter === 'all') return data;
        if (tab === 'hotel') {
            return data.filter(b => {
                const checkOut = b.checkOutDate ? new Date(b.checkOutDate) : null;
                return checkOut ? (filter === 'active' ? checkOut >= now : checkOut < now) : true;
            });
        }
        if (tab === 'cruise') {
            return data.filter(b => {
                const booking = b.bookingDate ? new Date(b.bookingDate) : null;
                return booking ? (filter === 'active' ? booking >= now : booking < now) : true;
            });
        }
        if (tab === 'flight') {
            return data.filter(b => {
                const dep = b.departureDate ? new Date(b.departureDate) : null;
                return dep ? (filter === 'active' ? dep >= now : dep < now) : true;
            });
        }
        return data;
    };

    // Dữ liệu hiển thị
    const displayData = filterBookings(getDataByTab());

    // Render card view - Thiết kế mới
    const renderCards = () => (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {displayData.map(b => (
                <div 
                    key={b._id} 
                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden cursor-pointer"
                    onClick={() => { setModalData(b); setModalOpen(true); }}
                >
                    <div className="flex flex-col">
                        <div className="p-4 flex flex-col">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="font-bold text-gray-800 text-lg">{b.name}</h3>
                                <span className="text-xs px-2 py-1 bg-teal-50 text-teal-600 rounded-full font-medium">
                                    #{b._id ? b._id.toString().slice(-6) : ''}
                                </span>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-3">
                                {tab === 'hotel' && (
                                    <>
                                        <div className="flex items-center space-x-2 col-span-2">
                                            <Hotel size={16} className="text-teal-500" />
                                            <span className="font-medium text-gray-700">{b.hotelName}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <MapPin size={16} className="text-gray-400" />
                                            <span className="text-gray-600 text-sm">{b.hotelLocation}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Users size={16} className="text-gray-400" />
                                            <span className="text-gray-600 text-sm">{b.guests} khách</span>
                                        </div>
                                    </>
                                )}
                                
                                {tab === 'cruise' && (
                                    <>
                                        <div className="flex items-center space-x-2 col-span-2">
                                            <Ship size={16} className="text-teal-500" />
                                            <span className="font-medium text-gray-700">{b.cruiseName}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <MapPin size={16} className="text-gray-400" />
                                            <span className="text-gray-600 text-sm">{b.cruiseLocation}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Users size={16} className="text-gray-400" />
                                            <span className="text-gray-600 text-sm">{b.guests} khách</span>
                                        </div>
                                    </>
                                )}
                                
                                {tab === 'flight' && (
                                    <>
                                        <div className="flex items-center space-x-2 col-span-2">
                                            <Plane size={16} className="text-teal-500" />
                                            <span className="font-medium text-gray-700">{b.flightNumber}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <MapPin size={16} className="text-gray-400" />
                                            <span className="text-gray-600 text-sm">{b.from} → {b.to}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Users size={16} className="text-gray-400" />
                                            <span className="text-gray-600 text-sm">{b.passengers} hành khách</span>
                                        </div>
                                    </>
                                )}
                            </div>
                            
                            <div className="flex items-center space-x-2 mb-2">
                                <Calendar size={16} className="text-gray-400" />
                                <span className="text-gray-600 text-sm">
                                    {tab === 'hotel' && `${formatDate(b.checkInDate)} → ${formatDate(b.checkOutDate)}`}
                                    {tab === 'cruise' && `${formatDate(b.bookingDate)}`}
                                    {tab === 'flight' && `${formatDate(b.departureDate)}`}
                                </span>
                            </div>
                        </div>
                        
                        <div className="mt-auto bg-gray-50 p-3 border-t flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                                <CreditCard size={16} className="text-teal-600" />
                                <span className="font-semibold text-teal-700">{b.totalPrice.toLocaleString()}₫</span>
                            </div>
                            <button 
                                className="px-3 py-1 bg-teal-600 hover:bg-teal-700 text-white rounded text-sm transition-colors"
                                onClick={(e) => { 
                                    e.stopPropagation(); 
                                    setModalData(b); 
                                    setModalOpen(true); 
                                }}
                            >
                                Xem chi tiết
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    // Render chi tiết modal - Thiết kế mới
    const renderModalDetail = () => {
        if (!modalData) return null;
        
        const isHotel = tab === 'hotel';
        const isCruise = tab === 'cruise';
        const isFlight = tab === 'flight';
        
        const getStatusColor = () => {
            const now = new Date();
            if (isHotel) {
                const checkOut = new Date(modalData.checkOutDate);
                return checkOut >= now ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
            }
            if (isCruise) {
                const bookingDate = new Date(modalData.bookingDate);
                return bookingDate >= now ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
            }
            return 'bg-gray-100 text-gray-800';
        };
        
        const getStatusText = () => {
            const now = new Date();
            if (isHotel) {
                const checkOut = new Date(modalData.checkOutDate);
                return checkOut >= now ? 'Còn hiệu lực' : 'Hết hiệu lực';
            }
            if (isCruise) {
                const bookingDate = new Date(modalData.bookingDate);
                return bookingDate >= now ? 'Còn hiệu lực' : 'Hết hiệu lực';
            }
            return 'Chưa xác định';
        };
        
        return (
            <>
                <div className="bg-teal-600 p-6 text-white">
                    <h2 className="text-xl font-bold">Chi tiết đơn đặt</h2>
                    <div className="mt-2 flex items-center">
                        <span className="text-sm bg-white bg-opacity-20 px-2 py-0.5 rounded">
                            #{modalData._id ? modalData._id.toString().slice(-6) : ''}
                        </span>
                        <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${getStatusColor()}`}>
                            {getStatusText()}
                        </span>
                    </div>
                </div>
                
                <div className="p-6">
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Thông tin khách hàng</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-gray-500">Họ tên</p>
                                <p className="font-medium text-gray-800">{modalData.name}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Email</p>
                                <p className="font-medium text-gray-800">{modalData.email}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Số điện thoại</p>
                                <p className="font-medium text-gray-800">{modalData.phone}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Số khách</p>
                                <p className="font-medium text-gray-800">{isHotel || isCruise ? modalData.guests : modalData.passengers}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Chi tiết đặt chỗ</h3>
                        <div className="space-y-3 text-sm">
                            {isHotel && (
                                <>
                                    <div className="flex items-start">
                                        <Hotel size={18} className="text-teal-600 mt-0.5 mr-3 flex-shrink-0" />
                                        <div>
                                            <p className="font-medium text-gray-800">{modalData.hotelName}</p>
                                            <p className="text-gray-500">{modalData.hotelLocation}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <Calendar size={18} className="text-teal-600 mt-0.5 mr-3 flex-shrink-0" />
                                        <div>
                                            <p className="font-medium text-gray-800">Thời gian lưu trú</p>
                                            <p className="text-gray-500">{formatDate(modalData.checkInDate)} → {formatDate(modalData.checkOutDate)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <Info size={18} className="text-teal-600 mt-0.5 mr-3 flex-shrink-0" />
                                        <div>
                                            <p className="font-medium text-gray-800">Loại phòng</p>
                                            <p className="text-gray-500">{modalData.roomType}</p>
                                        </div>
                                    </div>
                                </>
                            )}
                            
                            {isCruise && (
                                <>
                                    <div className="flex items-start">
                                        <Ship size={18} className="text-teal-600 mt-0.5 mr-3 flex-shrink-0" />
                                        <div>
                                            <p className="font-medium text-gray-800">{modalData.cruiseName}</p>
                                            <p className="text-gray-500">{modalData.cruiseLocation}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <Calendar size={18} className="text-teal-600 mt-0.5 mr-3 flex-shrink-0" />
                                        <div>
                                            <p className="font-medium text-gray-800">Ngày khởi hành</p>
                                            <p className="text-gray-500">{formatDate(modalData.bookingDate)}</p>
                                        </div>
                                    </div>
                                </>
                            )}
                            
                            {isFlight && (
                                <>
                                    <div className="flex items-start">
                                        <Plane size={18} className="text-teal-600 mt-0.5 mr-3 flex-shrink-0" />
                                        <div>
                                            <p className="font-medium text-gray-800">{modalData.flightNumber}</p>
                                            <p className="text-gray-500">{modalData.from} → {modalData.to}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <Calendar size={18} className="text-teal-600 mt-0.5 mr-3 flex-shrink-0" />
                                        <div>
                                            <p className="font-medium text-gray-800">Ngày khởi hành</p>
                                            <p className="text-gray-500">{formatDate(modalData.departureDate)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <Info size={18} className="text-teal-600 mt-0.5 mr-3 flex-shrink-0" />
                                        <div>
                                            <p className="font-medium text-gray-800">Hạng</p>
                                            <p className="text-gray-500">{modalData.class || 'Phổ thông'}</p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    
                    <div className="border-t pt-4">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                                <Clock size={18} className="text-gray-400" />
                                <span className="text-gray-500 text-sm">Đặt lúc: {new Date(modalData.createdAt).toLocaleString('vi-VN')}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <CreditCard size={18} className="text-teal-600" />
                                <span className="font-bold text-teal-700">{modalData.totalPrice.toLocaleString()}₫</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="bg-gray-50 p-4 text-center border-t">
                    <button 
                        className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded font-medium transition-colors"
                        onClick={() => setModalOpen(false)}
                    >
                        Đóng
                    </button>
                </div>
            </>
        );
    };

    // Add this console log to check when component mounts
    useEffect(() => {
        console.log('Lookup component mounted');
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
            {/* Add the ApiDebugger component */}
            <ApiDebugger />
            
            <Hero className="relative" videoSrc={videoHaLongBay.halongbay} imageSrc={imgHero.halongbay}></Hero>
            <div className="mt-10"></div>
            <SectionHeader
                title="Đơn đặt của bạn"
                description="Thông tin đặt phòng khách sạn, tour du thuyền hoặc vé máy bay của bạn"
                className="mb-8"
            />

            <div className="bg-white shadow-sm rounded-xl p-6 mb-8">
                {/* Tab Navigation */}
                <div className="flex border-b border-gray-200 mb-6">
                    {TABS.map(t => (
                        <button
                            key={t.key}
                            className={`flex items-center px-4 py-2 border-b-2 font-medium text-sm focus:outline-none ${tab === t.key ? 'border-teal-600 text-teal-600' : 'border-transparent text-gray-500'}`}
                            onClick={() => { setTab(t.key); }}
                        >
                            <t.icon className="h-5 w-5 mr-2" />
                            {t.label}
                        </button>
                    ))}
                </div>
                {/* Filter Navigation */}
                <div className="flex gap-2 mb-4">
                    {FILTERS.map(f => (
                        <button
                            key={f.key}
                            className={`px-3 py-1 rounded-full text-sm font-medium ${filter === f.key ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                            onClick={() => { setFilter(f.key); }}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
                
                {!isLoggedIn() ? (
                    <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                        <div className="font-medium text-yellow-800">Bạn cần đăng nhập để xem thông tin đặt chỗ</div>
                        <p className="text-yellow-700 text-sm mt-1">Vui lòng đăng nhập để xem các đơn đặt của bạn.</p>
                    </div>
                ) : (
                    <div className="bg-teal-50 p-3 rounded-lg text-sm text-teal-700">
                        <p className="flex items-start">
                            <Info className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                            <span>
                                Danh sách dưới đây hiển thị tất cả các đơn đặt của bạn với số điện thoại {loggedInUser?.phone}.
                            </span>
                        </p>
                    </div>
                )}
            </div>

            {/* Results Display */}
            <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Đơn đặt của bạn</h3>
                {loading ? (
                    <div className="text-center py-10">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-600"></div>
                        <p className="mt-2 text-gray-600">Đang tải dữ liệu...</p>
                    </div>
                ) : displayData.length === 0 ? (
                    <div className="text-gray-500">Không tìm thấy đơn đặt nào.</div>
                ) : (
                    renderCards()
                )}
            </div>
            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                {renderModalDetail()}
            </Modal>
        </div>
    );
};

export default Lookup;
