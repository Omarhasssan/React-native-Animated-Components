import React, { Component } from "react";
import {
  Text,
  Image,
  View,
  ScrollView,
  Animated,
  Dimensions,
  PanResponder,
  Slider
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Header } from "react-navigation";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
export default class Itunes extends Component {
  constructor(props) {
    super(props);
    this.position = new Animated.ValueXY({
      x: 0,
      y: 0
    });
  }
  state = {
    offset: 0,
    visted: false
  };

  onLayout = ({
    nativeEvent: {
      layout: { height }
    }
  }) => {
    const offset = SCREEN_HEIGHT - height;
    this.setState({ offset });
  };
  componentWillMount() {
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        this.position.extractOffset();
      },
      onPanResponderMove: (evt, gestureState) => {
        if (
          gestureState.dy > 0 &&
          gestureState.moveY > SCREEN_HEIGHT - (50 + this.state.offset)
        ) {
          this.position.setValue({ x: 0, y: 0 });
        } else if (gestureState.dy < 0) {
          Animated.timing(this.position, {
            toValue: { x: 0, y: -SCREEN_HEIGHT + (50 + this.state.offset) },
            duration: 400
          }).start();
        } else if (gestureState.dy > 0) {
          Animated.timing(this.position, {
            toValue: { x: 0, y: SCREEN_HEIGHT - (50 + this.state.offset) },
            duration: 400
          }).start();
        }
      }
    });
  }

  render() {
    const imgMargin = this.position.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - (50 + this.state.offset)],
      outputRange: [SCREEN_WIDTH / 2 - 100, 0],
      extrapolate: "clamp"
    });
    const imgSize = this.position.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - (50 + this.state.offset)],
      outputRange: [200, 35],
      extrapolate: "clamp"
    });
    const songNameOpacity = this.position.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - (50 + this.state.offset)],
      outputRange: [0, 1],
      extrapolate: "clamp"
    });
    const songBtns = this.position.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - (50 + this.state.offset)],
      outputRange: [0, 1],
      extrapolate: "clamp"
    });
    const animatedHeight = this.position.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - (50 + this.state.offset)],
      outputRange: [SCREEN_HEIGHT, 50],
      extrapolate: "clamp"
    });
    if (this.state.offset > 0 && !this.state.visted) {
      this.position.setValue({
        x: 0,
        y: SCREEN_HEIGHT - (50 + this.state.offset)
      });
      this.setState({ visted: true });
    }
    return (
      <View
        style={{ flex: 1, backgroundColor: "white" }}
        onLayout={this.onLayout}
      >
        <Animated.View
          {...this.PanResponder.panHandlers}
          style={[
            { ...this.position.getLayout() },

            {
              borderTopWidth: "1px",
              height: animatedHeight,
              //backgroundColor: "lightskyblue",
              justifyContent: "center"
            }
          ]}
        >
          <View
            style={{
              height: `${80}%`
            }}
          >
            <Animated.View
              style={{
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  flex: 4,
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <Animated.View
                  style={{
                    width: imgSize,
                    height: imgSize,
                    marginLeft: imgMargin,
                    marginRight: 5
                  }}
                >
                  <Image
                    style={{ flex: 1, width: null, height: null }}
                    source={require("../assets/me.jpg")}
                  />
                </Animated.View>
                <Animated.View style={{ opacity: songNameOpacity }}>
                  <Text>Song Name</Text>
                </Animated.View>
              </View>
              <Animated.View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  opacity: songBtns
                }}
              >
                <Ionicons name="md-pause" size={32} />
                <Ionicons name="md-play" size={32} />
              </Animated.View>
            </Animated.View>
            <Animated.View
              style={{
                flex: 1,
                alignItems: "center",
                //height: `${30}%`,
                paddingVertical: 20
                // justifyContent: "space-around"
              }}
            >
              <View>
                <Text style={{ fontWeight: "bold", fontSize: 22 }}>
                  Hotel California (Live)
                </Text>
                <Text style={{ fontSize: 18, color: "#fa95ed" }}>
                  Eagles - Hell Freezes Over
                </Text>
              </View>
              <View>
                <Slider
                  style={{ width: 300 }}
                  step={1}
                  minimumValue={18}
                  maximumValue={71}
                  value={18}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  // backgroundColor: "blue",
                  width: `${70}%`,
                  justifyContent: "space-around",
                  alignItems: "center"
                }}
              >
                <Ionicons name="md-rewind" size={40} />
                <Ionicons name="md-pause" size={50} />
                <Ionicons name="md-fastforward" size={40} />
              </View>
            </Animated.View>
          </View>
        </Animated.View>
      </View>
    );
  }
}
