import React, { useState, useEffect, useContext } from "react";
import "./Sidebar.css";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { FaBars } from "react-icons/fa";
import SidebarData from "./SidebarData";
import SubMenu from "./SubMenu";
import { SidebarContext } from "../../context";
import CategoriesService from "../../services/CategoriesService";
import Backdrop from "./Backdrop";

function Sidebar() {
  // const accessToken = localStorage.getItem("access_token");

  const [isSidebarVisible, setSidebarVisible] = useState(false);
  // const [categories, setCategories] = useState([]);

  const { categories, setCategories } = useContext(SidebarContext);

  const toggleSidebar = () => setSidebarVisible(!isSidebarVisible);

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
        <FaBars style={{ color: "#000000" }} />
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
            <Link
              className="menu-button"
              style={{ textDecoration: "none", color: "black" }}
              href={path}
            >
              <AiOutlineClose
                className="close-button"
                onClick={toggleSidebar}
              />
            </Link>
          </div>
          {categories.map((c) =>
            SidebarData(c).map((item) => <SubMenu key={item.id} item={item} />)
          )}
        </div>
      </Nav>
    </>
  );
}

export default Sidebar;
