import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin() {
        const response = await fetch("https://tvuj-backend.cz/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.token) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user_id", data.user_id);
            alert("Přihlášení proběhlo úspěšně");
        } else {
            alert("Špatný email nebo heslo");
        }
    }

    return (
        <div>
            <h2>Přihlášení</h2>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Heslo"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleLogin}>Přihlásit se</button>
        </div>
    );
}
