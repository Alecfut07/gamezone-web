import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { FaBars } from "react-icons/fa";
import SidebarData from "./SidebarData";
import SubMenu from "./SubMenu";

import CategoriesService from "../../services/CategoriesService";

function Sidebar() {
  const [sidebar, setSidebar] = useState(false);
  const [categories, setCategories] = useState([]);

  const showSidebar = () => setSidebar(!sidebar);

  const path = "#";

  const sidebarNav = (sidebarToggle) => ({
    background: "#15171c",
    width: "250px",
    height: "100vh",
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

  // debugger;
  return (
    <>
      <Link className="menu-button" href={path} onClick={showSidebar}>
        <FaBars />
        <span className="menu-text">Menu</span>
      </Link>
      <Nav style={sidebarNav(sidebar)}>
        <div className="sidebar-wrap">
          <Link className="menu-button" href={path}>
            <AiOutlineClose onClick={showSidebar} />
          </Link>
          {categories.map((c) =>
            SidebarData(c).map((item) => <SubMenu key={item.id} item={item} />)
          )}
        </div>
      </Nav>
    </>
  );
}

export default Sidebar;
