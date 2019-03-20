import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { createUploadLink } from "apollo-upload-client";
import { Platform } from "react-native";

const host =
  Platform.OS === "ios"
    ? "http://192.168.1.228:4000/graphql"
    : "http://192.168.1.228:4000/graphql";

const cache = new InMemoryCache();

export const client = new ApolloClient({
  link: createUploadLink({
    uri: host
  }),
  cache
});
