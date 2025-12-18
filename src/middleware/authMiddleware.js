import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
    let token;

  // 1. Ambil token dari header Authorization
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

  // 2. Jika tidak ada token
    if (!token) {
        return res.status(401).json({
        message: "Tidak ada token, akses ditolak",
        });
    }

    try {
        // 3. Verifikasi token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4. Ambil user dari database (tanpa password)
        req.user = await User.findById(decoded.id).select("-password");

        next(); // lanjut ke controller
    } catch (error) {
        res.status(401).json({
        message: "Token tidak valid",
        });
    }
};
