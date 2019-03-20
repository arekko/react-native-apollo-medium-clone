import gql from "graphql-tag";
import * as React from "react";
import { Query } from "react-apollo";
import { Dimensions, StatusBar, StyleSheet, Text, View } from "react-native";

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

const SCREEN_WIDTH = Dimensions.get("screen").width;
const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: STATUSBAR_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: "#ecf0f1"
  },
  card: {
    flexDirection: "column",
    padding: 15,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    backgroundColor: "#fff"
  },
  card__category: {
    color: "#9e9e9e",
    fontSize: 16
  },
  card__middle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10
  },
  card__title: {
    fontSize: 20,
    fontWeight: "bold",
    paddingRight: 10,
    flex: 1,
    flexWrap: "wrap"
  },
  card__bottom: {
    flexDirection: "row"
  },
  card__username: {
    fontSize: 15
  },
  card__date: {
    fontSize: 15,
    color: "#9e9e9e"
  }
});

export class BookmarkView extends React.PureComponent<{}> {
  render() {
    return (
      <Query query={getArticles}>
        {({ loading, error, data: { getArticles: articles } }) => {
          console.log(articles, loading, error);

          return (
            <View>
              <Text>Profile</Text>
            </View>
          );
        }}
      </Query>
    );
  }
}
