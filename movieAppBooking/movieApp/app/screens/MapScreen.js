import React,{useState,useEffect} from "react";
import { View, StyleSheet ,Button} from "react-native";
import MapView, { Marker } from "react-native-maps";

const markers = [
  { title: "Detroit", coordinate: { latitude: 42.3314, longitude: -83.0458 } },
  { title: "Grand Rapids", coordinate: { latitude: 42.9634, longitude: -85.6681 } },
  { title: "Lansing", coordinate: { latitude: 42.7325, longitude: -84.5555 } },
  { title: "Ann Arbor", coordinate: { latitude: 42.2808, longitude: -83.743 } },
  { title: "Kalamazoo", coordinate: { latitude: 42.2917, longitude: -85.5872 } },
  { title: "Traverse City", coordinate: { latitude: 44.7631, longitude: -85.6206 } },
  { title: "Flint", coordinate: { latitude: 43.0125, longitude: -83.6875 } },
  { title: "Saginaw", coordinate: { latitude: 43.4195, longitude: -83.9508 } },
  { title: "Muskegon", coordinate: { latitude: 43.2342, longitude: -86.2484 } },
  { title: "Marquette", coordinate: { latitude: 46.5435, longitude: -87.395 } },
];


export default function MapScreen({ navigation }) {
  const [region, setRegion] = useState({
    latitude: 42.3314,
    longitude: -83.045,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const handleZoomIn = () => {
    const newRegion = {
      ...region,
      latitudeDelta: region.latitudeDelta * 0.5,
      longitudeDelta: region.longitudeDelta * 0.5,
    };
    setRegion(newRegion);
  };

  const handleZoomOut = () => {
    const newRegion = {
      ...region,
      latitudeDelta: region.latitudeDelta * 2,
      longitudeDelta: region.longitudeDelta * 2,
    };
    setRegion(newRegion);
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region}>
        {markers.map((marker, index) => (
          <Marker
            key={index}
            title={marker.title}
            coordinate={marker.coordinate}
            onPress={() =>
              navigation.navigate("MovieList", {
                cityName: marker.title,
              })
            }
          />
        ))}
      </MapView>
      <View style={styles.buttonContainer}>
        <Button title='Zoom In' onPress={handleZoomIn} />
        <Button title='Zoom Out' onPress={handleZoomOut} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 16,
    left: 16,
    flexDirection: "row",
  },
});
