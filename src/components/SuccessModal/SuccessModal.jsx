import PropTypes from 'prop-types';

const SuccessModal = ({ onClose }) => (
    <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[999]"
        tabIndex="-1"
        data-testid="overlay"
        data-popup="modal"
    >
        <div className="relative m-auto bg-white rounded-xl shadow-lg p-6 w-full max-w-sm text-center">
            {/* Nút đóng */}
            <button className="absolute top-4 right-4" onClick={onClose} aria-label="Đóng">
                <img src="/src/assets/images/Contact/btnClose.png" alt="close" />
            </button>

            {/* Nội dung modal */}
            <div className="flex flex-col gap-6 items-center">
                <img src="/src/assets/images/Contact/FormModal.png" alt="Success" className="w-40 h-auto mx-auto" />
                <h5 className="text-xl font-bold text-gray-900">Yêu cầu của bạn đã được gửi thành công</h5>
                <p className="text-gray-600 text-base">Mixivivu sẽ liên hệ với bạn</p>
            </div>
        </div>
    </div>
);

SuccessModal.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default SuccessModal;
