import { navigate, RouteComponentProps } from "@reach/router";
import { Button, Layout, Row } from "antd";
import React from "react";
import isProduction from "../Utility";

const GithubGuestPage: React.FC<RouteComponentProps> = () => {
  const devGithubClientId = "361c01054653ab0ca914";
  const prodGithubClientId = "9306671c5493706d29c5";
  const oauthOnClick = () => {
    let clientId = devGithubClientId;
    if (isProduction()) {
      clientId = prodGithubClientId;
    }
    navigate(`https://github.com/login/oauth/authorize?client_id=${clientId}`);
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
