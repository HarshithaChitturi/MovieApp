import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button, Alert } from "react-native";

import MovieList from "../components/MovieList";
import { collection, onSnapshot } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebaseDB } from "../services/firebase";
import  { DATA } from '../utils/Data'
import {  addDoc,  doc, setDoc, updateDoc } from "firebase/firestore";
const HomeScreen = ({ navigation ,route}) => {
  const [movies, setMovies] = useState([]);
  const city = route?.params?.cityName;
  useEffect(() => {
    const docRef = collection(firebaseDB, "Movies");
    const getData = onSnapshot(docRef, (querySnapshot) => {
      let moviesData = [];
      querySnapshot.forEach((item) => {
        moviesData.push({
          id: item.id,
          ...item.data(),
        });
      });
      setMovies(moviesData)
    });

    return () => getData();
  }, []);


  const handleSelectMovie = (movie) => {
    console.log("Selected movie:", movie);
    navigation.navigate('MovieDetailScreen', {
      movie:movie
    })
    // Navigate to movie details screen
  };



  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.title}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}> Movies showing in {city}</Text>
      </View>

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity style={styles.movieItem} onPress={() => handleSelectMovie(item.id)}>
              <MovieList movies={item} onPress={handleSelectMovie} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: '5%',
    paddingTop:'15%',
    flex: 1,
    // backgroundColor: "#fff",
    width: '100%',
    height: '100%',
    paddingHorizontal: 20
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  movieItem: {
    marginBottom: 20,
  },
});

export default HomeScreen;
