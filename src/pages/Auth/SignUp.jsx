import { useState } from "react";
import { Eye, EyeOff, User, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import halongbayImg from '../../assets/images/Hero/halongbay.png'

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Signup submitted");
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

            {/* Signup Form */}
            <div className="relative z-10 w-full max-w-md p-8 mx-4 rounded-lg backdrop-blur-sm bg-white/20">
                <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">ĐĂNG KÝ</h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="relative">
                        <input type="text" id="fullname" placeholder="Tên đầy đủ" required
                            className="w-full p-3 pl-4 pr-10 rounded-md bg-white/70 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                        <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                    </div>

                    <div className="relative">
                        <input type="email" id="email" placeholder="Địa chỉ Email" required
                            className="w-full p-3 pl-4 pr-10 rounded-md bg-white/70 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                        <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                    </div>

                    <div className="relative">
                        <input type={showPassword ? "text" : "password"} id="password" placeholder="Mật khẩu" required
                            className="w-full p-3 pl-4 pr-10 rounded-md bg-white/70 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                        <button type="button" onClick={togglePasswordVisibility}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    <div className="relative">
                        <input type={showConfirmPassword ? "text" : "password"} id="confirmPassword" placeholder="Nhập lại mật khẩu" required
                            className="w-full p-3 pl-4 pr-10 rounded-md bg-white/70 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                        <button type="button" onClick={toggleConfirmPasswordVisibility}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    <button type="submit"
                        className="w-full py-3 px-4 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-full transition duration-200">
                        Đăng ký
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-700">
                    Bạn đã có tài khoản?{" "}
                    <Link to="/auth" className="font-medium hover:underline">
                        Đăng nhập
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;