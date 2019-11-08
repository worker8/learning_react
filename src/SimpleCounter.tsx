import "./App.css";
import { Typography, Divider, Button, PageHeader } from "antd";
import { Layout, Menu, Breadcrumb } from "antd";
import { Row, Col } from "antd";
import React, { useState } from "react";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;

const SimpleCounter: React.FC = () => {
    const increase = () => {
      setCount(count + 1);
    };
    const decrease = () => {
      setCount(count - 1);
    };
    const [count, setCount] = useState(0);
  
    return (
      <Layout>
        <PageHeader
          className="NavBar"
          title="Simple Counter"
          style={{ background: "white" }}
        />
        <Content style={{ background: "white" }}>
          <div>
            <Row style={{ margin: "0 auto" }} justify={"center"}>
              <Col style={{ textAlign: "center" }} span={24}>
                <Text style={{ margin: "12px", fontSize: "40px" }}>{count}</Text>
              </Col>
            </Row>
            <Row>
              <Col style={{ textAlign: "center" }} span={12}>
                <Button type="primary" onClick={decrease}>
                  - Button
                </Button>
              </Col>
              <Col style={{ textAlign: "center" }} span={12}>
                <Button type="primary" onClick={increase}>
                  + Button
                </Button>
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
    );
  };
  
  export default SimpleCounter;