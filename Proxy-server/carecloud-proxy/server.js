import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const api = axios.create({
    baseURL: process.env.CARECLOUD_API,
    headers: {
        "Content-Type": "application/json",
        "X-External-Application-Id": process.env.CARECLOUD_APP_ID
    }
});

async function getToken() {
    const response = await api.post("/login", {
        email: process.env.CARECLOUD_EMAIL,
        password: process.env.CARECLOUD_PASSWORD
    });

    return response.data.data.token;
}

app.use("/proxy", async (req, res) => {
    try {
        const token = await getToken();

        const response = await api.request({
            url: req.url.replace("/proxy", ""),
            method: req.method,
            data: req.body,
            params: req.query,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        res.json(response.data);
    } catch (err) {
        console.error(err.response?.data || err);
        res.status(500).json({
            error: "Proxy error",
            details: err.response?.data || err.message
        });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Proxy běží na http://localhost:${process.env.PORT}`);
});
