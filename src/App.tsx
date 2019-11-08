import logo from "./logo.svg";
import "./App.css";
import { Typography, Divider, Button, PageHeader } from "antd";
import { Layout, Menu, Breadcrumb } from "antd";
import { Row, Col } from "antd";
import React, { useState } from "react";
import SimpleCounter from "./SimpleCounter";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;

const App: React.FC = () => {
  
  return (
    <SimpleCounter />
  );
};

export default App;
