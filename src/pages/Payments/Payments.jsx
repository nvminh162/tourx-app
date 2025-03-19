import { useState, useEffect } from "react";
import qrcode from "../../assets/images/Payment/qr-code.jpg";

const Payments = () => {
    const [timeLeft, setTimeLeft] = useState(5 * 60);

    useEffect(() => {
        if (timeLeft === 0) return;
        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Hình thức thanh toán</h1>
            <div className="h-1 w-32 bg-teal-400 mb-6"></div>

            <div className="mb-8">
                <h2 className="font-medium mb-4">1. Thanh toán trực tuyến bằng mã QR:</h2>
                <p className="text-sm text-gray-600 mb-4">
                    Đối với vé máy bay, sau khi đặt vé thành công, quý khách chọn hình thức thanh toán trực tuyến qua QR trên
                    website. Khi thanh toán thành công, quý khách sẽ nhận được vé điện tử qua địa chỉ email của quý khách đã đăng ký.
                </p>

                <div className="border rounded-lg p-6 bg-blue-50 mb-4 max-w-3xl">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex flex-col items-center">
                            <div className={`text-2xl font-medium mb-2 ${timeLeft === 0 ? "text-red-500" : ""}`}>
                                {timeLeft > 0 ? `Còn lại: ${formatTime(timeLeft)}` : "Hết Hiệu Lực"}
                            </div>
                            <div className="bg-teal-100 p-3 rounded-lg border-4 border-teal-300 mb-2">
                                <div className="w-48 h-48 bg-white flex items-center justify-center">
                                    <img src={qrcode} alt="QR Code" />
                                </div>
                            </div>
                            <p className="text-sm text-gray-500">Quét mã để thanh toán</p>
                        </div>

                        <div className="flex-1">
                            <div className="mb-4">
                                <p className="text-sm text-gray-500">Số tiền</p>
                                <p className="text-2xl font-bold text-teal-600">1,956,000 VND</p>
                            </div>

                            <div className="mb-2">
                                <p className="text-sm text-gray-500">Số tài khoản</p>
                                <p className="font-medium">9353999798</p>
                            </div>

                            <div className="mb-2">
                                <p className="text-sm text-gray-500">Chủ khoản</p>
                                <p className="font-medium">NGUYEN VAN MINH</p>
                            </div>

                            <div className="mb-2">
                                <p className="text-sm text-gray-500">Ngân Hàng</p>
                                <p className="font-medium">VietcomBank</p>
                            </div>

                            <div className="mb-2">
                                <p className="text-sm text-gray-500">Nội dung chuyển khoản</p>
                                <p className="font-medium">tourxflight220302025</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                    <p className="text-sm text-gray-600">
                        Vui lòng chờ trong giây lát. Nếu bạn đã thanh toán mà vẫn chưa nhận được email, ấn chọn
                    </p>
                    <button className="bg-teal-500 text-white px-4 py-2 rounded-md text-sm">Đã thanh toán</button>
                </div>

                <div className="flex justify-between border-t pt-4">
                    <p className="text-sm">Phí dịch vụ</p>
                    <p className="text-sm">100,000 VND</p>
                </div>

                <div className="flex justify-between font-bold mt-2">
                    <p>Tổng tiền</p>
                    <p className="text-teal-600">1,956,000 VND</p>
                </div>
            </div>

            <div className="mb-8">
                <h2 className="font-medium mb-4">2. Thanh toán bằng chuyển khoản ngân hàng:</h2>
                <p className="mb-1">
                    <span className="text-sm text-gray-600">Tên tài khoản:</span> NGUYEN VAN MINH
                </p>
                <p className="mb-1">
                    <span className="text-sm text-gray-600">TK tài khoản:</span> 9353999798
                </p>
                <p className="mb-1">
                    <span className="text-sm text-gray-600">Tại:</span> Ngân hàng TMCP Ngoại thương Việt Nam
                </p>
                <p className="mb-1">
                    <span className="text-sm text-gray-600">Chi nhánh:</span> Chi nhánh Đông Đồng Nai
                </p>
            </div>

            <div className="mb-8">
                <h2 className="font-medium mb-4">3. Thanh toán tại văn phòng của TourX:</h2>
                <p className="mb-1">
                    <span className="text-sm text-gray-600">Địa chỉ:</span> 12 Nguyễn Văn Bảo, Phường 1, Quận Gò Vấp, TP.Hồ Chí
                </p>
                <p className="mb-1">
                    <span className="text-sm text-gray-600">Số điện thoại hotline:</span> 0353 999 798
                </p>
                <p className="mb-1">
                    <span className="text-sm text-gray-600">Giờ làm việc:</span> 9h00 – 17h30 (từ thứ 2 – đến thứ 6) và 9h00 –
                    12h00 (thứ 7)
                </p>
            </div>
        </div>
    );
};

export default Payments;
