import * as React from "react";
import { ApolloProvider } from "react-apollo";
import { createAppContainer } from "react-navigation";
import { client } from "./apollo";
import { createRootNavigator } from "./routes";
// import { Routes } from "./routes";

export default class App extends React.PureComponent {
  render() {
    // const Layout = createRootNavigator(true);
    const AppContainer = createAppContainer(createRootNavigator(true));
    return (
      <ApolloProvider client={client}>
        <AppContainer />
      </ApolloProvider>
    );
  }
}
