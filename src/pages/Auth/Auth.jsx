import { useState } from "react";
import { Eye, EyeOff, User } from "lucide-react";
import halongbayImg from '../../assets/images/Hero/halongbay.png'

const Auth = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log("Login submitted");
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

            {/* Login Form */}
            <div className="relative z-10 w-full max-w-md p-8 mx-4 rounded-lg backdrop-blur-sm bg-white/20">
                <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">LOGIN</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <input
                            type="text"
                            id="username"
                            placeholder="Tài khoản"
                            className="w-full p-3 pl-4 pr-10 rounded-md bg-white/70 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            required
                        />
                        <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                    </div>

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            placeholder="Mật khẩu"
                            className="w-full p-3 pl-4 pr-10 rounded-md bg-white/70 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            required
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="remember"
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)}
                                className="w-4 h-4 border-gray-300 rounded focus:ring-gray-500"
                            />
                            <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                                Nhớ mật khẩu
                            </label>
                        </div>
                        <a href="/forgot-password" className="text-sm text-gray-700 hover:underline">
                            Quên mật khẩu?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-full transition duration-200"
                    >
                        Login
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-700">OR</p>
                    <p className="mt-6 text-gray-700">
                        Không có đăng nhập tài khoản?{" "}
                        <a href="/signup" className="font-medium hover:underline">
                            Đăng ký ngay
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Auth;
