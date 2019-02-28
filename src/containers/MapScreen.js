import React, { Component } from "react";
import axios from "axios";
import { View, ProgressBarAndroid } from "react-native";
import { Location, Permissions, MapView } from "expo";

export class MapScreen extends Component {
  state = {
    tab: [],
    location: null,
    isLoading: true
  };

  async componentDidMount() {
    const response = await axios.get(
      "https://airbnb-api.now.sh/api/room?city=paris"
    );
    this.setState({
      tab: response.data
    });
    this.getLocationAsync();
  }

  getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    const location = await Location.getCurrentPositionAsync({});
    this.setState({
      location: location,
      isLoading: false
    });
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
      console.log(this.state.location);
      return (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: this.state.location.coords.latitude,
            longitude: this.state.location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
          {this.state.tab.rooms.map((i, index) => {
            return (
              <MapView.Marker
                coordinate={{
                  latitude: i.loc[1],
                  longitude: i.loc[0]
                }}
                key={index}
                title={i.title}
                description={i.price + " €"}
              />
            );
          })}
        </MapView>
      );
    }
  }
}

export default MapScreen;
