import React, { useState } from "react";
import { Navbar, Nav, NavDropdown, Container, Dropdown, NavLink } from "react-bootstrap";
import styles from "../styles/Menubar.module.css";
import { RocketChatAuthMenuButton } from "./auth/rocketchat";
import BrandLogo from "./brandlogo";
import RocketChatLinkButton from "./rocketchatlinkbutton";
import Cookies from "js-cookie";
import Link from "next/link";
import { DummyLoginButton } from "./auth/dummy";
import RCGoogleLoginButton from "./auth/goauth/ui/GoogleRCLogin";
import web3 from "../assets/web3-icon.png"

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    className={styles.elipses}
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    <span className={styles.threedots} />
  </a>
));

export default function Menubar(props) {
  const [collapsed, setCollapsed] = useState(true);
  const userCookie = Cookies.get("user");
  const hasAllRequiredCreds =
    process.env.NEXTAUTH_URL &&
    process.env.ROCKETCHAT_CLIENT_ID &&
    process.env.ROCKETCHAT_CLIENT_SECRET &&
    process.env.ROCKETCHAT_URL;
    
  if (!hasAllRequiredCreds) console.log("RC4Community is now using a dummy Auth Component! If you wish to use a robust Auth component, provide all the credentials first (https://github.com/RocketChat/RC4Community/tree/master/app/components/auth)")
  return (
    <Container fluid className="border-bottom ">
      <Navbar expand="lg" className=" bg-white mx-4 my-2">
        <Navbar.Brand>
        <BrandLogo
          logoLink={
            web3
          }
          imageTitle={"Rocket.Chat"}
          brandName={"Rocket.Chat Community"}
          height={31}
          width={31}
        />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className={styles.default_toggler + " ms-auto"}
          onClick={() => {
            setCollapsed(!collapsed);
          }}
        >
          <button
            className={`${styles.navbar_toggler} navbar-toggler collapsed d-flex d-lg-none flex-column justify-content-around bg-white`}
            type="button"
          >
            <span
              className={`${styles.toggler_icon} ${
                collapsed ? styles.toggler_bar_collapsed : styles.toggler_bar
              }`}
            />
          </button>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {props.menu?.data?.attributes?.body?.map((item, index) => {
              return item.sub_menus && item?.sub_menus?.data?.length ? (
                <NavDropdown
                  key={`NavDropDown_${index}`}
                  title={item.label}
                  className={`ml-4 fw-normal ${styles.navbarItem}`}
                >
                  {item.sub_menus.data.map((sub, index) => (
                    <NavDropdown.Item
                      key={sub.id || sub._id || `NavDropDownItem_${index}`}
                      href={sub.attributes.url}
                      disabled={sub.attributes.style == "disable"}
                    >
                      {sub.attributes.label}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
              ) : (
                <Nav.Link
                  href={item.url}
                  className="fw-normal"
                  key={item.id || item._id || `NavLink_${index}`}
                >
                  {item.label}
                </Nav.Link>
              );
            })}
            <NavDropdown title="NFTs" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Parachains" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <NavLink>Learn More</NavLink>
          </Nav>
          <RocketChatLinkButton
            className={`bg-warning bg-gradient p-2 text-white ${styles.chat}`}
          >
            Connect MetaMask
          </RocketChatLinkButton>
        </Navbar.Collapse>
        <div className="mx-3">
          {userCookie && (
            <Dropdown align="end" className={styles.dropdown_menu}>
              <Dropdown.Toggle as={CustomToggle} />
              <Dropdown.Menu size="sm" title="">
                <Dropdown.Header>RC4Community Profile</Dropdown.Header>
                <Dropdown.Item>
                  <Link href={`/profile/${userCookie}`}>
                    <a className={styles.dropdown_menu_item}>Profile</a>
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
        <div className="mx-2">
          {/* {hasAllRequiredCreds ? (
            <RocketChatAuthMenuButton />
          ) : (
            <DummyLoginButton />
          )} */}
          <RCGoogleLoginButton />
        </div>
      </Navbar>
    </Container>
  );
}
