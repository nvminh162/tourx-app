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

    return (
        <div className="container lg:w-6xl place-self-center">
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
                        <span className="text-gray-600">Thuê trọn tàu</span>
                        <button className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-full flex items-center gap-2 transition-colors">
                            <span>Đặt ngay</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CruiseRoom
