import React, { useState,  } from "react";
import { View, Text, Alert, TextInput, TouchableOpacity,  StyleSheet } from "react-native";
import { createUserWithEmailAndPassword, firebaseAuth } from "../services/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from '../components/Loader'
const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const signUp = (email, password) => {
        if (email.trim().length === 0) {
            Alert.alert("Input Error", "Email cannot be empty");
        } else if (password.trim().length === 0) {
            Alert.alert("Input Error", "Password cannot be empty");
        } else {
            createUserWithEmailAndPassword(firebaseAuth, email, password)
                .then((response) => {
                    setData(response);
                })
                .catch((error) => {
                    Alert.alert("error: " + error.code);
                    console.log(error);
                });
        }
    };
    const setData = async (response) => {
        try {
            Alert.alert("Success: " + response.user.email + " has been created");
            await AsyncStorage.setItem("AuthToken", JSON.stringify(response._tokenResponse.idToken), (err, result) => {
                console.log("I am logged In");
            });
            await AsyncStorage.setItem("UserDetails", JSON.stringify(response.user), (err, result) => {
                console.log("I am logged In");
            });
            setTimeout(() => {
                navigation.navigate("HomeScreen");
            }, 200);
        } catch (e) {
            // saving error
        }
    };
    const handleSignUp = () => {
        signUp(email, password);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>

            <TextInput style={styles.input} placeholder='Email' value={email} onChangeText={(text) => setEmail(text)} />

            <TextInput
                style={styles.input}
                placeholder='Password'
                secureTextEntry
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity onPress={handleSignUp} style={styles.signupButton}>
                <Text style={styles.signupButtonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")} style={styles.loginButton}>
                <Text style={styles.signupButtonText}>Login</Text>
            </TouchableOpacity>
            {isLoading ? <View style={{ position: 'absolute' }}>
                <Loader />
            </View> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    signupButton: {
        width: "75%",
        height: 50,
        backgroundColor: "orange",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        marginTop: 20,
    },
    loginButton: {
        width: "75%",
        height: 50,
        backgroundColor: "orange",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        marginTop: 20,
    },
    signupButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    title: {
        marginBottom: 24,
        color: 'orange',
         fontSize: 30,
        fontWeight: "bold",
    },
    input: {
        width: "80%",
        padding: 16,
        marginBottom: 16,
        backgroundColor: "#eee",
        borderRadius: 12,
    },
    button: {
        backgroundColor: "blue",
        padding: 16,
        borderRadius: 8,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default SignupScreen;

