import { Layout, Row, Button } from "antd";
import React from "react";
import { navigate, RouteComponentProps } from "@reach/router";

const GithubGuestPage: React.FC<RouteComponentProps> = () => {
  const githubClientId = "9306671c5493706d29c5";
  const oauthOnClick = () => {
    navigate(
      `https://github.com/login/oauth/authorize?client_id=${githubClientId}`
    );
  };
  return (
    <Layout>
      <Layout.Content style={{ padding: 16 }}>
        <Row>
          <img
            alt="Github logo"
            src="https://image.flaticon.com/icons/png/128/25/25231.png"
          />
        </Row>
        <Row style={{ paddingTop: 10 }}>
          <Button onClick={oauthOnClick}>Github OAuth</Button>
        </Row>
      </Layout.Content>
    </Layout>
  );
};

export default GithubGuestPage;
