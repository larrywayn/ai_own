import { Button, Dropdown, Space } from "antd";
import { useSelector } from "react-redux";
import { store } from "src/StoreContainer/store";
import { setThemeAction } from "src/StoreContainer/themeStore";
import { themItems } from "./Inputs/ThemeInputs";

const ThemeSwitcher = () => {
  // @ts-ignore
  const themeAlgorithm = useSelector((state) => state.themeStore.theme);

  function setTheme(e) {
    const themeToSet = e.key ? e.key : null;
    store.dispatch(setThemeAction(themeToSet));
  }

  const menuProps = {
    items: themItems,
    onClick: setTheme,
  };

  const themeClass = themeAlgorithm ? themeAlgorithm : null;
  return (
    <>
      <div className={`${themeClass}`}>{`${
        themeClass || "Default"
      } Theme`}</div>
      <Dropdown menu={menuProps}>
        <Button>
          <Space>Theme auswahl</Space>
        </Button>
      </Dropdown>
    </>
  );
};
export default ThemeSwitcher;
