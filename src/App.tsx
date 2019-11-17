import { navigate, RouteComponentProps, Router } from "@reach/router";
import { Menu, PageHeader } from "antd";
import { ClickParam } from "antd/lib/menu";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import React from "react";
import { ApolloProvider } from "react-apollo";
import "./App.css";
import GITHUB_TOKEN from "./Constants";
import ExampleForm from "./ExampleForm";
import ExamplePagination from "./ExamplePagination";
import ExampleSearch from "./ExampleSearch";
import SimpleCounter from "./SimpleCounter";
import SimpleList from "./SimpleList";
import GithubCRUDAuth from "./GithubCRUDAuth";

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  request: operation => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${GITHUB_TOKEN}`
      }
    });
  },
  cache: new InMemoryCache()
});

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
        // defaultSelectedKeys={["simple_counter"]}
        style={{ lineHeight: "64px" }}
      >
        <Menu.Item key="simple_counter">Simple Counter</Menu.Item>
        <Menu.Item key="simple_list">Simple List</Menu.Item>
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
  return (
    <ApolloProvider client={client}>
      <Router>
        <HomePath path="/">
          <SimpleCounter default path="simple_counter" />
          <SimpleList path="simple_list" />
          <ExampleSearch path="search" />
          <ExamplePagination path="pagination" />
          <ExampleForm path="form" />
          <GithubCRUDAuth path="github_crud_auth/:accessToken" />
          <GithubCRUDAuth path="github_crud_auth/" />
        </HomePath>
      </Router>
    </ApolloProvider>
  );
};

export default App;
