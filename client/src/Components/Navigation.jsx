import { Menu } from "antd";
import React, { useState } from "react";
import { navigationData } from "./Inputs/NavigationInputs";

const menuItems = navigationData.map((menuItem, index) => ({
  key: String(index + 1),
  icon: React.createElement(menuItem.icon),
  label: <a href={menuItem.url}>{menuItem.name}</a>,
}));

function Navigation() {
  const [openKeys, setOpenKeys] = useState(["chooser"]);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (
      latestOpenKey &&
      navigationData
        .map((menuItemData) => menuItemData.name)
        .indexOf(latestOpenKey) === -1
    ) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  return (
    <Menu
      theme="dark"
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      items={menuItems}
    />
  );
}

export default Navigation;
