import { useState } from 'react';
import SuccessModal from '../../SuccessModal/SuccessModal';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    if (value.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, [id]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Bạn phải nhập họ và tên';
    if (!formData.email.trim()) newErrors.email = 'Bạn phải nhập email';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email không hợp lệ';
    if (!formData.phone.trim()) newErrors.phone = 'Bạn phải nhập số điện thoại';
    if (!formData.message.trim()) newErrors.message = 'Bạn cần nhập nội dung yêu cầu của bạn';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    console.log('Form Data:', formData);

    setFormData({ name: '', email: '', phone: '', message: '' });
    setShowSuccessModal(true);
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto my-12 bg-white md:p-6 rounded-xl shadow-lg z-10">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-center text-gray-900">
        Khám phá Hạ Long thông qua Du thuyền
      </h2>
      <p className="text-center mb-6 text-gray-600">
        Khám phá Hạ Long cùng TourX - Liên hệ ngay để trải nghiệm hành trình tuyệt vời!
      </p>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
        {['name', 'email', 'phone'].map((field) => (
          <div key={field} className={field === 'name' ? 'md:col-span-2' : ''}>
            <label htmlFor={field} className="block text-sm font-medium text-gray-700">
              {field === 'name' ? 'Họ và tên' : field === 'email' ? 'Email' : 'Số điện thoại'}
              <span className="text-red-500">*</span>
            </label>
            <input
              id={field}
              type={field === 'email' ? 'email' : 'text'}
              placeholder={`Nhập ${field === 'name' ? 'họ và tên' : field}`}
              value={formData[field]}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 placeholder-gray-400"
            />
            {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
          </div>
        ))}

        <div className="md:col-span-2">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Nội dung <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            placeholder="Nhập yêu cầu của bạn"
            rows="3"
            value={formData.message}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 placeholder-gray-400"
          />
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-teal-500 py-2 text-white text-base font-semibold rounded-2xl hover:bg-teal-600 transition duration-300"
            onClick={handleScrollTop}
          >
            Liên hệ với Mixivivu
          </button>
        </div>
      </form>

      {showSuccessModal && <SuccessModal onClose={() => setShowSuccessModal(false)} />}
    </div>
  );
};

export default ContactForm;
