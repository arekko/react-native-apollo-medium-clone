import gql from "graphql-tag";
import * as React from "react";
import { Query } from "react-apollo";
import { Image, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { NavigationScreenProp } from "react-navigation";
import { formatDate } from "../../utils/formatDate";
import { readTime } from "../../utils/readTime";

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

const styles = StyleSheet.create({});

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

// TODO: hide the bottom tabs
export class ArticleView extends React.PureComponent<Props & any> {
  static navigatorStyle = {
    tabBarHidden: true
  };

  render() {
    const { navigation } = this.props;
    const itemId: number = parseInt(navigation.getParam("id"));

    console.log(typeof itemId);
    return (
      <Query query={articleViewQuery} variables={{ id: itemId }}>
        {({ data: { getArticle: article }, loading }) => {
          console.log("data, loading", article);

          return (
            <ScrollView>
              <View>
                <View style={{ padding: 10, marginBottom: 10 }}>
                  <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                    {article && article.title}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 15
                    }}
                  >
                    <Text
                      style={{ color: "#111", fontSize: 15, marginRight: 5 }}
                    >
                      {article && article.owner.fullname}
                    </Text>
                    <Text
                      style={{ color: "#9e9e9e", fontSize: 14, marginRight: 5 }}
                    >
                      {article && formatDate(article.creation_date)}
                    </Text>
                    <Text style={{ color: "#9e9e9e", fontSize: 14 }}>
                      {article && readTime(article.text)} min read
                    </Text>
                  </View>
                </View>
                <Image
                  source={{ uri: article && article.picture_url }}
                  style={{ height: 200, width: "100%" }}
                />
                <View style={{ padding: 10, marginBottom: 50 }}>
                  <Text style={{ fontSize: 21, color: "rgba(0,0,0,.84)" }}>
                    {article && article.text}
                  </Text>
                </View>
              </View>
            </ScrollView>
          );
        }}
      </Query>
    );
  }
}
