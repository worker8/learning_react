import { navigate, RouteComponentProps, Router } from "@reach/router";
import { Menu, PageHeader } from "antd";
import { ClickParam } from "antd/lib/menu";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import React, { useState } from "react";
import { ApolloProvider } from "react-apollo";
import useLocalStorage from "react-use-localstorage";
import "./App.css";
import ExampleForm from "./ExampleForm";
import ExamplePagination from "./ExamplePagination";
import ExampleSearch from "./ExampleSearch";
import GithubExample from "./github/GithubExample";
import SimpleCounter from "./SimpleCounter";
import GithubCodeReceiver from "./github/GithubCodeReceiver";

const HomePath: React.FC<RouteComponentProps> = ({ children }) => {
  const onClickHandler = (e: ClickParam): void => {
    navigate(e.key);
  };

  return (
    <div>
      <PageHeader title="React Playground" />
      <Menu
        theme="light"
        mode="horizontal"
        onClick={onClickHandler}
        style={{ lineHeight: "64px" }}
      >
        <Menu.Item key="simple_counter">Simple Counter</Menu.Item>
        <Menu.Item key="search">Search</Menu.Item>
        <Menu.Item key="pagination">Pagination</Menu.Item>
        <Menu.Item key="form">Form</Menu.Item>
        <Menu.Item key="github_crud_auth">Github Example</Menu.Item>
      </Menu>

      <div>{children}</div>
    </div>
  );
};

const App: React.FC = () => {
  const [githubAccessToken, setGithubAccessToken] = useLocalStorage(
    "github_access_token",
    ""
  );
  const createNewApolloClient = (accessToken: string) => {
    return new ApolloClient({
      uri: "https://api.github.com/graphql",
      request: operation => {
        operation.setContext({
          headers: {
            authorization: `Bearer ${accessToken}`
          }
        });
      },
      cache: new InMemoryCache()
    });
  };

  const [client, setClient] = useState(
    createNewApolloClient(githubAccessToken)
  );
  const setClientAccessToken = (accesToken: string) => {
    setGithubAccessToken(accesToken);
    setClient(createNewApolloClient(accesToken));
  };

  return (
    <ApolloProvider client={client}>
      <Router>
        <HomePath path="/">
          <SimpleCounter default path="simple_counter" />
          <ExampleSearch path="search" />
          <ExamplePagination path="pagination" />
          <ExampleForm path="form" />
          <GithubCodeReceiver
            setClientAccessToken={setClientAccessToken}
            githubAccessToken={githubAccessToken}
            path="github_crud_auth_code"
          />
          <GithubExample
            setClientAccessToken={setClientAccessToken}
            githubAccessToken={githubAccessToken}
            path="github_crud_auth/"
          />
        </HomePath>
      </Router>
    </ApolloProvider>
  );
};

export default App;
