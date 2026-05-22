import React from "react";
import { Layout } from "antd";
import SiteHeader from "./components/SiteHeader";
import LoginForm from "./components/LoginForm";
import SiteFooter from "./components/SiteFooter.jsx";

const { Content } = Layout;

export default function App() {
  return (
      <Layout style={{ minHeight: "100vh", background: "#CBDEE6" }}>
        <SiteHeader />
        <Content style={{ padding: "125px 16px 20px" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <LoginForm />
          </div>
        </Content>
        <SiteFooter />
      </Layout>
  );
}
