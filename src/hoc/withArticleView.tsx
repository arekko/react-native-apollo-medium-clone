// @ts-ignore
import gql from "graphql-tag";
import * as React from "react";
import { Query } from "react-apollo";
import { NavigationScreenProp } from "react-navigation";
import {
  ArticleViewQuery,
  ArticleViewQueryVariables,
  ArticleViewQuery_getArticle
} from "../schemaTypes";

const articleViewQuery = gql`
  query ArticleViewQuery($id: Float!) {
    getArticle(id: $id) {
      title
      creation_date
      picture_url
      text
      owner {
        fullname
        username
      }
    }
  }
`;

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

export interface WithArticleView {
  articles: ArticleViewQuery_getArticle;
  loading: boolean;
}

export const withArticleView = (Wrapped: any) => {
  return class extends React.Component<Props> {
    static navigationOptions = ({ navigation }: any) => {
      return {
        title: navigation.getParam("otherParam", "")
      };
    };
    render() {
      const { navigation } = this.props;
      const itemId: number = parseInt(navigation.getParam("id"));
      return (
        <Query<ArticleViewQuery, ArticleViewQueryVariables>
          query={articleViewQuery}
          variables={{ id: itemId }}
        >
          {({ data, loading, error }) => {
            return (
              <Wrapped
                {...this.props}
                data={data}
                loading={loading}
                error={error}
              />
            );
          }}
        </Query>
      );
    }
  };
};
