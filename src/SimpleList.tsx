import { RouteComponentProps } from "@reach/router";
import { Icon, List, PageHeader } from "antd";
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
        node: GithubRepository;
      }[];
    };
  };
}
interface GithubRepository {
  name: string;
  id: string;
  description: string;
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
              description
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
    return <div> Ops, an error has occurred...</div>;
  }
  let resultItems: GithubRepository[];
  let githubLoginHandler = "";
  if (!loading && responseData) {
    resultItems = responseData.viewer.repositories.edges.map(
      edges => edges.node
    );
    githubLoginHandler = responseData.viewer.login;
    return (
      <div>
        <PageHeader title={`${githubLoginHandler}'s Repositories`} />
        <List
          split={false}
          itemLayout="vertical"
          bordered
          style={{ margin: 15 }}
          dataSource={resultItems}
          renderItem={githubRepo => {
            return (
              <List.Item
                actions={[
                  <span key={githubRepo.id}>
                    <Icon type="edit" style={{ marginRight: 8 }} />
                    Edit
                  </span>
                ]}
              >
                <List.Item.Meta
                  title={githubRepo.name}
                  description={githubRepo.description}
                ></List.Item.Meta>
              </List.Item>
            );
          }}
        />
      </div>
    );
  }

  return <div></div>;
};

export default SimpleList;
