import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button, Alert } from "react-native";
import { collection, addDoc, onSnapshot, doc, setDoc, updateDoc } from "firebase/firestore";
import { firebaseDB } from "../services/firebase";
const ContactUsScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleFormSubmit = async() => {
  
    if (name.trim() === "" || email.trim() === "" || message.trim() === "") {
      Alert.alert("Error", "Please fill in all fields");
    } else {

          await setDoc(doc(firebaseDB, "ContactUs", name), {
              name: name,
              email: email,
              message: message,
              date: new Date().toDateString(),
            });
      
      
      Alert.alert("Success", "Thank you for your message!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Us</Text>
      <TextInput style={styles.input} placeholder='Name' value={name} onChangeText={setName} />
      <TextInput
        style={styles.input}
        placeholder='Email'
        value={email}
        onChangeText={setEmail}
        keyboardType='email-address'
        autoCapitalize='none'
      />
      <TextInput style={styles.input} placeholder='Message' value={message} onChangeText={setMessage} multiline />
      <Button title='Submit' onPress={handleFormSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    // justifyContent: "center",
    paddingTop:'25%',
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    alignSelf:'center'
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
});

export default ContactUsScreen;
