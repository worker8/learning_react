import logo from "./logo.svg";
import "./App.css";
import { Typography, Divider, Button, PageHeader } from "antd";
import { Layout, Menu, Breadcrumb } from "antd";
import { Row, Col } from "antd";
import React, { useState } from "react";
import SimpleCounter from "./SimpleCounter";
import { Router, Link } from "@reach/router";
import { RouteComponentProps } from "@reach/router";
import SimpleList from "./SimpleList";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;

const App: React.FC = () => {
  const HomePath: React.FC<RouteComponentProps> = () => {
    return (
      <div>
        <h1>Home</h1>
        <nav>
          <Link to="/">Home</Link> |{" "}
          <Link to="simple_counter">Simple Counter</Link> |{" "}
          <Link to="simple_list">Simple List</Link> |{" "}
        </nav>
      </div>
    );
  };

  return (
    <Router>
      <HomePath path="/" />
      <SimpleCounter path="simple_counter" />
      <SimpleList path="simple_list" />
    </Router>
  );
};

export default App;
