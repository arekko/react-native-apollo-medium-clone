import gql from "graphql-tag";
import * as React from "react";
import { Text, View } from "react-native";

const getArticles = gql`
  query GetArticlesQuery {
    getArticles {
      id
      text
      title
      creation_date
      picture_url
      owner {
        username
        email
        fullname
        register_date
      }
    }
  }
`;

export class BookmarkView extends React.PureComponent<{}> {
  render() {
    return (
      <View>
        <Text>Bookmarks</Text>
      </View>
    );
  }
}
