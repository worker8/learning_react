import { RouteComponentProps } from "@reach/router";
import React from "react";
import { Layout, Typography } from "antd";

const ExampleForm: React.FC<RouteComponentProps> = () => {
  return (
    <Layout>
      <Layout.Content
        style={{
          minHeight: 10,
          textAlign: "center",
          lineHeight: 10,
          whiteSpace: "nowrap"
        }}
      >
        <Typography.Text style={{ fontSize: 20 }}>
          {"It\\'s just a form"}
        </Typography.Text>
      </Layout.Content>
    </Layout>
  );
};
export default ExampleForm;
