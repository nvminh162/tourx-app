const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');

// Register user
const registerUser = asyncHandler(async(req, res) => {
    try {
        const { fullname, username, email, password, phone } = req.body;
        if (!fullname || !username || !email || !password || !phone) {
            return res.status(400).json({ message: "Thiếu thông tin đăng ký!" });
        }
        const userExists = await User.findOne({ $or: [{ email }, { username }, { phone }] });
        if (userExists) {
            return res.status(400).json({ message: "User đã tồn tại!" });
        }
        const newUser = new User({ fullname, username, email, password, phone });
        await newUser.save();
        res.status(201).json({
            message: 'Thêm user thành công!',
            user: newUser
        });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: "Email, username hoặc số điện thoại đã tồn tại!" });
        }
        res.status(500).json({ message: "Lỗi server!", error: err.message });
    }
});

// Login user
const loginUser = asyncHandler(async(req, res) => {
    const { username, password } = req.body;

    // Find user
    const user = await User.findOne({ username });
    if (!user) {
        res.status(404);
        throw new Error('Không tìm thấy tài khoản');
    }

    // Check password
    if (user.password !== password) {
        res.status(401);
        throw new Error('Mật khẩu không chính xác');
    }

    // Return user without password
    res.status(200).json({
        id: user._id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        phone: user.phone,
    });
});

// Get all users
const getUsers = asyncHandler(async(req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

// Get user by ID
const getUserById = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error('Không tìm thấy user!');
    }
    res.status(200).json(user);
});

// Update user
const updateUser = asyncHandler(async(req, res) => {
    const { fullname, username, email, password, phone } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
        req.params.id, { fullname, username, email, password, phone }, { new: true }
    );

    if (!updatedUser) {
        res.status(404);
        throw new Error('Không tìm thấy user!');
    }

    res.status(200).json({
        message: 'Cập nhật thành công!',
        updatedUser
    });
});

// Delete user
const deleteUser = asyncHandler(async(req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error('Không tìm thấy user!');
    }

    res.status(200).json({ message: 'Xóa user thành công!' });
});

module.exports = {
    registerUser,
    loginUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};