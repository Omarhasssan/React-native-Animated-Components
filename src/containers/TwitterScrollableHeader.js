import React, { Component } from "react";
import { Text, Image, View, ScrollView, Animated } from "react-native";

IMAGE_HEIGHT_MAX = 40;
IMAGE_WIDTH_MAX = 40;

IMAGE_HEIGHT_MIN = 20;
IMAGE_WIDTH_MIN = 20;

BG_HEIGHT_MAX = 120;
BG_HEIGHT_MIN = 20;

BG_WIDTH_MAX = 100;

export default class Tst extends Component {
  constructor(props) {
    super(props);
    this.scrollY = new Animated.Value(0);
  }

  render() {
    const headerHeight = this.scrollY.interpolate({
      inputRange: [0, BG_HEIGHT_MAX - BG_HEIGHT_MIN],
      outputRange: [BG_HEIGHT_MAX, BG_HEIGHT_MIN],
      extrapolate: "clamp"
    });
    const profileHeight = this.scrollY.interpolate({
      inputRange: [0, BG_HEIGHT_MAX - BG_HEIGHT_MIN],
      outputRange: [IMAGE_HEIGHT_MAX, IMAGE_HEIGHT_MIN],
      extrapolate: "clamp"
    });
    const headerZIndex = this.scrollY.interpolate({
      inputRange: [0, BG_HEIGHT_MAX - BG_HEIGHT_MIN],
      outputRange: [0, 1],
      extrapolate: "clamp"
    });

    const nameOpacity = this.scrollY.interpolate({
      inputRange: [
        0,
        BG_HEIGHT_MAX - BG_HEIGHT_MIN,
        BG_HEIGHT_MAX - BG_HEIGHT_MIN + IMAGE_HEIGHT_MIN
      ],
      outputRange: [0, 0, 1],
      extrapolate: "clamp"
    });
    const namePosBottom = this.scrollY.interpolate({
      inputRange: [
        0,
        BG_HEIGHT_MAX - BG_HEIGHT_MIN,
        BG_HEIGHT_MAX - BG_HEIGHT_MIN + IMAGE_HEIGHT_MIN
      ],
      outputRange: [-20, -20, 0],
      extrapolate: "clamp"
    });
    return (
      <View style={{ flex: 1 }}>
        <Animated.View
          style={{
            backgroundColor: "lightskyblue",
            position: "absolute",
            height: headerHeight,
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
            zIndex: headerZIndex,
            alignItems: "center"
          }}
        >
          <Animated.View
            style={{
              position: "absolute",
              bottom: namePosBottom,
              opacity: nameOpacity
            }}
          >
            <Text style={{ fontSize: 12, color: "white" }}>Omar Hassan</Text>
          </Animated.View>
        </Animated.View>

        <ScrollView
          scrollEventThrottle={16}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: this.scrollY } } }
          ])}
          style={{ flex: 1 }}
        >
          <Animated.View
            style={{
              borderRadius: `${50}%`,
              borderWidth: "3px",
              overflow: "hidden",
              width: profileHeight,
              marginTop: BG_HEIGHT_MAX - IMAGE_HEIGHT_MAX / 2,
              marginLeft: 10,
              height: profileHeight
            }}
          >
            <Image
              style={{ flex: 1, width: null, height: null }}
              source={require("../assets/me.jpg")}
            />
          </Animated.View>
          <View
            style={{
              paddingLeft: 10
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold"
              }}
            >
              Omar Hasssan
            </Text>
          </View>
          <View style={{ height: 1000 }} />
        </ScrollView>
      </View>
    );
  }
}
