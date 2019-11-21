import { navigate, RouteComponentProps } from "@reach/router";
import { Button, Layout, Skeleton, Avatar, Row } from "antd";
import axios from "axios";
import React from "react";
import "./App.css";
import SimpleList from "./SimpleList";

interface GithubExampleProps {
  setClientAccessToken: React.Dispatch<string>;
  githubAccessToken: string;
}

const GithubExample: React.FC<RouteComponentProps<
  GithubExampleProps
>> = props => {
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
          navigate("/github_crud_auth");
        }
      });
      return (
        <div style={{ margin: 16 }}>
          <Skeleton />
        </div>
      );
    }
  }
  if (props.githubAccessToken !== "") {
    return (
      <GithubList
        clearAccessToken={() => {
          if (props && props.setClientAccessToken) {
            props.setClientAccessToken("");
          }
        }}
      />
    );
  }
  return <LoginButton />;
};

const GithubList: React.FC<RouteComponentProps<{
  clearAccessToken: () => void;
}>> = props => {
  return (
    <Layout>
      <Layout.Content>
        <SimpleList />
        <Button
          style={{ margin: 16 }}
          onClick={() => {
            if (props && props.clearAccessToken) {
              props.clearAccessToken();
            }
          }}
        >
          Logout Button
        </Button>
      </Layout.Content>
    </Layout>
  );
};

const LoginButton: React.FC<RouteComponentProps> = () => {
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

export default GithubExample;
