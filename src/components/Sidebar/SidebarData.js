import React from "react";
// import { AiFillHome } from "react-icons/ai";
import { FaProductHunt } from "react-icons/fa";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";

function subName(subcategory) {
  return {
    title: subcategory.name,
    path: "/admin/products",
    icon: <FaProductHunt />,
  };
}

function SidebarData(category) {
  const subNavs = category.subcategories.map((s) => subName(s));
  return [
    {
      title: category.name,
      path: "/admin/products",
      icon: <FaProductHunt />,
      iconClosed: <RiArrowDownSFill />,
      iconOpened: <RiArrowUpSFill />,
      subNav: subNavs,
    },
  ];
}

export default SidebarData;
