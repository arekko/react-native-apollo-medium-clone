import gql from "graphql-tag";
import * as React from "react";
import { Query } from "react-apollo";
import {
  Dimensions,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet
} from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { GetArticlesQueryVariables } from "../../schemaTypes";
import { HorizontalCard } from "../components/HorizontalCard";
import { Loader } from "../components/Loader";
import { VerticalCard } from "../components/VerticalCard";

const getArticles = gql`
  query GetArticlesQuery($limit: Float!, $offset: Float!) {
    getArticles(limit: $limit, offset: $offset) {
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

// TODO: Create infinuty scroll list
// TODO: Create logic for top scrollView
// TODO: Implement bookmarks and Profile page

const SCREEN_WIDTH = Dimensions.get("screen").width;
const STATUSBAR_HEIGHT = StatusBar.currentHeight;

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

export class Feed extends React.PureComponent<Props> {
  state = {
    refreshing: false
  };

  static navigationOptions = {
    header: null
  };

  onPressTop = (id: number) => {
    this.props.navigation.navigate("Article", {
      id
    });
  };

  _onRefresh = async (refetch: any) => {
    await refetch();
    this.setState({ refreshing: false });
  };

  renderArticleList = (articles: any, refetch: any) => {
    return articles ? (
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 15 }}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={() => this._onRefresh(refetch)}
          />
        }
      >
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
          {articles.slice(0, 4).map((a: any) => (
            <HorizontalCard
              key={a.id}
              article={a}
              onPressTop={this.onPressTop}
            />
          ))}
        </ScrollView>

        {articles.map((item: any, i: number) => (
          <VerticalCard
            key={item.id}
            data={item}
            onPressTop={this.onPressTop}
          />
        ))}
      </ScrollView>
    ) : null;
  };

  render() {
    return (
      <Query<any, GetArticlesQueryVariables>
        query={getArticles}
        variables={{ limit: 10, offset: 0 }}
      >
        {({ loading, error, data: { getArticles: articles }, refetch }) => {
          return loading ? (
            <Loader size={0} color="#03a87c" />
          ) : (
            this.renderArticleList(articles, refetch)
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
    backgroundColor: "#ecf0f1",
    marginTop: 20
  }
});
