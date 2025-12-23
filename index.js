import express from "express"
import dotenv from "dotenv"
import { connectDB }  from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js"
import { errorHandler } from "./src/middleware/errorMiddleware.js";
import bookRoutes from "./src/routes/bookRoutes.js"
import cors from "cors"

dotenv.config();
connectDB();

const app = express();

// middleware start
app.use(express.json())
app.use(
    cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
  }));
// middleware end

// router start
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
// router end

// error start
app.use(errorHandler);
// error end

const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

app.listen(port, host, () => {
    console.log(`Example app listening on port http://${host}:${port}`);
})