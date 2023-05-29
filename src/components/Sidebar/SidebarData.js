import React from "react";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";

function subName(category, subcategory) {
  return {
    id: subcategory.id,
    title: subcategory.name,
    path: `/${category.name}/${subcategory.name}`,
  };
}

function SidebarData(category) {
  const subNavs = category.subcategories.map((subCat) =>
    subName(category, subCat)
  );
  return [
    {
      id: category.id,
      title: category.name,
      path: `/${category.name}`,
      iconClosed: <RiArrowDownSFill />,
      iconOpened: <RiArrowUpSFill />,
      subNav: subNavs,
    },
  ];
}

export default SidebarData;
