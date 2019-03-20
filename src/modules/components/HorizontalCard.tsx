import * as React from "react";
import {
  Dimensions,
  Image,
  ImageStyle,
  StyleSheet,
  Text,
  View
} from "react-native";
import { capitalize } from "../../utils/capitalize";

interface User {
  username: string;
  email: string;
  fullname: string;
  register_date: string;
}

interface Article {
  picture_url: string;
  title: string;
  owner: User;
  creation_date: string;
}

interface Props {
  article: Article;
}

const SCREEN_WIDTH = Dimensions.get("screen").width;

export const HorizontalCard: React.FC<Props> = ({
  article: {
    picture_url,
    title,
    owner: { fullname },
    creation_date
  }
}) => (
  <View style={styles.card}>
    <Image
      style={styles.card__img as ImageStyle}
      source={{
        uri: picture_url
      }}
    />
    <View>
      <Text style={styles.card__title}>{title}</Text>
    </View>
    <View style={styles.card__bottom}>
      <Text style={styles.card__username}>{capitalize(fullname)}</Text>
      <Text style={styles.card__date}>{creation_date}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    width: SCREEN_WIDTH * 0.9,
    alignSelf: "center",
    backgroundColor: "#fff",
    marginRight: SCREEN_WIDTH * 0.05,
    marginLeft: SCREEN_WIDTH * 0.05,
    shadowColor: "#ddd",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1
  },
  card__img: {
    height: 100,
    width: "100%"
  },
  card__title: {
    padding: 15,
    fontSize: 20,
    fontWeight: "500"
  },
  card__bottom: {
    flexDirection: "column",
    padding: 15,
    paddingTop: 0
  },
  card__username: {
    fontSize: 16,
    color: "#111"
  },
  card__date: {
    paddingTop: 5,
    fontSize: 14,
    color: "#9e9e9e"
  }
});
