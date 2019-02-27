import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
  View
} from "react-native";

class SettingsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      tabBarLabel: "Paramètres"
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.buttonCenter}
          onPress={this.signOutAsync}
        >
          <Text style={styles.button}>Log Out</Text>
        </TouchableOpacity>
      </View>
    );
  }

  signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    textAlign: "center",
    backgroundColor: "#FF5960",
    color: "white",
    height: 60,
    width: 140,
    borderRadius: 30,
    fontSize: 20,
    lineHeight: 60
  }
});

export default SettingsScreen;
