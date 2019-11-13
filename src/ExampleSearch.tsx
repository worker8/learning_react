import { RouteComponentProps } from "@reach/router";
import React from "react";
import { Layout, Typography } from "antd";

const ExampleSearch: React.FC<RouteComponentProps> = () => {
  return (
    <Layout>
      <Layout.Content
        style={{
          background: "magenta",
          minHeight: 10,
          textAlign: "center",
          lineHeight: 10,
          whiteSpace: "nowrap"
        }}
      >
        <Typography.Text style={{ fontSize: 20, color: "white" }}>
          S E A R C H
        </Typography.Text>
      </Layout.Content>
    </Layout>
  );
};
export default ExampleSearch;
