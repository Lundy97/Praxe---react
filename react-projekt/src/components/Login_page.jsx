import { useState } from 'react';
import axios from 'axios';
import '/src/css/reset.css';
import '/src/css/index.css';
import { Layout, Input, Divider, Form, Modal } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { validateAndShow } from '/src/Modal.js';

const { Content } = Layout;

function Login_page() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleOk = () => setIsModalOpen(false);
    const showModal = () => setIsModalOpen(true);

    const onFinish = async (values) => {
        setFormData(values);

        validateAndShow(values, showModal);


        const BASE_URL = 'http://localhost:3000';
        const APP_ID = '85d6598db0bf3f62afd5db8507';

        try {
            const authRes = await axios.post(`${BASE_URL}/tokens`,
                {
                    "setup": {
                        "setup_id":"1",
                        "language_id": "cs",
                        "allowed_gps": "false",
                        "allowed_notifications": false
                    },
                    "device": {
                        "device_id": "my-unique-web-id-001",
                        "device_type": "7",
                        "device_system": "Web",
                        "device_name": "Firefox"
                    },
                    "user": {
                        "login": values.email,
                        "password": values.password,
                    },
                    "properties": ["customer"],
                    'X-External-App-Id': APP_ID
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept-Language': 'cs'
                    }
                }
            );

            const token = authRes.data.data.token_id;
            console.log("Token acquired:", token);


            const userLogin = await axios.post(`${BASE_URL}/tokens/${token}/actions/login`, {
                    "login_type":"email",
                    "login_value":values.email,
                    "password":values.password,
                    "X-External-App-Id": APP_ID
                },

                {
                    headers: {
                        "Authorization": "Bearer " + token,
                        'Content-Type': 'application/json',
                        'Accept-Language': 'cs'
                    }

                });
            const customer = userLogin.data.data.customer_id;
            console.log("customer ID:", customer);

            const userRes = await axios.get(`${BASE_URL}/customers/${customer}`, {
                headers: {
                    "Authorization": "Bearer " + token,
                    'X-External-App-Id': APP_ID,
                    'Content-Type': 'application/json',
                    'Accept-Language': 'cs'
                }
            });



            console.log("Customer information received");
            console.dir(userRes.data.data.customers);

        } catch (error) {
            console.error("API Failed:");
            console.error(error.response ? error.response.data : error.message);
        }

    };

    return (
        <Content id="content">

            <Form layout="vertical" id="form" onFinish={onFinish}>
                <Form.Item
                    label="Email"
                    name="email"
                    className="input"
                    rules={[
                        { required: true, message: 'Nezadaný Email' },
                        { type: 'email', message: 'Špatný formát emailu' }
                    ]}
                >
                    <Input className="ins" placeholder="zadejte Váš Email" />
                </Form.Item>

                <Form.Item
                    className="input"
                    label="Heslo"
                    name="password"
                    rules={[{ required: true, message: 'Nezadané Heslo' }]}
                >
                    <Input.Password className="ins" placeholder="zadejte Vaše heslo" />
                </Form.Item>

                <a href="#"><LockOutlined /> Zapomenuté Heslo</a>

                <div id="choice">

                    <button type="submit" id="login">Přihlásit se</button>
                    <Divider>nebo</Divider>
                    <button type="button" id="signin">Vytvořit nový účet Moje Amber</button>
                    <p className="mid-text">Jste náš stávající dárce a nemůžete se přihlásit?</p>
                    <p className="mid-text"><a className="mid-text" href="#">Klikněte zde</a> a nastavte si heslo.</p>
                </div>
            </Form>

            <Modal title="Vaše Informace" open={isModalOpen} onOk={handleOk} onCancel={handleOk}>
                <div className="modal-par">
                    <h2 className="modal-h">Email: </h2>
                    <p className="modal-p">{formData.email}</p>
                </div>
                <div className="modal-par">
                    <h2 className="modal-h">Heslo: </h2>
                    <p className="modal-p">{formData.password}</p>
                </div>
            </Modal>
        </Content>
    );
}
export default Login_page;