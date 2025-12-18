import express from "express"
import dotenv from "dotenv"
import { connectDB }  from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js"

dotenv.config();
connectDB();

const app = express();

// middleware start
app.use(express.json())
// middleware end

// router start
app.use("/api/auth", authRoutes);
// router end

const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

app.listen(port, host, () => {
    console.log(`Example app listening on port http://${host}:${port}`);
})