import { RouteComponentProps } from "@reach/router";
import { List, Typography, PageHeader } from "antd";
import { gql } from "apollo-boost";
import React from "react";
import { useQuery } from "react-apollo";
import "./App.css";
interface GithubViewer {
  viewer: {
    id: string;
    name: string;
    login: string;
    repositories: {
      edges: {
        node: {
          name: string;
          id: string;
        };
      }[];
    };
  };
}
const SimpleList: React.FC<RouteComponentProps> = () => {
  const GET_MY_INFO = gql`
    {
      viewer {
        login
        name
        id
        repositories(last: 10) {
          edges {
            node {
              name
              id
            }
          }
        }
      }
    }
  `;

  const { loading, error, data: responseData } = useQuery<GithubViewer>(
    GET_MY_INFO
  );

  if (loading) {
    return <div> loading...</div>;
  }

  if (error && !loading) {
    return <div> ERRROR!!!!...</div>;
  }

  let resultItems: string[];
  let githubLoginHandler: string = "";
  if (!loading && responseData) {
    resultItems = responseData.viewer.repositories.edges.map(
      edges => edges.node.name
    );
    githubLoginHandler = responseData.viewer.login;
  }

  return (
    <div>
      <PageHeader
        title={`${githubLoginHandler}'s Repositories`}
      />
      <List
        header={<div>Header</div>}
        footer={<div>Footer</div>}
        bordered
        dataSource={resultItems!}
        renderItem={item => <List.Item>{item}</List.Item>}
      />
    </div>
  );
};

export default SimpleList;
