import React, { useState } from "react";
import { Form, Input, Button, Modal } from "antd";
import { LockOutlined } from "@ant-design/icons";
import styled from "styled-components";

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
        <LoginContainer>
            <Form form={Form.useForm()[0]} layout="vertical" onFinish={onFinish} requiredMark={false}>

                {/* Email */}
                <Form.Item
                    label={
                        <Label>
                            Email<RequiredStar>*</RequiredStar>
                        </Label>
                    }
                    name="email"
                    rules={[
                        { required: true, message: "Vyplňte prosím e-mail." },
                        { type: "email", message: "Zadejte platný e-mail ve formátu neco@domena.cz" }
                    ]}
                >
                    <StyledInput placeholder="Zadejte váš e-mail" size="large" />
                </Form.Item>

                {/* Heslo */}
                <Form.Item
                    label={
                        <Label>
                            Heslo<RequiredStar>*</RequiredStar>
                        </Label>
                    }
                    name="password"
                    rules={[{ required: true, message: "Vyplňte prosím heslo." }]}
                >
                    <StyledPassword placeholder="••••••••••" size="large" />
                </Form.Item>

                {/* Zapomenuté heslo */}
                <ForgotPassword href="heslo.php">
                    <LockOutlined style={{ marginRight: 6 }} />
                    Zapomenuté heslo
                </ForgotPassword>

                {/* Tlačítka */}
                <Actions>
                    <LoginButton htmlType="submit">Přihlásit se</LoginButton>

                    <Divider>
                        <DividerText>nebo</DividerText>
                    </Divider>

                    <RegisterButton>Vytvořit nový účet Moje Amber</RegisterButton>

                    <HelpWrapper>
                        <HelpText>
                            Jste náš stávající dárce a nemůžete se přihlásit?
                            <HelpLink href="idk.php">Klikněte zde</HelpLink> a nastavte si heslo
                        </HelpText>
                    </HelpWrapper>
                </Actions>
            </Form>

            {/* Popup */}
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
        </LoginContainer>
    );
}

/* ------------------------------------------
   Styled Components
------------------------------------------- */

const LoginContainer = styled.div`
  color: #194564;
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.span`
  font-size: 16px;
  display: flex;
  align-items: center;
`;

const RequiredStar = styled.span`
  color: #b90e49;
  margin-left: 4px;
`;

const StyledInput = styled(Input)`
  line-height: 50px;
  padding-left: 15px;
  font-size: 18px;
`;

const StyledPassword = styled(Input.Password)`
  line-height: 50px;
  padding-left: 15px;
  font-size: 18px;
`;

const ForgotPassword = styled.a`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  color: #194564;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
`;

const LoginButton = styled(Button)`
  width: 180px;
  border-radius: 25px;
  background-color: #b90e49 !important;
  border: 8px solid #B90E49 !important;  
  color: white !important;
  font-size: 18px;
  padding: 12px 0;
`;

const RegisterButton = styled(Button)`
  width: 320px;
  border-radius: 25px;
  background-color: #194564 !important;
  border: 12px solid #194564 !important;
  color: white !important;
  font-size: 18px;
  padding: 12px 0;
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  width: 300px;
  color: #555;

  &::before,
  &::after {
    content: "";
    flex: 1;
    border-bottom: 1.5px solid #999;
  }

  &::before {
    margin-right: 12px;
  }

  &::after {
    margin-left: 12px;
  }
`;

const DividerText = styled.span`
  display: flex;
  justify-content: center;
`;

const HelpWrapper = styled.div`
  max-width: 300px;
  text-align: center;
`;

const HelpText = styled.span`
  display: block;
  max-width: 340px;
    font-weight: 400;
`;

const HelpLink = styled.a`
  margin-left: 5px;
  color: #194564;
  text-decoration: underline;
`;