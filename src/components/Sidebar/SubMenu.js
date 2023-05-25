/* eslint-disable */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SubMenu.css";
import { Dropdown } from "react-bootstrap";

function SubMenu({ item }) {
  const [subnav, setSubNav] = useState(false);

  const path = "#";

  const showSubNav = () => {
    setSubNav(!subnav);
  };

  const showSubCategories = (subNavItems) => {
    const showSubCategoriesItems = subNavItems.map((sn) => (
      <Dropdown.Item className="dropdown-category" key={sn.id}>
        {sn.title}
      </Dropdown.Item>
    ));
    return showSubCategoriesItems;
  };

  return (
    <>
      <Link
        className="sidebar-link"
        href={path}
        onClick={() => item.subNav && showSubNav()}
      >
        <div>
          <span className="sidebar-label">{item.title}</span>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </Link>
      {subnav && showSubCategories(item.subNav)}
    </>
  );
}

export default SubMenu;
