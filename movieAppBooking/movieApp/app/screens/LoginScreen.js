import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground } from "react-native";
import { signInWithEmailAndPassword, firebaseAuth } from "../services/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState(null);

    useEffect(() => {
        getToken()
       
    }, []);

    const getToken = async (response) => {
        try {
          let token = await AsyncStorage.getItem("AuthToken");
     
            if (token !== null && token !== undefined) {
              setToken(token)
               navigation.navigate("HomeScreen");
            } else {
                setToken('')
            }

        } catch (e) {
            // saving error
        }
    };
    const handleLogin = async () => {
        if (email.trim().length === 0) {
            Alert.alert("Input Error", "Email cannot be empty");
        } else if (password.trim().length === 0) {
            Alert.alert("Input Error", "Password cannot be empty");
        } else {
            signInWithEmailAndPassword(firebaseAuth, email, password)
                .then((response) => {
                    setData(response);
                })
                .catch((error) => {
                    console.log("error==", error);
                    Alert.alert("error: " + error.code);
                });
        }
    };

    const setData = async (response) => {
      try {
     
          await AsyncStorage.setItem("AuthToken", JSON.stringify(response._tokenResponse.idToken));
          await AsyncStorage.setItem("userData", JSON.stringify(response.user));
      
            Alert.alert("Login Successful");
            setTimeout(() => {
                navigation.navigate("HomeScreen");
            }, 100);
        } catch (e) {
            // saving error
        }
    };

    return (
      <View style={styles.container}>
        <ImageBackground
          source={{
            uri: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          }}
          style={{ width: "100%", height: "100%" }}
        >
          <View style={{justifyContent:'center', alignSelf:'center', width:'100%', paddingTop:"40%"}}>
            <Text style={styles.heading}>Welcome </Text>
            <TextInput style={styles.input} placeholder='Email' onChangeText={setEmail} value={email} />
            <TextInput
              style={styles.input}
              placeholder='Password'
              secureTextEntry={true}
              onChangeText={setPassword}
              value={password}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("SignupScreen")}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
};

export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // padding: 20,
    // backgroundColor: "#fff",
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#fff",
    alignSelf: "center",
  },
  input: {
    width: "90%",
    height: 50,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 18,
    backgroundColor: "#fff",
    alignSelf: "center",
  },
  button: {
    width: "90%",
    height: 50,
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 20,
    alignSelf: "center",
  },
  buttonText: {
    // color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
