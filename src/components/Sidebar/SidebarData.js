import React from "react";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";

function subName(category, subcategory) {
  return {
    id: subcategory.id,
    title: subcategory.name,
    path: `/${category.handle}/${subcategory.handle}`,
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
      path: `/${category.handle}`,
      iconClosed: <RiArrowDownSFill />,
      iconOpened: <RiArrowUpSFill />,
      subNav: subNavs,
    },
  ];
}

export default SidebarData;
