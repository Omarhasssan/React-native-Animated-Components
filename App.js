import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Screens from "./src/screens";

export default class App extends React.Component {
  render() {
    console.disableYellowBox = true;

    return <Screens />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
