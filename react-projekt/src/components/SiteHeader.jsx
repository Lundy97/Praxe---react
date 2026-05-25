import React from "react";
import "/src/CSS/Header.css";

export default function SiteHeader() {
    return (
        <header className="header-wrapper">
            <div className="logo-left">
                <img src="/src/assets/amber-logo.svg" alt="Logo-Amber" width="160" height="80" />
            </div>

            <div className="logo-right">
                <img src="/src/assets/portal-darce-logo.svg" alt="Dárce-logo" width="160" height="80" />
            </div>

            <div className="spacer"></div>
        </header>
    );
}
