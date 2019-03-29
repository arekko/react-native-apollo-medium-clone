import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { formatDate } from "../../utils/formatDate";
import { readTime } from "../../utils/readTime";
import { capitalize } from '../../utils/capitalize';

interface VerticleCardProps {
  data: any;
  onPressTop: (id: number) => void;
}

export const VerticalCard: React.FC<VerticleCardProps> = props => {
  const { onPressTop, data } = props;

  return (
    <View style={styles.card} key={data.id + "card"}>
      {/* <Text style={styles.card__category}>SOFTWARE ENGINEERING</Text>  */}
      <TouchableOpacity onPress={() => onPressTop(data.id)}>
        <View style={styles.card__middle}>
          <View style={{ width: 0, flexGrow: 1, flex: 1 }}>
            <Text
              style={styles.card__title}
              ellipsizeMode="tail"
              numberOfLines={2}
            >
              {data.title}
            </Text>
          </View>
          <Image
            source={{ uri: data.picture_url }}
            style={{ width: 80, height: 80 }}
          />
        </View>
      </TouchableOpacity>
      <View style={styles.card__bottom}>
        <Text style={styles.card__username}>{capitalize(data.owner.fullname)}</Text>
        <View style={styles.card__stats}>
          <View style={styles.card__time}>
            <Text style={styles.card__date}>
              {formatDate(data.creation_date)}
            </Text>
            <Text style={styles.card__readTime}>
              {readTime(data.text)} min read
            </Text>
          </View>
          <Icon
            name="bookmark-border"
            size={20}
            color="#3e3e3e"
            style={styles.card__icon}
            onPress={() => console.log("pressed")}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    flexDirection: "column"
  },
  card__username: {
    fontSize: 15
  },
  card__date: {
    fontSize: 13,
    color: "#9e9e9e"
  },
  card__stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  card__time: {
    flexDirection: "row"
  },
  card__icon: { marginRight: 20 },
  card__readTime: {
    fontSize: 13,
    color: "#9e9e9e",
    marginLeft: 10
  }
});
