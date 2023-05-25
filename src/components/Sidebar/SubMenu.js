import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SubMenu.css";
import { Dropdown } from "react-bootstrap";

function SubMenu({ item }) {
  const [subnav, setSubNav] = useState(false);

  const showSubNav = () => setSubNav(!subnav);

  const path = "#";

  const isCategoryOpened =
    item.subNav && subnav ? item.iconOpened : item.subNav;

  return (
    <>
      <Link
        className="sidebar-link"
        href={path}
        onClick={item.subNav && showSubNav}
      >
        <div>
          <span className="sidebar-label">{item.title}</span>
        </div>
        <div>{isCategoryOpened ? item.iconClosed : null}</div>
      </Link>
      {subnav &&
        item.subNav.map((i) => (
          <Dropdown.Link className="dropdown-category" href={path} key={i}>
            <span>{i.title}</span>
          </Dropdown.Link>
        ))}
    </>
  );
}

export default SubMenu;
