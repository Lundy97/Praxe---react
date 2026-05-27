import React, { useState } from "react";
import { Form, Input, Button, Modal } from "antd";
import { LockOutlined } from "@ant-design/icons";
import axios from "axios";

export default function Page() {
    const [popupVisible, setPopupVisible] = useState(false);
    const [outEmail, setOutEmail] = useState("");
    const [outPassword, setOutPassword] = useState("");

    const onFinish = async (values) => {
        try {
            // 1) Token přes proxy
            const authRes = await axios.post("/api/tokens");
            const token = authRes.data.data.token_id;

            console.log("Token acquired:", token);

            // 2) Zákazníci přes proxy
            const userRes = await axios.get("/api/customers", {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log("Customer information received");
            console.dir(userRes.data.data.customers);

        } catch (error) {
            console.error("API Failed:");
            console.error(error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="login-container">
            <Form layout="vertical" onFinish={onFinish} requiredMark={false}>

                <Form.Item
                    label={<span className="label">Email<span className="required-star">*</span></span>}
                    name="email"
                    rules={[
                        { required: true, message: "Vyplňte prosím e-mail." },
                        { type: "email", message: "Zadejte platný e-mail ve formátu neco@domena.cz" }
                    ]}
                >
                    <Input className="styled-input" placeholder="Zadejte váš e-mail" size="large" />
                </Form.Item>

                <Form.Item
                    label={<span className="label">Heslo<span className="required-star">*</span></span>}
                    name="password"
                    rules={[{ required: true, message: "Vyplňte prosím heslo." }]}
                >
                    <Input.Password className="styled-password" placeholder="••••••••••" size="large" />
                </Form.Item>

                <a className="forgot-password" href="heslo.php">
                    <LockOutlined style={{ marginRight: 6 }} />
                    Zapomenuté heslo
                </a>

                <div className="actions">
                    <Button className="login-button" htmlType="submit">Přihlásit se</Button>

                    <div className="divider">
                        <span className="divider-text">nebo</span>
                    </div>

                    <Button className="register-button">Vytvořit nový účet Moje Amber</Button>

                    <div className="help-wrapper">
                        <span className="help-text">
                            Jste náš stávající dárce a nemůžete se přihlásit?
                            <a className="help-link" href="idk.php">Klikněte zde</a> a nastavte si heslo
                        </span>
                    </div>
                </div>
            </Form>
        </div>
    );
}
