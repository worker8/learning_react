import { RouteComponentProps, navigate } from "@reach/router";
import { Button, Layout } from "antd";
import React from "react";
import "./App.css";
// import axios from "axios";

const { Content } = Layout;

const GithubCRUDAuth: React.FC<RouteComponentProps> = props => {
  const githubClientId = "9306671c5493706d29c5";
  if (props && props.location && props.location.search) {
    const paramArray = props.location.search.split("=");

    if (paramArray[0] == "?code") {
      console.log(`from github = ${paramArray[1]}`);
      return <div> code obtain {paramArray[1]}</div>;
    }
  }
  console.log("else block");
  const oauthOnClick = () => {
    navigate(
      `https://github.com/login/oauth/authorize?client_id=${githubClientId}`
    );
    // axios
    //   .get(
    //     `https://github.com/login/oauth/authorize?client_id=9306671c5493706d29c5${githubClientId}`
    //   )
    //   .then(response => {
    //     console.log(response);
    //   });
    console.log("clicked!");
  };
  return (
    <Layout>
      <Content>
        <Button onClick={oauthOnClick}>Github OAuth</Button>
      </Content>
    </Layout>
  );

  // https://localhost:3000/github_crud_auth?code=5266001b321abdc6bd1a
};

export default GithubCRUDAuth;
