import React from "react";
import styled from "styled-components";

export default function SiteHeader() {
    return (
        <HeaderWrapper>
            <LogoLeft>
                <img src="/src/assets/amber-logo.svg" alt="Logo-Amber" width="160" height="80" />
            </LogoLeft>

            <LogoRight>
                <img src="/src/assets/portal-darce-logo.svg" alt="Dárce-logo" width="160" height="80" />
            </LogoRight>

            <Spacer />
        </HeaderWrapper>
    );
}

/* ------------------------------------------
   Styled Components
------------------------------------------- */

const HeaderWrapper = styled.header`
  background: #fff;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  z-index: 9999;
`;

const LogoLeft = styled.div`
  display: flex;
  align-items: center;
`;

const LogoRight = styled.div`
  display: flex;
  align-items: center;
`;

const Spacer = styled.div`
  width: 160px;

  @media (max-width: 768px) {
    width: 0;
    height: 0;
  }
`