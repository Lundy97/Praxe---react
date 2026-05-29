import { Layout, Input } from 'antd';
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import './Dashboard.css';

const { Content } = Layout;

function Profile() {
    const location = useLocation();
    const navigate = useNavigate();

    // 1) Lokální kopie dat
    const [data, setData] = useState(null);

    useEffect(() => {
        if (!location.state?.info) {
            navigate('/', { replace: true });
        } else {
            // Uložíme data do state
            setData(location.state.info);
        }
    }, [location.state?.info, navigate]);

    if (!data) return null;

    const { personal_information, address_information } = data;

    // 2) Funkce pro lokální změny
    const updatePersonal = (field, value) => {
        setData(prev => ({
            ...prev,
            personal_information: {
                ...prev.personal_information,
                [field]: value
            }
        }));
    };

    const updateAddress = (field, value) => {
        setData(prev => ({
            ...prev,
            address_information: {
                ...prev.address_information,
                [field]: value
            }
        }));
    };

    return (
        <Content className="dashboard-container">
            <div className="info-card">
                <h1 className="title">
                    {personal_information?.salutation} zde jsou vaše údaje
                </h1>

                <div className="info-row">
                    <div className="label">Jméno</div>
                    <Input
                        value={personal_information?.first_name}
                        onChange={(e) => updatePersonal("first_name", e.target.value)}
                    />
                </div>

                <div className="info-row">
                    <div className="label">Příjmení</div>
                    <Input
                        value={personal_information?.last_name}
                        onChange={(e) => updatePersonal("last_name", e.target.value)}
                    />
                </div>

                <div className="info-row">
                    <div className="label">Email</div>
                    <Input
                        value={personal_information?.email}
                        onChange={(e) => updatePersonal("email", e.target.value)}
                    />
                </div>

                <div className="info-row">
                    <div className="label">Telefon</div>
                    <Input
                        value={personal_information?.phone || ""}
                        onChange={(e) => updatePersonal("phone", e.target.value)}
                    />
                </div>

                <div className="info-row">
                    <div className="label">Datum narození</div>
                    <Input
                        value={personal_information?.birthdate}
                        onChange={(e) => updatePersonal("birthdate", e.target.value)}
                    />
                </div>

                <div className="info-row">
                    <div className="label">Ulice</div>
                    <Input
                        value={address_information?.street || ""}
                        onChange={(e) => updateAddress("street", e.target.value)}
                    />
                </div>

                <div className="info-row">
                    <div className="label">Město</div>
                    <Input
                        value={address_information?.city || ""}
                        onChange={(e) => updateAddress("city", e.target.value)}
                    />
                </div>
            </div>
        </Content>
    );
}

export default Profile;
