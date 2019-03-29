import gql from "graphql-tag";
import * as React from "react";
import { Query } from "react-apollo";
import { Dimensions, ScrollView, StatusBar, StyleSheet } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { HorizontalCard } from "../components/HorizontalCard";
import { VerticalCard } from "../components/VerticalCard";

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

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

export class Feed extends React.PureComponent<Props> {
  onPressTop = (id: number) => {
    this.props.navigation.navigate("Article", {
      id
    });
  };

  render() {
    return (
      <Query query={getArticles}>
        {({ loading, error, data: { getArticles: articles } }) => {
          return (
            <ScrollView style={styles.container}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  justifyContent: "center"
                }}
                style={{
                  paddingVertical: 20
                }}
              >
                {articles &&
                  articles
                    .slice(2)
                    .map((a: any) => (
                      <HorizontalCard
                        key={a.id}
                        article={a}
                        onPressTop={this.onPressTop}
                      />
                    ))}
              </ScrollView>

              {articles &&
                articles.map((item: any) => (
                  <VerticalCard
                    key={item.id}
                    data={item}
                    onPressTop={this.onPressTop}
                    
                  />
                ))}
            </ScrollView>
          );
        }}
      </Query>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: STATUSBAR_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: "#ecf0f1"
  }
});
