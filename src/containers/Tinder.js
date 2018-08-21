import React, { Component } from "react";
import {
  Text,
  Image,
  View,
  ScrollView,
  Animated,
  PanResponder,
  Dimensions
} from "react-native";

const Users = [
  { id: "1", uri: require("../assets/1.png") },
  { id: "2", uri: require("../assets/2.png") }
];
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
export default class Tinder extends Component {
  constructor(props) {
    super(props);
    this.position = new Animated.ValueXY({ x: 0, y: 0 });
    this.rotatePos = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: ["-10deg", "0deg", "10deg"]
    });
    this.nextCardScale = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0.8, 1],
      extrapolate: "clamp"
    });
    this.rotateAndTranslate = {
      transform: [
        {
          rotate: this.rotatePos
        },
        ...this.position.getTranslateTransform()
      ]
    };
  }
  state = { curntIndex: 0 };
  componentWillMount() {
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        this.position.extractOffset();
      },
      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 100) {
          console.log("HERE");
          Animated.spring(this.position.x, {
            toValue: SCREEN_WIDTH + 100
          }).start(() => {
            this.setState({ curntIndex: this.state.curntIndex + 1 });
            this.position.setValue({ x: 0, y: 0 });
          });
        }
      }
    });
  }

  renderUsers = () => {
    return Users.map((item, i) => {
      console.log(i);
      if (i < this.state.curntIndex) return null;
      if (this.state.curntIndex == i) {
        return (
          <Animated.View
            {...this.PanResponder.panHandlers}
            key={item.id}
            style={[
              this.rotateAndTranslate,
              {
                height: SCREEN_HEIGHT - 120,
                width: SCREEN_WIDTH,
                padding: 10,
                position: "absolute"
              }
            ]}
          >
            <Image
              style={{ flex: 1, width: null, height: null }}
              source={item.uri}
            />
          </Animated.View>
        );
      } else {
        return (
          <Animated.View
            key={item.id}
            style={[
              { transform: [{ scale: this.nextCardScale }] },
              {
                height: SCREEN_HEIGHT - 120,
                width: SCREEN_WIDTH,
                padding: 10,
                position: "absolute"
              }
            ]}
          >
            <Image
              style={{ flex: 1, width: null, height: null }}
              source={item.uri}
            />
          </Animated.View>
        );
      }
    }).reverse();
  };

  render() {
    return <View style={{ flex: 1 }}>{this.renderUsers()}</View>;
  }
}
