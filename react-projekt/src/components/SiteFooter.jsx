import React from "react";
import { PhoneOutlined } from "@ant-design/icons";
import footerData from "../data.json";

function splitItems(items, columns = 1) {
    const perColumn = Math.ceil(items.length / columns);
    return Array.from({ length: columns }, (_, i) =>
        items.slice(i * perColumn, (i + 1) * perColumn)
    );
}

export default function SiteFooter() {

    // Připravíme si sloupce podle konfigurace v JSONu
    const footerColumns = footerData.footer.flatMap(col => {
        const cols = col.columns || 1;

        if (cols > 1) {
            const split = splitItems(col.items, cols);

            return split.map((items, i) => ({
                title: i === 0 ? col.title : null,
                items
            }));
        }

        return col;
    });

    return (
        <footer className="footer-wrapper">
            <div className="footer-content">

                <div className="footer-columns">
                    {footerColumns.map((column, index) => (
                        <div className="footer-column" key={index}>
                            {column.title && (
                                <span className="footer-title">{column.title}</span>
                            )}

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
                            <span className="phone-icon">
                                <PhoneOutlined style={{ marginRight: 8, transform: "scaleX(-1)"}} />
                            </span>

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
