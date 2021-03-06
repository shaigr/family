import React from "react";
import { Link } from "gatsby";
import PropTypes from "prop-types";
import { Layout, Menu } from "antd";
import {
  LineChartOutlined,
  PartitionOutlined,
  TeamOutlined,
  GlobalOutlined,
} from "@ant-design/icons";

const Header = ({ siteTitle }) => (
  <Layout.Header>
    <Link style={{ float: "left", color: "#fff" }} to="/">
      {siteTitle}
    </Link>
    <Menu style={{ lineHeight: "64px" }} theme={"dark"} mode="horizontal">
      <Menu.Item key="/">
        <Link to={"/"}>
          <TeamOutlined />
          People
        </Link>
      </Menu.Item>
      <Menu.Item key="/stats">
        <Link to={"/stats"}>
          <LineChartOutlined />
          Stats
        </Link>
      </Menu.Item>
      <Menu.Item key="/familyTree">
        <Link to={"/familyTree"}>
          <PartitionOutlined rotate={270} />
          Family Tree
        </Link>
      </Menu.Item>
      <Menu.Item key="/familyMap">
        <Link to={"/familyMap"}>
          <GlobalOutlined />
          Family Map
        </Link>
      </Menu.Item>
    </Menu>
  </Layout.Header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
