import { RouteComponentProps } from "@reach/router";
import React from "react";
import GithubExampleProps from "./GithubExampleProps";
import GithubGuestPage from "./GithubGuestPage";
import GithubList from "./GithubList";

const GithubExample: React.FC<RouteComponentProps<
  GithubExampleProps
>> = props => {
  // /github_crud_auth + access token
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
  } else {
    // /github_crud_auth + no access token
    return <GithubGuestPage />;
  }
};

export default GithubExample;
