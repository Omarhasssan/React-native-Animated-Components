import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Animated,
  PanResponder
} from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const ARTICLES = [{ id: "0", txt: "pan 1" }, { id: "1", txt: "pan 2" }];

class DeckSwiper extends Component {
  constructor(props) {
    super(props);

    this.position = new Animated.ValueXY();
    this.swipedCardPosition = new Animated.ValueXY({ x: 0, y: -SCREEN_HEIGHT });
    this.state = {
      currentIndex: 0
    };
  }

  componentWillMount() {
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy > 0 && this.state.currentIndex > 0) {
          console.log("HEREEEEEEEEEEE");
          this.swipedCardPosition.setValue({
            x: 0,
            y: -SCREEN_HEIGHT + gestureState.dy
          });
        } else {
          this.position.setValue({ y: gestureState.dy });
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (-gestureState.dy > 50) {
          Animated.timing(this.position, {
            toValue: { x: 0, y: -SCREEN_HEIGHT },
            duration: 400
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 });
            this.position.setValue({ x: 0, y: 0 });
          });
        } else if (this.state.currentIndex > 0) {
          console.log("IN ELSE");
          Animated.timing(this.swipedCardPosition, {
            toValue: { x: 0, y: 0 },
            duration: 400
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex - 1 });
            //this.swipedCardPosition.setValue({ x: 0, y: 0 });
          });
        } else if (this.state.currentIndex == 0) {
          Animated.timing(this.position, {
            toValue: { x: 0, y: 0 }
          }).start();
        }
      }
    });
  }
  render() {
    return ARTICLES.map((item, i) => {
      if (i == this.state.currentIndex - 1) {
        console.log("BOO");
        return (
          <Animated.View
            key={item.id}
            style={this.swipedCardPosition.getLayout()}
            {...this.PanResponder.panHandlers}
          >
            <View
              style={{
                flex: 1,
                position: "absolute",
                height: SCREEN_HEIGHT,
                width: SCREEN_WIDTH,
                backgroundColor: "blue"
              }}
            >
              <Text>{item.txt}</Text>
            </View>
          </Animated.View>
        );
      } else if (i < this.state.currentIndex) {
        return null;
      } else if (i == this.state.currentIndex) {
        console.log("curntIndx", this.state.currentIndex);
        return (
          <Animated.View
            key={item.id}
            style={this.position.getLayout()}
            {...this.PanResponder.panHandlers}
          >
            <View
              style={{
                flex: 1,
                position: "absolute",
                height: SCREEN_HEIGHT,
                width: SCREEN_WIDTH,
                backgroundColor: "white"
              }}
            >
              <Text>{item.txt}</Text>
            </View>
          </Animated.View>
        );
      } else {
        return (
          <Animated.View key={item.id}>
            <View
              style={{
                flex: 1,
                position: "absolute",
                height: SCREEN_HEIGHT,
                width: SCREEN_WIDTH,
                backgroundColor: "green"
              }}
            >
              <Text>{item.txt}</Text>
            </View>
          </Animated.View>
        );
      }
    }).reverse();
  }
}
export default DeckSwiper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
