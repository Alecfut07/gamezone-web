import React from "react";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";

function subName(subcategory) {
  return {
    id: subcategory.id,
    title: subcategory.name,
    path: "/admin/products",
  };
}

function SidebarData(category) {
  const subNavs = category.subcategories.map((s) => subName(s));
  return [
    {
      id: category.id,
      title: category.name,
      path: "/admin/products",
      iconClosed: <RiArrowDownSFill />,
      iconOpened: <RiArrowUpSFill />,
      subNav: subNavs,
    },
  ];
}

export default SidebarData;
