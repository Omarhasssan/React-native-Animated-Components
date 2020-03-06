import { createStackNavigator } from "react-navigation";
import TwitterScrollableHeader from "../containers/TwitterScrollableHeader";
import DeckSwiper from "../containers/DeckSwiper";
import Itunes from "../containers/Itunes";
import Uber from "../containers/Uber";
import Tinder from "../containers/Tinder";

//hi

const Screens = createStackNavigator({
  Tinder: {
    screen: Tinder,
    navigationOptions: {
      title: "Tinder"
    }
  },
  Itunes: {
    screen: Itunes,
    navigationOptions: {
      title: "Itunes"
    }
  },
  Uber: {
    screen: Uber
  },
  SwipeToNextArticle: {
    screen: DeckSwiper,
    navigationOptions: {
      title: "Swipe to Next Article "
    }
  },
  TwitterScrollableHeader: {
    screen: TwitterScrollableHeader,
    navigationOptions: {
      title: "Twitter Scrollable Header "
    }
  }
});
export default Screens;
