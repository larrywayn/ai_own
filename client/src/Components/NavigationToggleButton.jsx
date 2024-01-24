import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useSelector } from "react-redux";
import { setCollapsedAction } from "src/StoreContainer/menuStore";
import { store } from "src/StoreContainer/store";

function NavigationToggleButton() {
  // @ts-ignore
  const collapsed = useSelector((state) => state.menuStore.collapsed);
  return (
    <Button
      type="text"
      icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      onClick={() => store.dispatch(setCollapsedAction(!collapsed))}
      style={{
        fontSize: "16px",
        width: 64,
        height: 64,
      }}
    />
  );
}

export default NavigationToggleButton;
