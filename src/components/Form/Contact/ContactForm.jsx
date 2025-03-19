import { useState } from 'react';
import emailjs from '@emailjs/browser';
import PropTypes from 'prop-types';
import Button from '../../../components/Button';

const ContactForm = ({ onSuccess }) => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [errors, setErrors] = useState({});

    // Kiểm tra từng trường dữ liệu
    const validateField = (id, value) => {
        switch (id) {
            case 'name':
                return value.trim() ? '' : 'Vui lòng nhập họ và tên';
            case 'email':
                if (!value.trim()) return 'Vui lòng nhập email';
                return /\S+@\S+\.\S+/.test(value) ? '' : 'Email không hợp lệ';
            case 'phone':
                if (!value.trim()) return 'Vui lòng nhập số điện thoại';
                return /^\d+$/.test(value) ? '' : 'Số điện thoại phải là số';
            case 'message':
                return value.trim() ? '' : 'Vui lòng nhập nội dung';
            default:
                return '';
        }
    };

    // Kiểm tra toàn bộ form
    const validateForm = () => {
        const newErrors = {};
        for (const key in formData) {
            const error = validateField(key, formData[key]);
            if (error) newErrors[key] = error;
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));

        // Kiểm tra lỗi khi người dùng nhập
        const error = validateField(id, value);
        setErrors((prev) => ({ ...prev, [id]: error }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            // Gửi email bằng EmailJS
            await emailjs.send(
                'service_lbmcq2y', // Thay bằng SERVICE_ID của bạn
                'template_semmbij', // Thay bằng TEMPLATE_ID của bạn
                formData,
                'YPGeUl2DtPjPx1O5z', // Thay bằng PUBLIC_KEY của bạn
            );
            console.log('Email đã được gửi thành công!');
            setFormData({ name: '', email: '', phone: '', message: '' });
            if (onSuccess) onSuccess();
        } catch (error) {
            console.error('Lỗi khi gửi email:', error);
            console.log('Đã xảy ra lỗi khi gửi email.');
        }
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
                Khám phá Hạ Long cùng TourX - Hãy liên hệ ngay để trải nghiệm hành trình tuyệt vời!
            </p>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
                {fields.map((field) => (
                    <div key={field.id} className={field.colSpan || ''}>
                        <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
                            {field.label} <span className="text-red-500">*</span>
                        </label>
                        <div className="flex w-full items-center rounded-3xl bg-white border border-gray-300 pl-4 shadow-sm focus-within:ring-2 focus-within:ring-teal-400 transition-all">
                            {field.type === 'textarea' ? (
                                <textarea
                                    id={field.id}
                                    placeholder={field.placeholder}
                                    rows="3"
                                    value={formData[field.id]}
                                    onChange={handleChange}
                                    className="px-4 py-3 block w-full bg-transparent text-base text-gray-900 placeholder:text-gray-400 focus:outline-none"
                                />
                            ) : (
                                <input
                                    id={field.id}
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    value={formData[field.id]}
                                    onChange={handleChange}
                                    className="px-4 py-3 block w-full bg-transparent text-base text-gray-900 placeholder:text-gray-400 focus:outline-none"
                                />
                            )}
                        </div>
                        {errors[field.id] && <p className="text-red-500 text-xs mt-1">{errors[field.id]}</p>}
                    </div>
                ))}
                <div className="md:col-span-2 mt-2">
                    <Button
                        primary
                        rounded
                        type="submit"
                        className="w-full bg-teal-600 py-3 text-white text-base font-semibold rounded-xl hover:bg-teal-700 transition duration-300"
                    >
                        Gửi yêu cầu đến TourX
                    </Button>
                </div>
            </form>
        </div>
    );
};

ContactForm.propTypes = {
    onSuccess: PropTypes.func,
};

export default ContactForm;
