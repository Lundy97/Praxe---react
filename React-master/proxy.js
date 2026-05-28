import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" })); // React

const API_URL = "https://sandbox.crmcarecloud.com/webservice/rest-api/customer-interface/v1.0";
const APP_ID = "85d6598db0bf3f62afd5db8507";

async function safeRequest(promise) {
    try {
        const res = await promise;
        return {ok: true, data: res.data};
    } catch (err) {
        let msg = "Neznámá chyba";

        if (err.response) {
            msg = err.response.data?.message || `Server error: ${err.response.status}`;
        } else if (err.request) {
            msg = "Server neodpovídá.";
        } else {
            msg = err.message;
        }

        return {ok: false, error: msg};
    }
}

app.post("/login", async (req, res) => {
    const { email, password } = req.body;


    const tokenRes = await safeRequest(
        axios.post(`${API_URL}/tokens`, {
            setup: {
                setup_id: "1",
                language_id: "cs",
                allowed_gps: "false",
                allowed_notifications: false
            },
            device: {
                device_id: "my-unique-web-id-001",
                device_type: "7",
                device_system: "Web",
                device_name: "Firefox"
            },
            user: {
                login: email,
                password: password
            },
            properties: ["customer"],
            "X-External-App-Id": APP_ID
        })
    );

    if (!tokenRes.ok) {
        return res.json({ success: false, message: "Špatný email nebo heslo." });
    }

    const token = tokenRes.data.data.token_id;

    const loginRes = await safeRequest(
        axios.post(`${API_URL}/tokens/${token}/actions/login`, {
            login_type: "email",
            login_value: email,
            password: password,
            "X-External-App-Id": APP_ID
        }, {
            headers: { Authorization: "Bearer " + token }
        })
    );

    if (!loginRes.ok) {
        return res.json({ success: false, message: "Přihlášení selhalo." });
    }

    const customerId = loginRes.data.data.customer_id;

    const userRes = await safeRequest(
        axios.get(`${API_URL}/customers/${customerId}`, {
            headers: {
                Authorization: "Bearer " + token,
                "X-External-App-Id": APP_ID
            }
        })
    );

    if (!userRes.ok) {
        return res.json({ success: false, message: "Nepodařilo se načíst data uživatele." });
    }
    return res.json({
        success: true,
        redirectUrl: "/dashboard",
        customer: userRes.data.data.customers,
        email: email,
        token: token,
        customer_id: customerId
    });
});

app.listen(3001, () => {
    console.log("Backend běží na http://localhost:3001");
});