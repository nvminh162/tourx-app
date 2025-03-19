import PropTypes from 'prop-types';
import closeIcon from '../../assets/images/Contact/close-icon.png'; // Giả định đường dẫn
import successImage from '../../assets/images/Contact/success-image.png'; // Giả định đường dẫn

const SuccessModal = ({ onClose }) => {
    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]"
            role="dialog"
            aria-modal="true"
            tabIndex="-1"
        >
            <div className="relative bg-white rounded-xl shadow-lg p-6 w-full max-w-sm text-center">
                <button className="absolute top-2 right-2" onClick={onClose} aria-label="Đóng">
                    <img src={closeIcon} alt="Đóng" className="w-5 h-5" />
                </button>
                <div className="flex flex-col gap-4 items-center">
                    <img src={successImage} alt="Thành công" className="w-32 h-auto mx-auto" />
                    <h5 className="text-lg font-bold text-gray-900">Yêu cầu của bạn đã được gửi thành công</h5>
                    <p className="text-gray-600 text-sm">TourX sẽ liên hệ với bạn sớm nhất!</p>
                </div>
            </div>
        </div>
    );
};

SuccessModal.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default SuccessModal;
