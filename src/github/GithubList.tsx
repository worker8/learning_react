import { RouteComponentProps } from "@reach/router";
import { Icon, List, PageHeader, Skeleton, Layout, Button } from "antd";
import { gql } from "apollo-boost";
import React from "react";
import { useQuery } from "react-apollo";

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

const GithubList: React.FC<RouteComponentProps<{
  clearAccessToken: () => void;
}>> = props => {
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
    return (
      <Layout>
        <Layout.Content>
          <Skeleton />
        </Layout.Content>
      </Layout>
    );
  }

  if (error && !loading) {
    return (
      <Layout>
        <Layout.Content>Opps, an error has occurred...</Layout.Content>
      </Layout>
    );
  }
  let resultItems: GithubRepository[];
  let githubLoginHandler = "";
  if (!loading && responseData) {
    resultItems = responseData.viewer.repositories.edges.map(
      edges => edges.node
    );
    githubLoginHandler = responseData.viewer.login;
    return (
      <Layout>
        <Layout.Content>
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
  }

  return <div></div>;
};

export default GithubList;
