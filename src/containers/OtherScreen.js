import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  ProgressBarAndroid,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-swiper";
import { MapView } from "expo";
import axios from "axios";

class OtherScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: null,
      headerTitle: (
        <View
          style={{
            backgroundColor: "#FF5960",
            width: "100%",
            height: "100%",
            flexDirection: "row",
            marginBottom: 23,
            justifyContent: "space-between"
          }}
        >
          <TouchableOpacity
            style={{ paddingLeft: "5%", width: 50, height: 30 }}
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <Ionicons name="ios-arrow-back" size={30} color="white" />
          </TouchableOpacity>

          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
              paddingRight: 60
            }}
          >
            Room
          </Text>
          <View />
        </View>
      ),
      headerStyle: {
        backgroundColor: "#FF5960",
        width: "100%",
        height: 29,
        marginTop: 24
      }
    };
  };

  state = {
    tab: [],
    isLoading: true,
    nbLines: 3,
    nbLinesTitle: 1,
    location: null
  };

  async componentDidMount() {
    const response = await axios.get(
      "https://airbnb-api.now.sh/api/room/" +
        this.props.navigation.state.params.id
    );
    this.setState({
      tab: response.data,
      isLoading: false
    });
  }

  renderOffer = () => {
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
          <Swiper
            style={styles.wrapper}
            height={240}
            onMomentumScrollEnd={(e, state, context) =>
              console.log("index:", state.index)
            }
            dot={<View />}
            activeDotColor={"white"}
            paginationStyle={{
              bottom: -23,
              left: null,
              right: 10
            }}
            loop
          >
            {this.state.tab.photos.map((i, index) => {
              return (
                <View style={styles.slide} key={index}>
                  <ImageBackground
                    source={{ uri: i }}
                    style={{
                      width: "100%",
                      height: 250,
                      marginBottom: 10
                    }}
                  >
                    {index % 5 == 0 ? (
                      <Text
                        style={{
                          backgroundColor: "black",
                          color: "white",
                          width: 100,
                          height: 50,
                          textAlign: "center",
                          lineHeight: 50,
                          marginTop: 190,
                          fontSize: 20
                        }}
                      >
                        {this.state.tab.price} €
                      </Text>
                    ) : null}
                  </ImageBackground>
                </View>
              );
            })}
          </Swiper>
          <View style={{ paddingRight: 20, paddingLeft: 20, paddingTop: 15 }}>
            <View
              style={{
                flexDirection: "row"
              }}
            >
              <View style={{ flexDirection: "column", width: "71.9%" }}>
                <Text
                  style={{
                    fontSize: 20,
                    paddingTop: 20,
                    paddingRight: 10
                  }}
                  onPress={() =>
                    this.state.nbLinesTitle === 1
                      ? this.setState({ nbLinesTitle: null })
                      : this.setState({ nbLinesTitle: 1 })
                  }
                  numberOfLines={this.state.nbLinesTitle}
                  ellipsizeMode={"tail"}
                >
                  {this.state.tab.title}
                </Text>
                <View style={{ flexDirection: "row", paddingTop: 10 }}>
                  <Ionicons
                    name="ios-star"
                    size={20}
                    color={
                      this.state.tab.ratingValue > 0 ? "#FFB400" : "#C5C5C5"
                    }
                  />
                  <Ionicons
                    name="ios-star"
                    size={20}
                    color={
                      this.state.tab.ratingValue > 1 ? "#FFB400" : "#C5C5C5"
                    }
                  />
                  <Ionicons
                    name="ios-star"
                    size={20}
                    color={
                      this.state.tab.ratingValue > 2 ? "#FFB400" : "#C5C5C5"
                    }
                  />
                  <Ionicons
                    name="ios-star"
                    size={20}
                    color={
                      this.state.tab.ratingValue > 3 ? "#FFB400" : "#C5C5C5"
                    }
                  />
                  <Ionicons
                    name="ios-star"
                    size={20}
                    color={
                      this.state.tab.ratingValue > 4 ? "#FFB400" : "#C5C5C5"
                    }
                  />
                  <Text
                    style={{
                      color: "#7D848D",
                      fontSize: 17,
                      paddingLeft: 5
                    }}
                  >
                    {this.state.tab.reviews} reviews
                  </Text>
                </View>
              </View>
              <Image
                style={{ width: 90, height: 90, borderRadius: 50 }}
                source={{ uri: this.state.tab.user.account.photos[0] }}
              />
            </View>
            <Text
              style={{ marginTop: 10, fontSize: 20 }}
              onPress={() =>
                this.state.nbLines === 3
                  ? this.setState({ nbLines: null })
                  : this.setState({ nbLines: 3 })
              }
              numberOfLines={this.state.nbLines}
              ellipsizeMode={"tail"}
            >
              {this.state.tab.description}
            </Text>
            <MapView
              style={{
                width: "100%",
                height: 200,
                marginTop: 20,
                marginBottom: 20
              }}
              initialRegion={{
                latitude: this.state.tab.loc[1],
                longitude: this.state.tab.loc[0],
                latitudeDelta: 0.009,
                longitudeDelta: 0.004
              }}
            >
              <MapView.Marker
                coordinate={{
                  latitude: this.state.tab.loc[1],
                  longitude: this.state.tab.loc[0]
                }}
                title={this.state.tab.title}
                description={this.state.tab.price + " €"}
              />
            </MapView>
          </View>
        </ScrollView>
      );
    }
  };

  render() {
    return <View style={styles.container}>{this.renderOffer()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wrapper: {},

  slide: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent"
  }
});

export default OtherScreen;
