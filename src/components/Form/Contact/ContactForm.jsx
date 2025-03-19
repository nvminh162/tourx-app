import { useState } from 'react';
import PropTypes from 'prop-types';

const ContactForm = ({ onSuccess }) => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
        if (value.trim()) setErrors((prev) => ({ ...prev, [id]: '' }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Vui lòng nhập họ và tên';
        if (!formData.email.trim()) newErrors.email = 'Vui lòng nhập email';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email không hợp lệ';
        if (!formData.phone.trim()) newErrors.phone = 'Vui lòng nhập số điện thoại';
        if (!formData.message.trim()) newErrors.message = 'Vui lòng nhập nội dung';
        setErrors(newErrors);
        return !Object.keys(newErrors).length;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        console.log('Form Submitted:', formData);
        setFormData({ name: '', email: '', phone: '', message: '' });
        if (onSuccess) onSuccess();
    };

    const fields = [
        { id: 'name', label: 'Họ và tên', placeholder: 'Nhập họ và tên', type: 'text', colSpan: 'md:col-span-2' },
        { id: 'email', label: 'Email', placeholder: 'Nhập email', type: 'email' },
        { id: 'phone', label: 'Số điện thoại', placeholder: 'Nhập số điện thoại', type: 'text' },
        {
            id: 'message',
            label: 'Nội dung',
            placeholder: 'Nhập yêu cầu của bạn',
            type: 'textarea',
            colSpan: 'md:col-span-2',
        },
    ];

    return (
        <div className="relative w-full max-w-2xl mx-auto my-12 bg-white p-6 rounded-xl shadow-lg z-10">
            <h2 className="text-xl md:text-2xl font-bold mb-3 text-center text-gray-900">
                Khám phá Hạ Long cùng TourX
            </h2>
            <p className="text-center mb-8 text-gray-600 text-sm md:text-base">
                Liên hệ ngay để trải nghiệm hành trình tuyệt vời!
            </p>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
                {fields.map((field) => (
                    <div key={field.id} className={field.colSpan || ''}>
                        <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
                            {field.label} <span className="text-red-500">*</span>
                        </label>
                        {field.type === 'textarea' ? (
                            <textarea
                                id={field.id}
                                placeholder={field.placeholder}
                                rows="3"
                                value={formData[field.id]}
                                onChange={handleChange}
                                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 placeholder-gray-400 text-sm"
                            />
                        ) : (
                            <input
                                id={field.id}
                                type={field.type}
                                placeholder={field.placeholder}
                                value={formData[field.id]}
                                onChange={handleChange}
                                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 placeholder-gray-400 text-sm"
                            />
                        )}
                        {errors[field.id] && <p className="text-red-500 text-xs mt-1">{errors[field.id]}</p>}
                    </div>
                ))}
                <div className="md:col-span-2 mt-2">
                    <button
                        type="submit"
                        className="w-full bg-teal-600 py-3 text-white text-base font-semibold rounded-xl hover:bg-teal-700 transition duration-300"
                    >
                        Gửi yêu cầu →
                    </button>
                </div>
            </form>
        </div>
    );
};

ContactForm.propTypes = {
    onSuccess: PropTypes.func,
};

export default ContactForm;
