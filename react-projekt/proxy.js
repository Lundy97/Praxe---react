import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const BASE_URL = "https://sandbox.crmcarecloud.com/webservice/rest-api/customer-interface/v1.0";
const APP_ID = "85d6598db0bf3f62afd5db8507";

// 1) Token
app.post("/api/tokens", async (req, res) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/tokens`,
            {}, // prázdné tělo
            { headers: { "X-External-App-Id": APP_ID } }
        );

        res.json(response.data);
    } catch (err) {
        console.error("Token error:", err.response?.data || err.message);
        res.status(500).json({ error: "Token request failed" });
    }
});

// 2) Customers
app.get("/api/customers", async (req, res) => {
    try {
        const token = req.headers.authorization?.replace("Bearer ", "");

        const response = await axios.get(`${BASE_URL}/customers`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        res.json(response.data);
    } catch (err) {
        console.error("Customer error:", err.response?.data || err.message);
        res.status(500).json({ error: "Customer request failed" });
    }
});

app.listen(3000, () => {
    console.log("Proxy běží na http://localhost:3000");
});
