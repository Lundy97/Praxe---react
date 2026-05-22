import React from "react";
import { PhoneOutlined } from "@ant-design/icons";
import styled from "styled-components";

export default function SiteFooter() {
    return (
        <FooterWrapper>
            <FooterContent>
                <FooterColumns>
                    <FooterColumn>
                        <FooterTitle>Amber Plasma</FooterTitle>
                        <FooterList>
                            <li>Proč darovat plazmu</li>
                            <li>Staňte se dárcem</li>
                            <li>Odměny</li>
                            <li>Novinky</li>
                            <li>Slovník pojmů</li>
                            <li>FAQ</li>
                        </FooterList>
                    </FooterColumn>

                    <FooterColumn>
                        <FooterTitle>O nás</FooterTitle>
                        <FooterList>
                            <li>O společnosti</li>
                            <li>Kariéra</li>
                            <li>Napsali o nás</li>
                            <li>Partneři</li>
                            <li>Kontakty</li>
                            <li>Whistleblowing</li>
                            <li>GDPR</li>
                        </FooterList>
                    </FooterColumn>

                    <FooterColumn>
                        <FooterTitle>Dárcovská centra</FooterTitle>
                        <FooterList>
                            <li>Česká Lípa</li>
                            <li>Děčín</li>
                            <li>Cheb</li>
                            <li>Chomutov</li>
                            <li>Jablonec nad Nisou</li>
                            <li>Karlovy Vary</li>
                        </FooterList>
                    </FooterColumn>

                    <FooterColumn>
                        <FooterList>
                            <FooterListItem>Litoměřice</FooterListItem>
                            <FooterListItem>Mladá Boleslav</FooterListItem>
                            <FooterListItem>Plzeň</FooterListItem>
                            <FooterListItem>Praha - Nové Butovice</FooterListItem>
                            <FooterListItem>Příbram</FooterListItem>
                            <FooterListItem>Teplice</FooterListItem>
                        </FooterList>
                    </FooterColumn>
                </FooterColumns>

                <FooterContact>
                    <FooterContactTitle>Bezplatná linka</FooterContactTitle>

                    <PhoneBox>
                        <PhoneRow>
                            <PhoneOutlined style={{ marginRight: 8 }} />
                            <PhoneNumber>800 606 806</PhoneNumber>
                        </PhoneRow>
                        <PhoneHours>po–pá 7.30-16.00</PhoneHours>
                    </PhoneBox>

                    <ContactText>
                        Pro objednání či přeobjednání termínu, prosím volejte naší zelenou linku.
                        Rezervovat termín si můžete i online na našem{" "}
                        <FooterLink href="rezervace.html">rezervačním portálu</FooterLink>.
                    </ContactText>

                    <FooterButtonWrapper>
                        <FooterButton>Objednat se</FooterButton>
                    </FooterButtonWrapper>
                </FooterContact>
            </FooterContent>
        </FooterWrapper>
    );
}

/* ------------------------------------------
   Styled Components
------------------------------------------- */

const FooterWrapper = styled.footer`
  background-color: #1b4079;
  border-radius: 25px 25px 0 0;
  padding-top: 10px;
  margin-top: auto;
`;

const FooterContent = styled.div`
  padding-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-right: 50px;
`;

const FooterColumns = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-right: 20px;
  padding-top: 40px;
  gap: 80px;

      @media (max-width: 768px) {
    gap: 10px;              
  }
`;

const FooterColumn = styled.div``;

const FooterTitle = styled.span`
  padding-left: 40px;
  font-size: 22px;
  color: #adcce1;
`;

const FooterList = styled.ul`
  padding-left: 40px;
  color: #ffffff;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FooterListItem = styled.li`
  padding-bottom: 2px;
`;

const FooterContact = styled.div`
  padding-right: 20px;
  padding-left: 40px;
`;

const FooterContactTitle = styled.span`
  font-size: 22px;
  color: #adcce1;
`;

const PhoneBox = styled.div`
  background-color: white;
  color: #1b4079;
  border-radius: 15px;
  padding: 26px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PhoneRow = styled.span`
  display: flex;
  align-items: center;
`;

const PhoneNumber = styled.span`
  font-size: 20px;
  font-weight: 700;
`;

const PhoneHours = styled.span`
  padding-left: 20px;
`;

const ContactText = styled.div`
  padding-top: 20px;
  max-width: 310px;
  color: #adcce1;
`;

const FooterLink = styled.a`
  color: white;
  text-decoration: underline;
`;

const FooterButtonWrapper = styled.div`
  margin-top: 16px;
`;

const FooterButton = styled.div`
  border-radius: 40px;
  background: linear-gradient(
    299deg,
    #b90e49 3%,
    #f1680b 18%,
    #f9ab00 33%,
    #f9ab00 67%,
    #f1680b 82%,
    #b90e49 97%
  );
  width: 100px;
  display: flex;
  justify-content: center;
  color: white;
  padding: 15px;
`;