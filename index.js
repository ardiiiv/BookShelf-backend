import express from "express"
import dotenv from "dotenv"

dotenv.config();

const app = express();

// middleware start
app.use(express.json())
// middleware end

// router start
app.use("/", (req, res) => {
    res.send("<h1>Hello World!!</h1>")
});
// router end

const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

app.listen(port, host, () => {
    console.log(`Example app listening on port http://${host}:${port}`);
})