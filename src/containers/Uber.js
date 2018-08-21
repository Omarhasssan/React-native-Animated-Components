import React, { Component } from "react";

import {
  Text,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
  PanResponder,
  Slider,
  ImageBackground,
  TextInput,
  Keyboard
} from "react-native";
import { Icon } from "native-base";
import { Header } from "react-navigation";
import * as Animatable from "react-native-animatable";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
export default class Uber extends Component {
  static navigationOptions = {
    //header: null,
    headerStyle: {
      backgroundColor: "white",
      borderBottomWidth: 0
      // height: 20
    }
  };
  state = { headerHeight: 0 };
  constructor(props) {
    super(props);
    this.LoginHeight = new Animated.Value(150);
    this.ArrowRightPos = new Animated.Value(10);
  }
  componentWillMount() {
    Keyboard.addListener("keyboardWillShow", this.keboardWillShow);
    // this.keboardWillHide = Keyboard.addListener(
    //   "keyboardWillHide",
    //   this.keboardWillHide
    // );
    // //android
    // this.keboardDidShow = Keyboard.addListener(
    //   "keyboardDidShow",
    //   this.keboardWillShow
    // );
    // this.keboardDidHide = Keyboard.addListener(
    //   "keyboardDiDHide",
    //   this.keboardWillHide
    // );
  }
  keboardWillShow = event => {
    console.log("keyboardHeight", event.endCoordinates.height);
    Animated.timing(this.ArrowRightPos, {
      toValue: event.endCoordinates.height + 90,
      duration: event.duration
    }).start();
  };
  increaseLoginHeight = () => {
    console.log("increaseLoginHeight");
    Animated.timing(this.LoginHeight, {
      toValue: SCREEN_HEIGHT,
      duration: 400
    }).start(() => {
      this.refs.textInput.focus();
    });
  };
  decreaseLoginHeight = () => {
    Keyboard.dismiss();
    console.log("decreaseLoginHeights");
    Animated.timing(this.LoginHeight, {
      toValue: 150,
      duration: 400
    }).start();
  };
  onLayout = ({
    nativeEvent: {
      layout: { height }
    }
  }) => {
    console.log(SCREEN_HEIGHT, height);
    this.setState({ headerHeight: SCREEN_HEIGHT - height });
  };
  render() {
    const ArrowOpactiy = this.LoginHeight.interpolate({
      inputRange: [150, SCREEN_HEIGHT],
      outputRange: [0, 1]
    });
    const ArrowForwardOpactiy = this.LoginHeight.interpolate({
      inputRange: [150, SCREEN_HEIGHT],
      outputRange: [0, 1]
    });
    const testOpactiy = this.LoginHeight.interpolate({
      inputRange: [150, SCREEN_HEIGHT],
      outputRange: [1, 0]
    });
    return (
      <View
        style={{
          flex: 1
        }}
        onLayout={this.onLayout}
      >
        <ImageBackground
          style={{ flex: 2, justifyContent: "center", alignItems: "center" }}
          source={require("../assets/login_bg.jpg")}
        >
          <View
            style={{
              height: 70,
              width: 70,
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Animatable.Text
              animation={"zoomIn"}
              iterationCount={1}
              style={{ fontWeight: "bold", fontSize: "20" }}
            >
              Uber
            </Animatable.Text>
          </View>
        </ImageBackground>

        <Animatable.View
          animation={"slideInUp"}
          iterationCount={1}
          style={{
            //flex: 1,
            height: this.LoginHeight,
            backgroundColor: "white"
          }}
        >
          <Animated.View
            style={{
              position: "absolute",
              top: 0,
              opacity: ArrowOpactiy,
              marginLeft: 10,
              zIndex: 1000000
            }}
          >
            <Icon
              onPress={this.decreaseLoginHeight}
              name="ios-arrow-back"
              style={{ color: "black" }}
            />
          </Animated.View>
          <View
            style={{
              flex: 2,
              //backgroundColor: "lightskyblue",
              paddingHorizontal: 20
              //justifyContent: "space-around"
              //justifyContent: "center"
            }}
          >
            <Animated.Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
                marginBottom: 10,
                opacity: testOpactiy
              }}
            >
              Get Moving With Uber
            </Animated.Text>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                //backgroundColor: "yellow",
                maxHeight: 50,
                alignItems: "center"
                //justifyContent: "space-evenly"
              }}
            >
              <Image
                source={require("../assets/india.png")}
                // resizeMode={"contain"}
                style={{ width: 40, height: 40, marginRight: 5 }}
              />
              <Text style={{ marginRight: 5 }}>+91</Text>
              <TextInput
                ref={"textInput"}
                onFocus={this.increaseLoginHeight}
                style={{ marginRight: 5 }}
                placeholder={"Enter your Mobile Number"}
              />
            </View>
          </View>
          <Animated.View
            style={{
              flex: 1,
              borderTopWidth: "1px",
              borderTopColor: "gray",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 20,
              paddingVertical: 10,
              flexDirection: "row"
            }}
          >
            <Animated.Text style={{ opacity: testOpactiy }}>
              SOME FUCKING TEXT
            </Animated.Text>
            <Animated.View
              // {...this.ArrowRightPos.getLayout()}
              style={{
                width: 50,
                height: 50,
                backgroundColor: "gray",
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                bottom: this.ArrowRightPos,
                right: 10,
                opacity: ArrowForwardOpactiy
              }}
            >
              <Icon name="ios-arrow-forward" style={{ color: "black" }} />
            </Animated.View>
          </Animated.View>
        </Animatable.View>
      </View>
    );
  }
}
