import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 1. Cek apakah email sudah ada
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Buat user baru
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // 4. Kirimkan token
    const token = generateToken(user);

    res.status(201).json({
      message: "Registrasi berhasil",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    });

  } catch (error) {
    res.status(500).json({ message: "Gagal registrasi", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Cari user berdasarkan email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email atau password salah" })
    }

    // 2. Cocokkan password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Email atau password salah" })
    }

    // 3. Generate token
    const token = generateToken(user);

    res.status(200).json({
      message: "Login berhasil",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Login gagal",
      error: error.message,
    });
  }
}

export const getMe = async (req, res) => {
  try {
    res.status(200).json({
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil data user",
    });
  }
};
