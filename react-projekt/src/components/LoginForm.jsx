import React, { useState } from "react";
import "/src/CSS/reset.css"
import { Form, Input, Button, Modal } from "antd";
import { LockOutlined } from "@ant-design/icons";
import "/src/CSS/Form.css";

export default function LoginForm() {
    const [popupVisible, setPopupVisible] = useState(false);
    const [outEmail, setOutEmail] = useState("");
    const [outPassword, setOutPassword] = useState("");

    const onFinish = (values) => {
        setOutEmail(values.email);
        setOutPassword(values.password);
        setPopupVisible(true);
    };

    return (
        <div className="login-container">
            <Form layout="vertical" onFinish={onFinish} requiredMark={false}>

                <Form.Item
                    label={
                        <span className="label">
                            Email<span className="required-star">*</span>
                        </span>
                    }
                    name="email"
                    rules={[
                        { required: true, message: "Vyplňte prosím e-mail." },
                        { type: "email", message: "Zadejte platný e-mail ve formátu neco@domena.cz" }
                    ]}
                >
                    <Input className="styled-input" placeholder="Zadejte váš e-mail" size="large" />
                </Form.Item>

                <Form.Item
                    label={
                        <span className="label">
                            Heslo<span className="required-star">*</span>
                        </span>
                    }
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

            <Modal
                open={popupVisible}
                onCancel={() => setPopupVisible(false)}
                footer={[
                    <Button key="close" type="primary" onClick={() => setPopupVisible(false)}>
                        Zavřít
                    </Button>
                ]}
                title="Zadal jsi:"
            >
                <p>E-mail: {outEmail}</p>
                <p>Heslo: {outPassword}</p>
            </Modal>
        </div>
    );
}
