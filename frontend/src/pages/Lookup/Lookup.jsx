import { useState } from 'react';
import { Search, Hotel, Ship, Plane, Calendar, ArrowRight, X, Info } from 'lucide-react';
import SectionHeader from '../../components/SectionHeader/SectionHeader';

// Mock data for demonstration
const mockHotelBookings = [
  {
    id: "67f386530281b4cb133bf2e",
    name: "Nguyen Van Anh",
    email: "nvanh@gmail.com",
    phone: "0353999999",
    guests: 2,
    checkInDate: "2025-05-01T00:00:00.000+00:00",
    checkOutDate: "2025-05-21T00:00:00.000+00:00",
    roomType: "Phòng Standard",
    hotelName: "Anya Hotel Quy Nhơn",
    hotelLocation: "Hạ Long",
    totalPrice: 3200000,
    stayDuration: 20,
    createdAt: "2025-04-07T08:01:23.106+00:00",
    updatedAt: "2025-04-07T08:01:23.106+00:00",
  },
  {
    id: "67f386530281b4cb133bf3f",
    name: "Tran Minh Duc",
    email: "tmduc@gmail.com",
    phone: "0987654321",
    guests: 3,
    checkInDate: "2025-06-15T00:00:00.000+00:00",
    checkOutDate: "2025-06-20T00:00:00.000+00:00",
    roomType: "Phòng Suite",
    hotelName: "Vinpearl Resort",
    hotelLocation: "Nha Trang",
    totalPrice: 8500000,
    stayDuration: 5,
    createdAt: "2025-04-10T10:23:45.106+00:00",
    updatedAt: "2025-04-10T10:23:45.106+00:00",
  }
];

const mockCruiseBookings = [
  {
    id: "67f385eb0281b4cb133bf22",
    name: "Nguyen Van Minh",
    email: "nvminh162@gmail.com",
    phone: "0353999999",
    guests: 1,
    bookingDate: "2025-04-30T00:00:00.000+00:00",
    cruiseName: "Du thuyền Heritage Bình Chuẩn Cát Bà",
    cruiseLocation: "Vịnh Hạ Long",
    totalPrice: 3675000,
    createdAt: "2025-04-07T07:59:39.973+00:00",
    updatedAt: "2025-04-07T07:59:39.973+00:00",
  },
  {
    id: "67f385eb0281b4cb133bf25",
    name: "Le Thi Hoa",
    email: "lethihoa@gmail.com",
    phone: "0912345678",
    guests: 4,
    bookingDate: "2025-07-12T00:00:00.000+00:00",
    cruiseName: "Du thuyền Paradise Elegance",
    cruiseLocation: "Vịnh Lan Hạ",
    totalPrice: 12300000,
    createdAt: "2025-04-12T14:27:39.973+00:00",
    updatedAt: "2025-04-12T14:27:39.973+00:00",
  }
];

const mockFlightBookings = [
  {
    id: "67f385eb0281b4cb133bf28",
    name: "Phan Thanh Long",
    email: "ptlong@gmail.com",
    phone: "0976543210",
    passengers: 2,
    departureDate: "2025-05-15T08:30:00.000+00:00",
    flightNumber: "VN254",
    from: "Hồ Chí Minh",
    to: "Hà Nội",
    class: "Thương gia",
    totalPrice: 5850000,
    createdAt: "2025-04-02T09:12:23.456+00:00",
    updatedAt: "2025-04-02T09:12:23.456+00:00",
  },
  {
    id: "67f385eb0281b4cb133bf29",
    name: "Do Thi Mai",
    email: "dtmai@gmail.com",
    phone: "0358762341",
    passengers: 3,
    departureDate: "2025-06-20T10:45:00.000+00:00",
    flightNumber: "VJ803",
    from: "Đà Nẵng",
    to: "Phú Quốc",
    class: "Phổ thông",
    totalPrice: 4270000,
    createdAt: "2025-04-05T16:45:12.789+00:00",
    updatedAt: "2025-04-05T16:45:12.789+00:00",
  }
];

