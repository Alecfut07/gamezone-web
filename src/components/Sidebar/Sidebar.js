import React, { useState, useEffect, useContext } from "react";
import "./Sidebar.css";
import { Nav, Stack, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { FaBars } from "react-icons/fa";
import SidebarData from "./SidebarData";
import SubMenu from "./SubMenu";
import { SidebarContext, AuthContext } from "../../context";
import CategoriesService from "../../services/CategoriesService";
import Backdrop from "./Backdrop";
import useScrollLock from "../useScrollLock";

function Sidebar() {
  // const accessToken = localStorage.getItem("access_token");

  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const { unlockScroll } = useScrollLock();
  // const [categories, setCategories] = useState([]);

  const { isLoggedIn } = useContext(AuthContext);
  const { categories, setCategories } = useContext(SidebarContext);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
    unlockScroll();
  };

  const path = "#";

  const sidebarNav = (sidebarToggle) => ({
    // background: "#15171c",
    background: "#f8f9fa",
    boxShadow: "1px 0px 7px rgba(0, 0, 0, 0.5)",
    width: "375px",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    position: "fixed",
    top: "0",
    left: sidebarToggle ? "0" : "-100%",
    transition: "350ms",
    zIndex: "10",
    overflowY: "scroll",
  });

  const getCategories = async () => {
    try {
      const results = await CategoriesService.getCategories();
      setCategories(results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <Link className="menu-button" href={path} onClick={toggleSidebar}>
        <FaBars className="FaBars-icon" />
      </Link>
      {isSidebarVisible && (
        <Backdrop
          isSidebarVisible={isSidebarVisible}
          setSidebarVisible={setSidebarVisible}
        />
      )}
      <Nav className="sidebar-menu" style={sidebarNav(isSidebarVisible)}>
        <div className="sidebar-wrap">
          <div className="menu-header-container">
            <p className="menu-header-label">
              <b>Menu</b>
            </p>
            <Link className="close-menu-button" href={path}>
              <AiOutlineClose
                className="close-button"
                // style={{
                //   textDecoration: "none",
                //   color: "black",
                //   fontWeight: "bold",
                // }}
                onClick={toggleSidebar}
              />
            </Link>
          </div>
          {!isLoggedIn && (
            <Stack
              className="sign-stack-buttons mt-auto"
              direction="horizontal"
              gap={3}
            >
              <Button
                // className="ms-5"
                className=""
                variant="outline-dark"
                href="/users/sign_in"
              >
                Sign in
              </Button>
              <Button
                // className="ms-auto"
                className=""
                variant="outline-dark"
                href="/users/sign_up"
              >
                Sign up
              </Button>
            </Stack>
          )}
          {categories.map((c) =>
            SidebarData(c).map((item) => (
              <SubMenu
                key={item.id}
                item={item}
                setSidebarVisible={setSidebarVisible}
              />
            ))
          )}
        </div>
      </Nav>
    </>
  );
}

export default Sidebar;
