import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SubMenu.css";
import { Dropdown } from "react-bootstrap";

function SubMenu({ item }) {
  const [isSubnavOpened, setIsSubnavOpened] = useState(false);

  const path = "#";

  const showSubNav = () => {
    setIsSubnavOpened(!isSubnavOpened);
  };

  const showIcon = () => {
    let icon;
    if (isSubnavOpened) {
      icon = item.iconOpened;
    } else if (item.subNav) {
      icon = item.iconClosed;
    } else {
      icon = null;
    }
    return icon;
  };

  const showSubCategories = (subNavItems) => {
    const showSubCategoriesItems = subNavItems.map((subItem) => (
      <Dropdown.Item className="dropdown-category" key={subItem.id}>
        {subItem.title}
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
        <div>{item.subNav && showIcon()}</div>
      </Link>
      {isSubnavOpened && showSubCategories(item.subNav)}
    </>
  );
}

export default SubMenu;
