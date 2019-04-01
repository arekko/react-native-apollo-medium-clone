import * as React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

interface LoaderProps {
  size: number;
  color: string;
}

export const Loader: React.FC<LoaderProps> = ({ size = 0, color }) => (
  <View style={styles.container}>
    <ActivityIndicator size={size} color={color} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
