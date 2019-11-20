import { navigate, RouteComponentProps } from "@reach/router";
import { Button, Layout } from "antd";
import axios from "axios";
import React from "react";
import "./App.css";
import SimpleList from "./SimpleList";

const { Content } = Layout;
const LoginButton: React.FC<RouteComponentProps> = () => {
  const githubClientId = "9306671c5493706d29c5";
  const oauthOnClick = () => {
    navigate(
      `https://github.com/login/oauth/authorize?client_id=${githubClientId}`
    );
  };
  return (
    <Layout>
      <Content>
        <Button onClick={oauthOnClick}>Github OAuth</Button>
      </Content>
    </Layout>
  );
};

const GithubExample: React.FC<RouteComponentProps<{
  setClientAccessToken: React.Dispatch<string>;
  githubAccessToken: string;
}>> = props => {
  if (
    props &&
    props.location &&
    props.location.search &&
    props.githubAccessToken === ""
  ) {
    const paramArray = props.location.search.split("=");
    if (paramArray[0] === "?code") {
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

        if (data && data.access_token && props.setClientAccessToken) {
          props.setClientAccessToken(data.access_token);
        }
      });
      return <div> loading.... code = {paramArray[1]}</div>;
    }
  }
  if (props.githubAccessToken !== "") {
    return <SimpleList />;
  }
  return <LoginButton />;
};

export default GithubExample;
