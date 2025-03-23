const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Thêm user
router.post("/", async (req, res) => {
  try {
    const { fullname, username, email, password } = req.body;
    const newUser = new User({ fullname, username, email, password });
    await newUser.save();
    res.status(201).json({ message: "Thêm user thành công!", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server!" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy tài khoản" });
    }

    // Check password
    if (user.password !== password) {
      return res.status(401).json({ message: "Mật khẩu không chính xác" });
    }

    // Return user info (without password)
    res.status(200).json({
      id: user._id,
      fullname: user.fullname,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
  }
});

// Lấy danh sách user
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server!" });
  }
});

// Lấy thông tin user theo ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "Không tìm thấy user!" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server!" });
  }
});

// Cập nhật user
router.put("/:id", async (req, res) => {
  try {
    const { fullname, username, email, password } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { fullname, username, email, password },
      { new: true }
    );
    res.status(200).json({ message: "Cập nhật thành công!", updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server!" });
  }
});

// Xóa user
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Xóa user thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server!" });
  }
});

module.exports = router;
