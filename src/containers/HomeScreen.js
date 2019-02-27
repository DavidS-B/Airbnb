import React from "react";
import {
  // Button,
  View,
  FlatList,
  Text,
  ScrollView,
  ProgressBarAndroid,
  Image,
  StyleSheet,
  ImageBackground
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

class HomeScreen extends React.Component {
  state = {
    tab: [],
    isLoading: true
  };

  async componentDidMount() {
    const response = await axios.get(
      "https://airbnb-api.now.sh/api/room?city=paris"
    );
    this.setState({
      tab: response.data,
      isLoading: false
    });
  }

  static navigationOptions = ({ navigation }) => {
    return {
      tabBarLabel: "MonAirbnb"
    };
  };

  render() {
    if (this.state.isLoading === true) {
      return (
        <View style={{ flex: 1 }}>
          <ProgressBarAndroid
            styleAttr="Large"
            color="#FF5960"
            style={{ marginTop: "60%" }}
          />
        </View>
      );
    } else {
      return (
        <ScrollView>
          {this.state.tab.rooms.map(i => {
            return (
              <FlatList
                style={styles.columnThing}
                data={[
                  {
                    id: i._id,
                    title: i.title,
                    price: i.price,
                    reviews: i.reviews
                  }
                ]}
                keyExtractor={item => String(item.id)}
                key={i._id}
                renderItem={({ item }) => (
                  <View style={{ textAlign: "center" }}>
                    <ImageBackground
                      source={{ uri: i.photos[0] }}
                      style={{
                        width: "100%",
                        height: 200,
                        marginBottom: 10,
                        marginTop: 20
                      }}
                    >
                      <Text
                        style={{
                          backgroundColor: "black",
                          color: "white",
                          width: 100,
                          height: 50,
                          textAlign: "center",
                          lineHeight: 50,
                          marginTop: 140,
                          fontSize: 20
                        }}
                      >
                        {item.price} €
                      </Text>
                    </ImageBackground>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flexDirection: "column", width: "71.9%" }}>
                        <Text
                          style={{
                            fontSize: 18,
                            paddingTop: 20,
                            paddingRight: 10
                          }}
                          numberOfLines={1}
                          ellipsizeMode={"tail"}
                        >
                          {item.title}
                        </Text>
                        <View style={{ flexDirection: "row", paddingTop: 10 }}>
                          <Ionicons
                            name="ios-star"
                            size={20}
                            color={i.ratingValue > 0 ? "#FFB400" : "#C5C5C5"}
                          />
                          <Ionicons
                            name="ios-star"
                            size={20}
                            color={i.ratingValue > 1 ? "#FFB400" : "#C5C5C5"}
                          />
                          <Ionicons
                            name="ios-star"
                            size={20}
                            color={i.ratingValue > 2 ? "#FFB400" : "#C5C5C5"}
                          />
                          <Ionicons
                            name="ios-star"
                            size={20}
                            color={i.ratingValue > 3 ? "#FFB400" : "#C5C5C5"}
                          />
                          <Ionicons
                            name="ios-star"
                            size={20}
                            color={i.ratingValue > 4 ? "#FFB400" : "#C5C5C5"}
                          />
                          <Text
                            style={{
                              color: "#7D848D",
                              fontSize: 17,
                              paddingLeft: 5
                            }}
                          >
                            {item.reviews} reviews
                          </Text>
                        </View>
                      </View>
                      <Image
                        style={{ width: 90, height: 90, borderRadius: 50 }}
                        source={{ uri: i.user.account.photos[0] }}
                      />
                    </View>
                    <View
                      style={{
                        marginTop: 20,
                        width: "100%",
                        height: 2,
                        backgroundColor: "#D8D8D8"
                      }}
                    />
                  </View>
                )}
              />
            );
          })}
        </ScrollView>
      );
    }
  }

  showMoreApp = () => {
    this.props.navigation.navigate("Other");
  };
}

const styles = StyleSheet.create({
  columnThing: {
    paddingRight: 20,
    paddingLeft: 20
  }
});

export default HomeScreen;
