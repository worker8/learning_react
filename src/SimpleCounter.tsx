import { RouteComponentProps } from "@reach/router";
import { Button, Col, Layout, PageHeader, Row, Typography } from "antd";
import React, { useState } from "react";
import "./App.css";

const { Content } = Layout;
const { Text } = Typography;

const SimpleCounter: React.FC<RouteComponentProps> = () => {
  const [count, setCount] = useState(0);
  const increase = () => {
    setCount(count + 1);
  };
  const decrease = () => {
    setCount(count - 1);
  };

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
