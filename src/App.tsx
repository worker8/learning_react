import { Link, RouteComponentProps, Router } from "@reach/router";
import React from "react";
import "./App.css";
import SimpleCounter from "./SimpleCounter";
import SimpleList from "./SimpleList";
import { ApolloProvider } from "react-apollo";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { PageHeader, Menu } from "antd";
import GITHUB_TOKEN from "./Constants";

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
    children,
    komoro
  }) => {
    return (
      <div>
        <small>
          You are running this application in <b>{process.env.NODE_ENV}</b>{" "}
          mode.
        </small>

        <PageHeader title="Rumah" />
        <Menu></Menu>
        <nav>
          <Link to="/">Home</Link> |{" "}
          <Link to="simple_counter">Simple Counter</Link> |{" "}
          <Link to="simple_list">Simple List</Link> |{" "}
        </nav>
        {children}
      </div>
    );
  };

  return (
    <ApolloProvider client={client}>
      <Router>
        <HomePath path="/" komoro="lala">
          <SimpleCounter path="simple_counter" />
          <SimpleList path="simple_list" />
        </HomePath>
      </Router>
    </ApolloProvider>
  );
};

export default App;
