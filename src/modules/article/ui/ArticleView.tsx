import * as React from "react";
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { NavigationScreenProp } from "react-navigation";
import { ArticleViewQuery_getArticle } from "../../../schemaTypes";
import { formatDate } from "../../../utils/formatDate";
import { readTime } from "../../../utils/readTime";
const BOTTOM_BAR_HEIGHT = 60;

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
const BOX_SIZE = Dimensions.get("window").width / 2 - 12;
const HEADER_HEIGHT = 44;

interface ArticleViewProps {
  article: ArticleViewQuery_getArticle;
  navigation: NavigationScreenProp<any, any>;
}

export class ArticleView extends React.PureComponent<ArticleViewProps> {
  _previousScrollvalue: any;
  _currentScrollValue: any;
  _scrollEndTimer: any;

  state = {
    scrollAnim: new Animated.Value(0),
    offsetAnim: new Animated.Value(0)
  };

  componentDidMount() {
    this.state.scrollAnim.addListener(this._handleScroll);
    console.log(this.props);
  }

  componentWillUnmount() {
    this.state.scrollAnim.removeListener(this._handleScroll as any);

    this.props.navigation.setParams({
      otherParam: this.props.article.title
    });
  }

  _handleScroll = ({ value }: any) => {
    this._previousScrollvalue = this._currentScrollValue;
    this._currentScrollValue = value;
  };

  _handleScrollEndDrag = () => {
    this._scrollEndTimer = setTimeout(this._handleMomentumScrollEnd, 200);
  };

  _handleMomentumScrollBegin = () => {
    clearTimeout(this._scrollEndTimer);
  };

  _handleMomentumScrollEnd = () => {
    const previous = this._previousScrollvalue;
    const current = this._currentScrollValue;

    if (previous > current || current < HEADER_HEIGHT) {
      // User scrolled down or scroll amount was too less, lets snap back our header
      Animated.spring(this.state.offsetAnim, {
        toValue: -current,
        tension: 300,
        friction: 35
      }).start();
    } else {
      Animated.timing(this.state.offsetAnim, {
        toValue: 0,
        duration: 1000
      }).start();
    }
  };

  renderArticleView = (article: any, translateY: any) => (
    <View>
      <AnimatedScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event([
          {
            nativeEvent: { contentOffset: { y: this.state.scrollAnim } }
          }
        ])}
        onMomentumScrollBegin={this._handleMomentumScrollBegin}
        onMomentumScrollEnd={this._handleMomentumScrollEnd}
        onScrollEndDrag={this._handleScrollEndDrag}
      >
        <View>
          <View style={styles.top}>
            <Text style={styles.top__title}>{article.title}</Text>
            <View style={styles.top__stats}>
              <Text style={styles.top__fullname}>{article.owner.fullname}</Text>
              <Text style={styles.top__date}>
                {formatDate(article.creation_date)}
              </Text>
              <Text style={styles.top__readtime}>
                {readTime(article.text)} min read
              </Text>
            </View>
          </View>
          <Image
            source={{ uri: article.picture_url }}
            style={{ height: 200, width: "100%" }}
          />
          <View style={styles.bottom}>
            <Text style={styles.bottom__text}>{article && article.text}</Text>
          </View>
        </View>
      </AnimatedScrollView>

      <Animated.View style={[styles.navbar, { transform: [{ translateY }] }]}>
        <Text>bottom</Text>
      </Animated.View>
    </View>
  );

  render() {
    const { scrollAnim, offsetAnim } = this.state;
    const translateY = Animated.add(scrollAnim, offsetAnim).interpolate({
      inputRange: [0, HEADER_HEIGHT],
      outputRange: [0, 2 * HEADER_HEIGHT],
      extrapolate: "clamp"
    });

    const { article } = this.props;

    return this.renderArticleView(article, translateY);
  }
}

const styles = StyleSheet.create({
  top: {
    padding: 10,
    marginBottom: 10
  },
  top__stats: {
    flexDirection: "row",
    marginTop: 15
  },
  top__title: {
    fontSize: 33,
    fontWeight: "bold"
  },
  top__fullname: {
    color: "#111",
    fontSize: 15,
    marginRight: 5
  },
  top__date: {
    color: "#9e9e9e",
    fontSize: 14,
    marginRight: 5
  },
  top__readtime: {
    color: "#9e9e9e",
    fontSize: 14
  },
  top__image: {},
  bottom: {
    padding: 10,
    marginBottom: 50
  },
  bottom__text: {
    fontSize: 21,
    color: "rgba(0,0,0,.84)"
  },

  navbar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    backgroundColor: "white",
    borderBottomColor: "#dedede",
    borderBottomWidth: 1,
    height: BOTTOM_BAR_HEIGHT,
    justifyContent: "center"
  }
});
