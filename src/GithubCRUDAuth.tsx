import { navigate, RouteComponentProps } from "@reach/router";
import { Button, Layout } from "antd";
import axios from "axios";
import React from "react";
import "./App.css";

const { Content } = Layout;

const GithubCRUDAuth: React.FC<RouteComponentProps<{
  setClientAccessToken: React.Dispatch<string>;
  setGithubAccessToken: React.Dispatch<string>;
  githubAccessToken: string;
}>> = props => {
  const githubClientId = "9306671c5493706d29c5";

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

        if (
          data &&
          data.access_token &&
          props.setGithubAccessToken &&
          props.setClientAccessToken
        ) {
          props.setGithubAccessToken(data.access_token);
          props.setClientAccessToken(data.access_token);

          console.log(`access_code: ${data.access_token}`);
        } else {
          console.log(props);
        }
      });
      return <div> code = {paramArray[1]}</div>;
    }
  }
  if (props.githubAccessToken !== "") {
    console.log(props);
    return <div> access token = {props.githubAccessToken}</div>;
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
