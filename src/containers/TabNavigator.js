import React from "react";
import { createBottomTabNavigator } from "react-navigation";
import HomeScreen from "./HomeScreen";
import SettingsScreen from "./SettingsScreen";
import MapScreen from "./MapScreen";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Map: MapScreen,
    Settings: SettingsScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;

        switch (routeName) {
          case "Home":
            iconName = "ios-home";

            break;
          case "Settings":
            iconName = "ios-settings";

            break;
          case "Map":
            iconName = "ios-map";

            break;
          default:
            iconName = null;
        }

        return <Ionicons name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: "#FF5960",
      inactiveTintColor: "gray"
    }
  }
);

TabNavigator.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];
  let headerTitle;

  switch (routeName) {
    case "Home":
      headerTitle = (
        <View
          style={{ width: "100%", height: "100%", backgroundColor: "#FF5960" }}
        >
          <Text
            style={{
              textAlign: "center",
              paddingTop: "4%",
              color: "white",
              fontSize: 20,
              fontWeight: "bold"
            }}
          >
            MonAirbnb
          </Text>
        </View>
      );
      break;
    case "Settings":
      headerTitle = (
        <View
          style={{ width: "100%", height: "100%", backgroundColor: "#FF5960" }}
        >
          <Text
            style={{
              textAlign: "center",
              paddingTop: "4%",
              color: "white",
              fontSize: 20,
              fontWeight: "bold"
            }}
          >
            Paramètres
          </Text>
        </View>
      );
      break;
    case "Map":
      headerTitle = (
        <View
          style={{ width: "100%", height: "100%", backgroundColor: "#FF5960" }}
        >
          <Text
            style={{
              textAlign: "center",
              paddingTop: "4%",
              color: "white",
              fontSize: 20,
              fontWeight: "bold"
            }}
          >
            Map
          </Text>
        </View>
      );
      break;
    default:
      headerTitle = routeName;
  }

  return {
    headerTitle
  };
};

export default TabNavigator;
