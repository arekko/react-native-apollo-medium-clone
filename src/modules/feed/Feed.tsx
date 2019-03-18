import gql from "graphql-tag";
import * as React from "react";
import { Query } from "react-apollo";
import { ScrollView } from "react-native";
import { Card } from "react-native-elements";

const getArticles = gql`
  query GetArticlesQuery {
    getArticles {
      id
      text
      title
      creation_date
      picture_url
    }
  }
`;

export class Feed extends React.PureComponent<{}> {
  render() {
    return (
      <Query query={getArticles}>
        {({ loading, error, data: { getArticles: articles } }) => {
          console.log(articles, loading, error);

          return (
            <ScrollView style={{ marginTop: 15 }}>
              {articles &&
                articles.map((l: any) => (
                  <Card
                    key={`${l.id}-flc`}
                    title={l.title}
                    image={l.picture_url ? { uri: l.picture_url } : undefined}
                  />
                ))}
            </ScrollView>
          );
        }}
      </Query>
    );
  }
}
