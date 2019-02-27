import React from "react";
import {
  TouchableOpacity,
  AsyncStorage,
  View,
  TextInput,
  StyleSheet,
  Text,
  Alert
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

class SignInScreen extends React.Component {
  state = {
    email: "",
    password: ""
  };

  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };

  signInAsync = async () => {
    try {
      const response = await axios.post(
        "https://airbnb-api.now.sh/api/user/log_in",
        {
          email: this.state.email,
          password: this.state.password
        }
      );
      console.log(response.data);
      await AsyncStorage.setItem("userToken", "abc");
      this.props.navigation.navigate("App");
    } catch (error) {
      Alert.alert(
        "                      Error",
        "You have entered an invalid email or password",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
  };

  render() {
    return (
      <View style={styles.logView}>
        <Ionicons name="md-home" size={100} color="white" style={styles.ico} />
        <Text style={styles.welcome}>Welcome</Text>
        <TextInput
          style={styles.emailInput}
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          style={styles.passwordInput}
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <TouchableOpacity
          style={styles.buttonCenter}
          onPress={this.signInAsync}
        >
          <Text style={styles.button}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logView: {
    flex: 1,
    backgroundColor: "#FF5960",
    padding: 40
  },
  ico: {
    textAlign: "center"
  },
  welcome: {
    color: "white",
    fontSize: 40,
    textAlign: "center",
    marginTop: 40
  },
  emailInput: {
    padding: 15,
    height: 60,
    borderBottomColor: "white",
    borderBottomWidth: 1,
    color: "white",
    fontSize: 20
  },
  passwordInput: {
    padding: 15,
    height: 60,
    borderBottomColor: "white",
    borderBottomWidth: 1,
    color: "white",
    fontSize: 20
  },
  buttonCenter: {
    alignItems: "center"
  },
  button: {
    textAlign: "center",
    marginTop: 40,
    backgroundColor: "white",
    color: "#FF5960",
    height: 60,
    width: 140,
    borderRadius: 30,
    fontSize: 20,
    lineHeight: 60
  }
});

export default SignInScreen;
