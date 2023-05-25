/* eslint-disable */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SubMenu.css";
import { Dropdown, DropdownButton } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";

function SubMenu({ item }) {
  const [subnav, setSubNav] = useState(false);

  const path = "#";

  // const isCategoryOpened =
  //   item.subNav && subnav ? item.iconOpened : item.subNav;

  // const isCategoryClosed = item.subNav && subnav ? item.iconClosed : null;

  const showSubNav = () => {
    setSubNav(!subnav);
  };

  const showSubCategories = (subNavItems) => {
    // debugger;
    return subNavItems.map((sn, index) => (
      // <DropdownButton className="dropdown-category" href={sn.path} key={index}>
      //   <Dropdown.Item>{sn.title}</Dropdown.Item>
      //   <span>{sn.title}</span>
      // </DropdownButton>

      <Dropdown.Item className="dropdown-category" key={sn.id}>
        {sn.title}
      </Dropdown.Item>

      // <div className="dropdown-category" key={sn.id}>
      //   {sn.title}
      // </div>
    ));
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
        {/* <div>{isCategoryOpened ? item.iconClosed : null}</div> */}
        {/* <div>{isCategoryOpened && isCategoryClosed}</div> */}
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
