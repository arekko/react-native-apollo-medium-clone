import * as React from "react";
import { View } from "react-native";
import { NativeRouter, Route, Switch } from "react-router-native";
import { LoginView } from "../modules/login/LoginView";
import { RegisterView } from "../modules/register/RegisterView";

export const Routes = () => (
  <NativeRouter initialEntries={["/login"]}>
    <Switch>
      <View style={{ flex: 1 }}>
        <Route exact={true} path="/login" component={LoginView} />
        <Route exact={true} path="/register" component={RegisterView} />
      </View>
    </Switch>
  </NativeRouter>
);
