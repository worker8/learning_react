import { Link, RouteComponentProps, Router, navigate } from "@reach/router";
import React from "react";
import "./App.css";
import SimpleCounter from "./SimpleCounter";
import SimpleList from "./SimpleList";
import { ApolloProvider } from "react-apollo";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { PageHeader, Menu } from "antd";
import GITHUB_TOKEN from "./Constants";
import { ClickParam } from "antd/lib/menu";

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
  const HomePath: React.FC<RouteComponentProps<{ komoro: string }>> = ({
    children
  }) => {
    const onClickHandler = (e: ClickParam) => {
      //console.log("click", e);
      navigate(e.key);
      // router?
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
        {children}
      </div>
    );
  };

  return (
    <ApolloProvider client={client}>
      <Router>
        <HomePath path="/">
          <SimpleCounter default path="simple_counter" />
          <SimpleList path="simple_list" />
        </HomePath>
      </Router>
    </ApolloProvider>
  );
};

export default App;
