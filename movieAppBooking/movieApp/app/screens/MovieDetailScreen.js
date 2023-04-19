import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
// import firebase from "firebase";

const MovieDetailScreen = ({ route, navigation }) => {
  const { movie } = route.params;



  handleSeatBooking = () => {
    navigation.navigate('SeatSelectionScreen', {
      movie:movie
    })
  }
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ left: 15, margin: 20 }}>
        <Text style={{ fontWeight: "bold", fontSize: 24 }}>Back</Text>
      </TouchableOpacity>
      <Image style={styles.poster} source={{ uri: movie.image }} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.description}>{movie.description}</Text>
        <View style={styles.row}>
          <Text style={styles.title}>Imdb Ratings</Text>
          <Text style={styles.title}> : {movie.imdbRating}/10</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Release Year</Text>
          <Text style={styles.title}> : {movie.releaseYear}/10</Text>
        </View>
        <View>
          <Text style={styles.title}>Cast </Text>
          {movie?.cast.map((item, index) => {
            return (
              <View style={styles.row} key={index}>
                <Image style={styles.actor} source={{ uri: item.image }} />
                <View>
                  <View style={styles.row}>
                    <Text style={{ fontWeight: "bold" }}>Name: </Text>
                    <Text>{item.name}</Text>
                  </View>
                  {/* <View style={styles.row}>
                    <Text style={{ fontWeight: "bold" }}>Role: </Text>
                    <Text>{item.role}</Text>
                  </View> */}
                </View>
              </View>
            );
          })}
        </View>
        <TouchableOpacity style={styles.bookButton} onPress={() => handleSeatBooking()}>
          <Text style={styles.bookButtonText}>Book Seat</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
export default MovieDetailScreen
const styles = StyleSheet.create({
  actor: {
    width: 100,
    height: 100,
    resizeMode:'contain'
  },
  row: { flexDirection: 'row' },
  container: {
    paddingTop: 30,
    flex: 1,
    backgroundColor: "#fff",
  },
  poster: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
  },
  detailsContainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
 

  bookButton: {
    backgroundColor: "#F9A825",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    marginBottom:150
  },
  bookButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
});
