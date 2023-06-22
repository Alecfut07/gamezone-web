import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import useScrollLock from "../useScrollLock";

import "./SubMenu.css";

function SubMenu({ item, setSidebarVisible }) {
  const [isSubnavOpened, setIsSubnavOpened] = useState(false);
  const { unlockScroll } = useScrollLock();

  const path = "#";

  const navigateToSubCategoryPage = useNavigate();

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

  const handleNavigationSubCategory = (subItem) => {
    const url = [subItem.path.split("/")];
    const category = url[0][1];
    const subCategory = url[0][2];

    navigateToSubCategoryPage({
      pathname: `/${category}/${subCategory}`,
    });
    setIsSubnavOpened(false);
    setSidebarVisible(false);
    unlockScroll();
  };

  const showSubCategories = (subNavItems) => {
    const showSubCategoriesItems = subNavItems.map((subItem) => (
      <Dropdown.Item
        className="dropdown-category"
        key={subItem.id}
        // as={Link}
        // to={subItem.path}
        onClick={() => handleNavigationSubCategory(subItem)}
      >
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
        style={{ textDecoration: "none", color: "black" }}
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
