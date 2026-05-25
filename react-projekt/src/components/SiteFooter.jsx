import React from "react";
import "/src/CSS/reset.css"
import { PhoneOutlined } from "@ant-design/icons";
import "/src/CSS/Footer.css";
import footerData from "../data.json";

export default function SiteFooter() {
    return (
        <footer className="footer-wrapper">
            <div className="footer-content">

                <div className="footer-columns">
                    {footerData.footer.map((column, index) => (
                        <div className="footer-column" key={index}>
                            <span className="footer-title">{column.title}</span>

                            <ul className="footer-list">
                                {column.items.map((item, i) => (
                                    <li className="footer-list-item" key={i}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="footer-contact">
                    <span className="footer-contact-title">Bezplatná linka</span>

                    <div className="phone-box">
                        <span className="phone-row">
                            <PhoneOutlined style={{ marginRight: 8 }} />
                            <span className="phone-number">800 606 806</span>
                        </span>

                        <span className="phone-hours">po–pá 7.30-16.00</span>
                    </div>

                    <div className="contact-text">
                        Pro objednání či přeobjednání termínu, prosím volejte naší zelenou linku.
                        Rezervovat termín si můžete i online na našem{" "}
                        <a className="footer-link" href="rezervace.html">rezervačním portálu</a>.
                    </div>

                    <div className="footer-button-wrapper">
                        <div className="footer-button">Objednat se</div>
                    </div>
                </div>

            </div>
        </footer>
    );
}
