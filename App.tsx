import React from "react";
import Constants from 'expo-constants'
import { StyleSheet, Text, View, StatusBar } from "react-native";
import Quiz from "./screens/Quiz";
import Colors from "./constants/Colors";
import Deck from "./screens/Deck";

const CustomStatusBar = ({ backgroundColor, ...props }) => {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent={true} backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default function App() {
  return (
    <View style={[styles.container, { height: Constants.statusBarHeight }]}>
      <CustomStatusBar backgroundColor={Colors.primary} />
      <Quiz title={"quiz"} quizIndicator={"1 / 2"} />
      {/* <Deck /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
});
