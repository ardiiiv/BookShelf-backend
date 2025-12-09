import express from "express"

const app = express();
const port = 3000;
const host = "localhost";

app.use("/", (req, res) => {
    res.send("<h1>Hello World!!</h1>")
});

app.listen(port, host, () => {
    console.log(`Example app listening on port http://${host}:${port}`);
})