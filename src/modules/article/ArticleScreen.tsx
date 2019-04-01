import * as React from "react";
import { NavigationScreenProp } from "react-navigation";
import { withArticleView } from "../../hoc/withArticleView";
import { ArticleViewQuery_getArticle } from "../../schemaTypes";
import { Loader } from "../components/Loader";
import { ArticleView } from "./ui/ArticleView";

const BOTTOM_BAR_HEIGHT = 60;

interface Props {
  navigation: NavigationScreenProp<any, any>;
  loading: boolean;
  data: ArticleViewQuery_getArticle;
}

class C extends React.PureComponent<Props & any> {
  static navigationOptions = {
    title: "Home",
    headerStyle: {
      backgroundColor: "#f4511e"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  // componentDidMount() {
  //   console.log(this.props.data.getArticle);
  //   this.props.data.getArticle &&
  //     this.props.navigation.setParams({
  //       otherParam: this.props.data.getArticle.title
  //     });
  // }

  render() {
    const { loading, data } = this.props;

    return loading || !data.getArticle ? (
      <Loader size={100} color="#03a87c" />
    ) : (
      <ArticleView
        article={data.getArticle}
        navigation={this.props.navigation}
      />
    );
  }
}

export const ArticleScreen = withArticleView(C);
