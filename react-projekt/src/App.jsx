import React from "react";
import { Layout } from "antd";
import SiteHeader from "./components/SiteHeader";
import Page from "./components/Login_page.jsx";
import SiteFooter from "./components/SiteFooter.jsx";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

export default function App() {
  return (
      <Router>
        <Layout style={{ minHeight: "100vh", background: "#CBDEE6" }}>
            <SiteHeader/>
                <Routes>
                    <Route path={"/"} element={<Page />}/>
                </Routes>
            <SiteFooter/>
        </Layout>
      </Router>
  );
}
