import React from "react";
import { navigate, RouteComponentProps } from "@reach/router";
import axios from "axios";
import { Skeleton } from "antd";
import GithubExampleProps from "./GithubExampleProps";

const GithubCodeReceiver: React.FC<RouteComponentProps<
  GithubExampleProps
>> = props => {
  // /github_crud_auth?code=123abc + no access token
  console.log("hello receive");
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
        url: `https://github-oauth-jr.herokuapp.com/submit_code/${paramArray[1]}?env=${process.env.NODE_ENV}`
        // url: `http://localhost:4000/submit_code/${paramArray[1]}?env=${process.env.NODE_ENV}` // for testing locally
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
  return <div>An error has occurred...</div>;
};
export default GithubCodeReceiver;
