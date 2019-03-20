import * as React from "react";
import { View } from "react-native";
import { NativeRouter, Route, Switch } from "react-router-native";
import { Feed } from "../modules/feed/Feed";
import { LoginView } from "../modules/login/LoginView";
import { RegisterView } from "../modules/register/RegisterView";

export const Routes = () => (
  <NativeRouter initialEntries={["/feed"]}>
    <Switch>
      <View style={{ flex: 1 }}>
        <Route exact={true} path="/login" component={LoginView} />
        <Route exact={true} path="/register" component={RegisterView} />
        <Route exact={true} path="/feed" component={Feed} />
      </View>
    </Switch>
  </NativeRouter>
);
