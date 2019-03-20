import gql from "graphql-tag";
import * as React from "react";
import { Query } from "react-apollo";
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from "react-native";
import { HorizontalCard } from "../components/HorizontalCard";

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
    fontSize: 13,
    color: "#9e9e9e"
  }
});

export class Feed extends React.PureComponent<{}> {
  render() {
    return (
      <Query query={getArticles}>
        {({ loading, error, data: { getArticles: articles } }) => {
          console.log(articles, loading, error);

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
                  // paddignTop: 20
                }}
              >
                {articles &&
                  articles
                    .slice(2)
                    .map((a: any) => <HorizontalCard key={a.id} article={a} />)}
              </ScrollView>

              {articles &&
                articles.map((a: any) => (
                  <View style={styles.card} key={a.id + "card"}>
                    <Text style={styles.card__category}>
                      SOFTWARE ENGINEERING
                    </Text>
                    <View style={styles.card__middle}>
                      <View style={{ width: 0, flexGrow: 1, flex: 1 }}>
                        <Text
                          style={styles.card__title}
                          ellipsizeMode="tail"
                          numberOfLines={2}
                        >
                          {a.title}
                        </Text>
                      </View>
                      <Image
                        source={{ uri: a.picture_url }}
                        style={{ width: 80, height: 80 }}
                      />
                    </View>
                    <View style={styles.card__bottom}>
                      <View>
                        <Text style={styles.card__username}>
                          {a.owner.fullname}
                        </Text>
                        <Text style={styles.card__date}>{a.creation_date}</Text>
                      </View>
                    </View>
                  </View>
                ))}
            </ScrollView>
          );
        }}
      </Query>
    );
  }
}

//  <Card
//                     key={`${l.id}-flc`}
//                     title={l.title}
//                     image={l.picture_url ? { uri: l.picture_url } : undefined}
//                   />
