import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from "react-native";

const MovieList = ({ movies, onPress }) => {

  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={() => onPress(movies)}>
      <View style={styles.movieContainer}>
          <Image style={styles.movieImage} source={{ uri: movies.image }} />
        <View style={styles.movieDetails}>
            <Text style={styles.movieTitle}>{movies.title}</Text>
            <Text style={styles.movieDescription}>{movies.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
   
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  movieContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  movieImage: {
    width: 64,
    height: 96,
    borderRadius: 4,
    marginRight: 16,
  },
  movieDetails: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  movieDescription: {
    fontSize: 14,
    color: "#888",
  },
});

export default MovieList;
