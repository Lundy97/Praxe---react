import React from "react";
import { Layout } from "antd";
import SiteHeader from "./components/SiteHeader";
import LoginPage from "./components/LoginPage.jsx";
import SiteFooter from "./components/SiteFooter.jsx";
import {BrowserRouter} from "react-router-dom";

const { Content } = Layout;

export default function App() {
  return (
      <BrowserRouter>
        <Layout style={{ minHeight: "100vh", background: "#CBDEE6" }}>
            <SiteHeader/>
                <Content style={{ padding: "125px 16px 20px" }}>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                <LoginPage/>
                        </div>
                </Content>
            <SiteFooter/>
        </Layout>
      </BrowserRouter>
  );
}
