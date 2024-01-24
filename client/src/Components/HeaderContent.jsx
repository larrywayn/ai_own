import { Flex } from "antd";
import NavigationToggleButton from "./NavigationToggleButton";
import ThemeSwitcher from "./ThemeSwitcher";

function HeaderContent() {
  return (
    <Flex gap="middle" justify={"flex-start"} align={"center"}>
      <NavigationToggleButton />
      <ThemeSwitcher />
    </Flex>
  );
}

export default HeaderContent;
