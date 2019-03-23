import gql from "graphql-tag";
import * as React from "react";
import { graphql } from "react-apollo";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";
import { NavigationScreenProp } from "react-navigation";

const logoutMutation = gql`
  mutation LogoutMutation {
    logout
  }
`;

const styles = StyleSheet.create({});

interface Props {
  mutate: () => boolean;
  navigation: NavigationScreenProp<any, any>;
}

export class C extends React.PureComponent<Props & any> {
  render() {
    console.log(this.props);
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Button
          title="Logout"
          onPress={async () => {
            await this.props.mutate();
            this.props.navigation.navigate("SignedOut");
          }}
        />
      </View>
    );
  }
}

export const Profile = graphql(logoutMutation)(C);
