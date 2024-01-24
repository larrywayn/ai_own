import { Layout, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import { useSelector } from "react-redux";
import HeaderContent from "./HeaderContent";
import Navigation from "./Navigation";
import Routing from "./Routing";

function SiteLayout() {
  // @ts-ignore
  const collapsed = useSelector((state) => state.menuStore.collapsed);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        collapsedWidth="0"
        style={{
          overflow: "auto",
          height: "100vh",
        }}
      >
        <div className="demo-logo-vertical" />
        <Navigation />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <HeaderContent />
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <Routing />
        </Content>
      </Layout>
    </Layout>
  );
}

export default SiteLayout;
