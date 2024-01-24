import { StyleProvider } from "@ant-design/cssinjs";
import { ConfigProvider, theme } from "antd";
import { useSelector } from "react-redux";
import "./App.css";
import SiteLayout from "./Components/SiteLayout";

function App() {
  // @ts-ignore
  const themeAlgorithm = useSelector((state) => state.themeStore.theme);
  return (
    <ConfigProvider
      theme={{
        hashed: false,
        algorithm: themeAlgorithm ? theme[themeAlgorithm] : null,
      }}
    >
      <StyleProvider hashPriority="high">
        <SiteLayout />
      </StyleProvider>
    </ConfigProvider>
  );
}

export default App;
