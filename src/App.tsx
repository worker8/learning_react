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

const App: React.FC = () => {
  const HomePath: React.FC<RouteComponentProps<{ sadasdsadsa: string }>> = ({
    children
  }) => {
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
        </Menu>

        <div>{children}</div>
      </div>
    );
  };

  return (
    <ApolloProvider client={client}>
      <Router>
        <HomePath path="/">
          <SimpleCounter default path="simple_counter" />
          <SimpleList path="simple_list" />
          <ExampleSearch path="search" />
          <ExamplePagination path="pagination" />
          <ExampleForm path="form" />
        </HomePath>
      </Router>
    </ApolloProvider>
  );
};

export default App;
