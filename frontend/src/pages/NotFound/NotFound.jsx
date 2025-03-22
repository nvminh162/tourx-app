import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import config from "../../config"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

const NotFound = () => (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
            <motion.div
                className="text-center lg:text-left lg:max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <motion.h1
                    className="text-5xl font-bold text-gray-900 sm:text-7xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <motion.span
                        className="block text-primary-base"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <FontAwesomeIcon icon={faSearch}/> {" "} 404 
                    </motion.span>
                    <motion.span
                        className="block mt-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        Trang không tìm thấy
                    </motion.span>
                </motion.h1>
                <motion.p
                    className="mt-6 text-xl text-gray-600"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    Có vẻ như bạn đã lạc đường trong hành trình khám phá. Điểm đến bạn đang tìm kiếm không tồn tại hoặc đã được di
                    chuyển.
                </motion.p>
                <motion.div
                    className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <Link
                        to={config.routes.home}
                        className="w-full sm:w-auto rounded-md bg-primary-light px-6 py-3 text-base font-medium text-black shadow-sm hover:bg-primary-base hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                    >
                        Quay về trang chủ
                    </Link>
                    <Link
                        to={config.routes.contact}
                        className="w-full sm:w-auto rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                    >
                        Liên hệ hỗ trợ
                    </Link>
                </motion.div>
            </motion.div>

            <motion.div
                className="w-full max-w-md lg:max-w-lg xl:max-w-xl relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
            >
                <div className="relative">
                    <motion.div
                        className="absolute inset-0 bg-blue-100 rounded-full opacity-30 blur-3xl"
                        animate={{
                            scale: [1, 1.05, 1],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse",
                        }}
                    ></motion.div>
                    <motion.img
                        src="/images/travel-404-blue-3.png"
                        alt="Travel illustration with blue theme"
                        className="relative z-10 w-full h-auto"
                        animate={{
                            y: [0, -15, 0],
                            rotate: [0, 2, 0, -2, 0],
                        }}
                        transition={{
                            duration: 6,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse",
                        }}
                        onError={(e) => {
                            e.target.onerror = null
                            e.target.src =
                                "https://img.freepik.com/free-vector/organic-flat-page-found-illustration_23-2148955260.jpg"
                        }}
                    />
                </div>

                {/* Decorative elements - travel themed */}
                <motion.div
                    className="absolute top-1/4 left-1/4 w-6 h-6 rounded-full bg-primary-base"
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                    }}
                ></motion.div>
                <motion.div
                    className="absolute bottom-1/3 right-1/4 w-4 h-4 rounded-full bg-primary-base"
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                        delay: 1,
                    }}
                ></motion.div>
                <motion.div
                    className="absolute top-1/2 right-1/3 w-3 h-3 rounded-full bg-primary-base"
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                        delay: 2,
                    }}
                ></motion.div>
            </motion.div>
        </div>
    </div>
)

export default NotFound;
