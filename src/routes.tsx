import React from "react";
import { Platform, StatusBar } from "react-native";
// import { FontAwesome } from "react-native-vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";
import { AddNewArticleView } from "./modules/bookmark/BookmarkView";
import { Feed } from "./modules/feed/Feed";
import { LoginView } from "./modules/login/LoginView";
import { Profile } from "./modules/profile/ProfileView";
import { RegisterView } from "./modules/register/RegisterView";
import { BookmarkView } from "./modules/upload/AddNewArticleView";

const headerStyle = {
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

export const SignedOut = createStackNavigator(
  {
    SignUp: {
      screen: RegisterView
    },
    SignIn: {
      screen: LoginView
    }
  },
  {
    headerMode: "none",
    navigationOptions: {}
  }
);

export const SignedIn = createBottomTabNavigator(
  {
    Home: {
      screen: Feed,
      navigationOptions: {
        tabBarIcon: ({ tintColor }: { tintColor: any }) => (
          <Icon name="home" size={23} color={tintColor} />
        )
      }
    },
    Bookmark: {
      screen: BookmarkView,
      navigationOptions: {
        tabBarIcon: ({ tintColor }: { tintColor: any }) => (
          <Icon name="bookmark" size={23} color={tintColor} />
        )
      }
    },
    Upload: {
      screen: AddNewArticleView,
      navigationOptions: {
        tabBarIcon: ({ tintColor }: { tintColor: any }) => (
          <Icon name="plus-square" size={23} color={tintColor} />
        )
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarIcon: ({ tintColor }: { tintColor: any }) => (
          <Icon name="user" size={23} color={tintColor} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: "#000",
      showLabel: false,
      style: { backgroundColor: "#fff", height: 45 }
    }
  }
);

export const createRootNavigator = (signedIn = false) => {
  return createSwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn
      },
      SignedOut: {
        screen: SignedOut
      }
    },
    {
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
};
