import { RouteComponentProps, navigate } from "@reach/router";
import { Button, Layout } from "antd";
import React from "react";
import "./App.css";
import axios from "axios";

const { Content } = Layout;

const GithubCRUDAuth: React.FC<RouteComponentProps> = props => {
  const githubClientId = "9306671c5493706d29c5";

  if (props && props.location && props.location.search) {
    const paramArray = props.location.search.split("=");

    if (paramArray[0] == "?code") {
      axios({
        method: "get",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization"
        },
        url: `https://github-oauth-jr.herokuapp.com/submit_code/${paramArray[1]}`
      }).then(response => {
        const { data } = response;
        console.log(`access_code: ${data.access_token!}`);
      });
      return <div> code obtain {paramArray[1]}</div>;
    }
  }
  console.log("else block");
  const oauthOnClick = () => {
    navigate(
      `https://github.com/login/oauth/authorize?client_id=${githubClientId}`
    );
    console.log("clicked!");
  };
  return (
    <Layout>
      <Content>
        <Button onClick={oauthOnClick}>Github OAuth</Button>
      </Content>
    </Layout>
  );
};

export default GithubCRUDAuth;
