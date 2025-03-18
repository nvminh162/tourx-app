import { Mail, ArrowLeft } from "lucide-react";
import halongbayImg from '../../assets/images/Hero/halongbay.png'
import { useState } from "react";

const ForgetPassword = () => {
    const [emailSent, setEmailSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle password reset logic here
        setEmailSent(true);
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src={halongbayImg}
                    alt="Travel background"
                    className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Forgot Password Form */}
            <div className="relative z-10 w-full max-w-md p-8 mx-4 rounded-lg backdrop-blur-sm bg-white/20">
                <button
                    onClick={() => window.history.back()}
                    className="inline-flex items-center text-gray-700 hover:text-gray-900 mb-6"
                >
                    <ArrowLeft size={16} className="mr-2" />
                    Quay lại đăng nhập
                </button>

                <h1 className="text-3xl font-semibold text-center mb-4 text-gray-800">Quên mật khẩu</h1>
                <p className="text-center text-gray-700 mb-8">
                    {emailSent
                        ? "Kiểm tra email của bạn để biết liên kết đặt lại"
                        : "Nhập email của bạn và chúng tôi sẽ gửi cho bạn một liên kết để đặt lại mật khẩu"}
                </p>

                {!emailSent ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative">
                            <input
                                type="email"
                                id="email"
                                placeholder="Địa chỉ Email"
                                className="w-full p-3 pl-4 pr-10 rounded-md bg-white/70 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                                required
                            />
                            <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-full transition duration-200"
                        >
                            Gửi liên kết đặt lại
                        </button>
                    </form>
                ) : (
                    <div className="text-center">
                        <div className="bg-green-100 text-green-800 p-4 rounded-md mb-6">
                            Chúng tôi đã gửi liên kết đặt lại mật khẩu đến địa chỉ email của bạn.
                        </div>
                        <button
                            onClick={() => setEmailSent(false)}
                            className="w-full py-3 px-4 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-full transition duration-200"
                        >
                            Gửi lại Email
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForgetPassword
