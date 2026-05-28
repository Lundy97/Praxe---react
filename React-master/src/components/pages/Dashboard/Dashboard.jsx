import { useState } from "react";

function Dashboard() {
    const [email] = useState(() => localStorage.getItem("email") || "");
    const [token] = useState(() => localStorage.getItem("token") || "");
    const [customerId] = useState(() => localStorage.getItem("customer_id") || "");

    return (
        <div style={{ padding: "40px" }}>

            <div style={{ marginTop: "20px" }}>
                <h3>Email:</h3>
                <p style={{ color: "black", padding: "10px" }}>{email}</p>

                <h3>Token:</h3>
                <p style={{ wordBreak: "break-all" }}>{token}</p>

                <h3>Customer ID:</h3>
                <p>{customerId}</p>
            </div>
        </div>
    );
}

export default Dashboard;
