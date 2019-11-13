import { RouteComponentProps } from "@reach/router";
import React from "react";
import { Layout, Typography } from "antd";

const ExamplePagination: React.FC<RouteComponentProps> = () => {
  return (
    <Layout>
      <Layout.Content
        style={{
          background: "grey",
          minHeight: 10,
          textAlign: "center",
          lineHeight: 10,
          whiteSpace: "nowrap"
        }}
      >
        <Typography.Text style={{ fontSize: 20, color: "white" }}>
          P a g i n a t i o n
        </Typography.Text>
      </Layout.Content>
    </Layout>
  );
};
export default ExamplePagination;
