import {
  UserOutlined,
  PhoneOutlined,
  ProfileOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;

import Home from "./Pages/Home";
import Students from "./Pages/Students";
import Teachers from "./Pages/Teachers";

const App = () => {
  const location = useLocation();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        // className="slider"
        breakpoint="lg"
        collapsedWidth="0"
        // onBreakpoint={(broken) => {
        //    console.log(broken);
        // }}
        // onCollapse={(collapsed, type) => {
        //    console.log(collapsed, type);
        // }}
      >
        <div className="logo text-white text-center pt-4 text-4xl font-extrabold">
          Kartoshka
          {/* Start <span className="text-red-500">21</span> */}
        </div>
        <Menu
          onClick={({ key }) => {
            navigate(key);
          }}
          className="text-xl flex flex-col gap-5"
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={[
            {
              label: "Home",
              key: "/",
              icon: <HomeOutlined style={{ fontSize: "22px" }} />,
            },
            {
              label: "New Students",
              key: "/registered-students",
              icon: <UserOutlined style={{ fontSize: "18px" }} />,
            },
            {
              label: "Teachers",
              key: "/teachers",
              icon: <ProfileOutlined style={{ fontSize: "22px" }} />,
            },
            // {
            //   label: "Contact",
            //   key: "/contact",
            //   icon: <PhoneOutlined style={{ fontSize: "22px" }} />,
            // },
          ]}
        />
      </Sider>
      <Layout>
        <Content className="p-4 h-[calc(100vh-4vh)] overflow-y-auto">
          {location.pathname === "/" && <Home />}
          {location.pathname === "/registered-students" && <Students />}
          {location.pathname === "/teachers" && <Teachers />}
        </Content>
        {/* <Footer
          style={{
            textAlign: "center",
            backgroundColor: "#001529",
          }}
          className="text-white py-1"
        >
          Strat 21
        </Footer> */}
      </Layout>
    </Layout>
  );
};
export default App;
