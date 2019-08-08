import React from "react";
import Constants from 'expo-constants'
import { StyleSheet, View, StatusBar } from "react-native";
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Colors from "./constants/Colors";
import StackNavs from "./screens/StackNavs";
import reducers from "./reducers"
import middleware from "./middleware"

const CustomStatusBar = ({ backgroundColor, ...props }) => {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent={true} backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default function App() {
  return (
    <Provider store={createStore(reducers, middleware)}>
      <View style={[styles.container, { height: Constants.statusBarHeight }]}>
        <CustomStatusBar backgroundColor={Colors.primary} />
        <StackNavs />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
});
