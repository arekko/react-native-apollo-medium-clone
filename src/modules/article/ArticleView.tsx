import gql from "graphql-tag";
import * as React from "react";
import { Query } from "react-apollo";
import { Image, StyleSheet, Text, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";

const articleViewQuery = gql`
  query ArticleViewQuery($id: Float!) {
    getArticle(id: $id) {
      title
      creation_date
      picture_url
      text
      owner {
        fullname
        username
      }
    }
  }
`;

const hello = gql`
  query Hello($id: Float!) {
    hello(id: $id)
  }
`;

const styles = StyleSheet.create({});

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

export class ArticleView extends React.PureComponent<Props & any> {
  render() {
    const { navigation } = this.props;
    const itemId: number = parseInt(navigation.getParam("id"));

    console.log(typeof itemId);
    return (
      <Query query={articleViewQuery} variables={{ id: itemId }}>
        {({ data: { getArticle: article }, loading }) => {
          console.log("data, loading", article);

          return (
            <View>
              <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                {article && article.title}
              </Text>
              <Image
                source={{ uri: article && article.picture_url }}
                style={{ height: 200, width: "100%" }}
              />
              <Text>{article && article.text}</Text>
            </View>
          );
        }}
      </Query>
    );
  }
}