const Lookup = () => {
  const [activeTab, setActiveTab] = useState('hotel');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchField, setSearchField] = useState('email');
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [detailItem, setDetailItem] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  const handleSearch = () => {
    setHasSearched(true);
    
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    let results = [];
    const query = searchQuery.toLowerCase();

    if (activeTab === 'hotel') {
      results = mockHotelBookings.filter(item => 
        item[searchField].toString().toLowerCase().includes(query)
      );
    } else if (activeTab === 'cruise') {
      results = mockCruiseBookings.filter(item => 
        item[searchField].toString().toLowerCase().includes(query)
      );
    } else if (activeTab === 'flight') {
      const fieldMap = { 'email': 'email', 'phone': 'phone', 'bookingId': 'id' };
      results = mockFlightBookings.filter(item => 
        item[fieldMap[searchField]].toString().toLowerCase().includes(query)
      );
    }
    
    setSearchResults(results);
  };

  const showDetails = (item) => {
    setDetailItem(item);
    setShowDetail(true);
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(date);
  };

  const renderSearchResults = () => {
    if (!hasSearched) {
      return null;
    }

    if (searchResults.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="bg-gray-50 inline-flex rounded-full p-4 mb-4">
            <Info className="h-6 w-6 text-teal-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">Không tìm thấy kết quả</h3>
          <p className="text-gray-500">Vui lòng kiểm tra lại thông tin tra cứu</p>
        </div>
      );
    }

    if (activeTab === 'hotel') {
      return (
        <div className="space-y-4 mt-6">
          {searchResults.map((booking) => (
            <div key={booking.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div>
                  <h3 className="font-medium text-gray-900">{booking.hotelName}</h3>
                  <p className="text-sm text-gray-500">{booking.hotelLocation}</p>
                  <div className="flex items-center mt-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>
                      {formatDate(booking.checkInDate)} - {formatDate(booking.checkOutDate)}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Booking ID: <span className="font-mono">{booking.id.substring(0, 8)}...</span></p>
                  <p className="font-semibold text-teal-600 mt-1">{booking.totalPrice.toLocaleString('vi-VN')} VND</p>
                  <button
                    onClick={() => showDetails(booking)}
                    className="inline-flex items-center mt-2 text-sm font-medium text-teal-600 hover:text-teal-800"
                  >
                    Chi tiết <ArrowRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
    
    if (activeTab === 'cruise') {
      return (
        <div className="space-y-4 mt-6">
          {searchResults.map((booking) => (
            <div key={booking.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div>
                  <h3 className="font-medium text-gray-900">{booking.cruiseName}</h3>
                  <p className="text-sm text-gray-500">{booking.cruiseLocation}</p>
                  <div className="flex items-center mt-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{formatDate(booking.bookingDate)}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Booking ID: <span className="font-mono">{booking.id.substring(0, 8)}...</span></p>
                  <p className="font-semibold text-teal-600 mt-1">{booking.totalPrice.toLocaleString('vi-VN')} VND</p>
                  <button
                    onClick={() => showDetails(booking)}
                    className="inline-flex items-center mt-2 text-sm font-medium text-teal-600 hover:text-teal-800"
                  >
                    Chi tiết <ArrowRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
    
    if (activeTab === 'flight') {
      return (
        <div className="space-y-4 mt-6">
          {searchResults.map((booking) => (
            <div key={booking.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div>
                  <h3 className="font-medium text-gray-900">
                    {booking.from} <ArrowRight className="h-4 w-4 inline mx-1" /> {booking.to}
                  </h3>
                  <p className="text-sm text-gray-500">Chuyến bay: {booking.flightNumber} - {booking.class}</p>
                  <div className="flex items-center mt-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{formatDateTime(booking.departureDate)}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Booking ID: <span className="font-mono">{booking.id.substring(0, 8)}...</span></p>
                  <p className="font-semibold text-teal-600 mt-1">{booking.totalPrice.toLocaleString('vi-VN')} VND</p>
                  <button
                    onClick={() => showDetails(booking)}
                    className="inline-flex items-center mt-2 text-sm font-medium text-teal-600 hover:text-teal-800"
                  >
                    Chi tiết <ArrowRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
  };

  const renderDetailModal = () => {
    if (!detailItem || !showDetail) return null;
    
    let content;
    
    if (activeTab === 'hotel') {
      content = (
        <>
          <div className="bg-teal-50 p-4 rounded-lg mb-4">
            <h3 className="font-semibold text-teal-800 text-lg mb-1">{detailItem.hotelName}</h3>
            <p className="text-teal-700">{detailItem.hotelLocation}</p>
          </div>
          
          <div className="space-y-3 text-gray-700">
            <p className="flex justify-between border-b border-gray-100 pb-2">
              <span className="font-medium">Mã đặt phòng:</span>
              <span className="font-mono">{detailItem.id}</span>
            </p>
            <p className="flex justify-between border-b border-gray-100 pb-2">
              <span className="font-medium">Ngày đặt:</span>
              <span>{formatDateTime(detailItem.createdAt)}</span>
            </p>
            <p className="flex justify-between border-b border-gray-100 pb-2">
              <span className="font-medium">Nhận phòng:</span>
              <span>{formatDate(detailItem.checkInDate)}</span>
            </p>
            <p className="flex justify-between border-b border-gray-100 pb-2">
              <span className="font-medium">Trả phòng:</span>
              <span>{formatDate(detailItem.checkOutDate)}</span>
            </p>
            <p className="flex justify-between border-b border-gray-100 pb-2">
              <span className="font-medium">Số đêm:</span>
              <span>{detailItem.stayDuration} đêm</span>
            </p>
            <p className="flex justify-between border-b border-gray-100 pb-2">
              <span className="font-medium">Loại phòng:</span>
              <span>{detailItem.roomType}</span>
            </p>
            <p className="flex justify-between border-b border-gray-100 pb-2">
              <span className="font-medium">Số lượng khách:</span>
              <span>{detailItem.guests} người</span>
            </p>
            <p className="flex justify-between border-b border-gray-100 pb-2">
              <span className="font-medium">Người đặt:</span>
              <span>{detailItem.name}</span>
            </p>
            <p className="flex justify-between border-b border-gray-100 pb-2">
              <span className="font-medium">Email:</span>
              <span>{detailItem.email}</span>
            </p>
            <p className="flex justify-between border-b border-gray-100 pb-2">
              <span className="font-medium">Số điện thoại:</span>
              <span>{detailItem.phone}</span>
            </p>
            <p className="flex justify-between font-semibold text-lg text-teal-700 pt-2">
              <span>Tổng tiền:</span>
              <span>{detailItem.totalPrice.toLocaleString('vi-VN')} VND</span>
            </p>
          </div>
        </>
      );
    } else if (activeTab === 'cruise') {
      content = (
        <>
          <div className="bg-teal-50 p-4 rounded-lg mb-4">
            <h3 className="font-semibold text-teal-800 text-lg mb-1">{detailItem.cruiseName}</h3>
            <p className="text-teal-700">{detailItem.cruiseLocation}</p>
          </div>
          
          <div className="space-y-3 text-gray-700">
            <p className="flex justify-between border-b border-gray-100 pb-2">
              <span className="font-medium">Mã đặt du thuyền:</span>
              <span className="font-mono">{detailItem.id}</span>
            </p>
            <p className="flex justify-between border-b border-gray-100 pb-2">
              <span className="font-medium">Ngày đặt:</span>
              <span>{formatDateTime(detailItem.createdAt)}</span>
            </p>
            <p className="flex justify-between border-b border-gray-100 pb-2">
              <span className="font-medium">Ngày khởi hành:</span>
              <span>{formatDate(detailItem.bookingDate)}</span>
            </p>
            <p className="flex justify-between border-b border-gray-100 pb-2">
              <span className="font-medium">Số lượng khách:</span>
              <span>{detailItem.guests} người</span>
            </p>
            <p className="flex justify-between border-b border-gray-100 pb-2">
              <span className="font-medium">Người đặt:</span>
              <span>{detailItem.name}</span>
            </p>
            <p className="flex justify-between border-b border-gray-100 pb-2">
              <span className="font-medium">Email:</span>
              <span>{detailItem.email}</span>
            </p>
            <p className="flex justify-between border-b border-gray-100 pb-2">
              <span className="font-medium">Số điện thoại:</span>
              <span>{detailItem.phone}</span>
            </p>
            <p className="flex justify-between font-semibold text-lg text-teal-700 pt-2">
              <span>Tổng tiền:</span>
              <span>{detailItem.totalPrice.toLocaleString('vi-VN')} VND</span>
            </p>
          </div>
        </>
      );
    } else if (activeTab === 'flight') {
      content = (
        <>
          <div className="bg-teal-50 p-4 rounded-lg mb-4">
            <h3 className="font-semibold text-teal-800 text-lg mb-1">
              {detailItem.from} <ArrowRight className="h-4 w-4 inline mx-1" /> {detailItem.to}
            </h3>
            <p className="text-teal-700">Chuyến bay: {detailItem.flightNumber}</p>
          </div>
          
          <div className="space-y-3 text-gray-700">
            <p className="flex justify-between border-b border-gray-100 pb-2">
              <span className="font-medium">Mã đặt vé:</span>
              <span className="font-mono">{detailItem.id}</span>
            </p>
            <p className="flex justify-between border-b border-gray-100 pb-2">
              <span className="font-medium">Ngày đặt:</span>
              <span>{formatDateTime(detailItem.createdAt)}</span>
            </p>
            <p className="flex justify-between border-b border-gray-100 pb-2">
              <span className="font-medium">Ngày khởi hành:</span>
              <span>{formatDateTime(detailItem.departureDate)}</span>
            </p>
            <p className="flex justify-between border-b border-gray-100 pb-2">
              <span className="font-medium">Hạng ghế:</span>
              <span>{detailItem.class}</span>
            </p>
            <p className="flex justify-between border-b border-gray-100 pb-2">
              <span className="font-medium">Số hành khách:</span>
              <span>{detailItem.passengers} người</span>
            </p>
            <p className="flex justify-between border-b border-gray-100 pb-2">
              <span className="font-medium">Người đặt:</span>
              <span>{detailItem.name}</span>
            </p>
            <p className="flex justify-between border-b border-gray-100 pb-2">
              <span className="font-medium">Email:</span>
              <span>{detailItem.email}</span>
            </p>
            <p className="flex justify-between border-b border-gray-100 pb-2">
              <span className="font-medium">Số điện thoại:</span>
              <span>{detailItem.phone}</span>
            </p>
            <p className="flex justify-between font-semibold text-lg text-teal-700 pt-2">
              <span>Tổng tiền:</span>
              <span>{detailItem.totalPrice.toLocaleString('vi-VN')} VND</span>
            </p>
          </div>
        </>
      );
    }
    
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Chi tiết đặt chỗ</h2>
              <button 
                onClick={() => setShowDetail(false)} 
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {content}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <SectionHeader
        title="Tra cứu đặt chỗ"
        description="Kiểm tra thông tin đặt phòng khách sạn, tour du thuyền hoặc vé máy bay của bạn"
        className="mb-8"
      />

      <div className="bg-white shadow-sm rounded-xl p-6 mb-8">
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('hotel')}
            className={`flex items-center px-4 py-2 border-b-2 font-medium text-sm ${
              activeTab === 'hotel' 
                ? 'border-teal-500 text-teal-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Hotel className="h-5 w-5 mr-2" />
            Khách sạn
          </button>
          <button
            onClick={() => setActiveTab('cruise')}
            className={`flex items-center px-4 py-2 border-b-2 font-medium text-sm ${
              activeTab === 'cruise' 
                ? 'border-teal-500 text-teal-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Ship className="h-5 w-5 mr-2" />
            Du thuyền
          </button>
          <button
            onClick={() => setActiveTab('flight')}
            className={`flex items-center px-4 py-2 border-b-2 font-medium text-sm ${
              activeTab === 'flight' 
                ? 'border-teal-500 text-teal-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Plane className="h-5 w-5 mr-2" />
            Chuyến bay
          </button>
        </div>

        {/* Search Form */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/4">
              <label htmlFor="searchField" className="block text-sm font-medium text-gray-700 mb-1">
                Tìm kiếm theo
              </label>
              <select
                id="searchField"
                value={searchField}
                onChange={(e) => setSearchField(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="email">Email</option>
                <option value="phone">Số điện thoại</option>
                <option value="id">Mã đặt chỗ</option>
              </select>
            </div>
            <div className="w-full md:w-3/4">
              <label htmlFor="searchQuery" className="block text-sm font-medium text-gray-700 mb-1">
                Thông tin tra cứu
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="searchQuery"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    searchField === 'email' ? 'Nhập email' : 
                    searchField === 'phone' ? 'Nhập số điện thoại' : 
                    'Nhập mã đặt chỗ'
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                <button
                  onClick={handleSearch}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-r-lg transition"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-teal-50 p-3 rounded-lg text-sm text-teal-700">
            <p className="flex items-start">
              <Info className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>Tra cứu thông tin đặt chỗ bằng email, số điện thoại hoặc mã đặt chỗ được cung cấp khi bạn hoàn tất đặt chỗ.</span>
            </p>
          </div>
        </div>
      </div>

      {/* Results Display */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Kết quả tra cứu</h3>
        {renderSearchResults()}
      </div>

      {/* Details Modal */}
      {renderDetailModal()}
    </div>
  );
};

export default Lookup;