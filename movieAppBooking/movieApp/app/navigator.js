import React  from "react";

import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import MovieList from "./screens/HomeScreen";
import MovieDetailScreen from './screens/MovieDetailScreen'
import SeatSelectionScreen from './screens/SeatSelectionScreen'
import AfterBooking from "./screens/AfterBooking";
import ContactUs from "./screens/ContactUs";
import Terms  from "./screens/Terms";
import PrivacyPolicy  from "./screens/PrivacyPolicy";
import MapScreen  from "./screens/MapScreen";
import Faq  from "./screens/Faq";


import { createDrawerNavigator } from "@react-navigation/drawer";
import { Button, View, Text,TouchableOpacity } from "react-native";
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
import AsyncStorage from "@react-native-async-storage/async-storage";


function Logout({ navigation }) {
        return (
          <TouchableOpacity
            onPress={async () => {
              await AsyncStorage.removeItem("AuthToken");
              navigation.navigate("LoginScreen");
              Alert.alert("Logged Out");
            }}
            style={{ alignSelf:'center', justifyContent:'center', flex:1 }}
          >
            <Text style={{fontSize:24, fontWeight:'bold'}}> Logout from App </Text>
          </TouchableOpacity>
        );
}
    function MyDrawer() {
      return (
        <Drawer.Navigator useLegacyImplementation>
          <Drawer.Screen name='Home' component={MapScreen} />
          <Drawer.Screen name='Contact Us' component={ContactUs} />
          <Drawer.Screen name='Terms & Conditions' component={Terms} />
          <Drawer.Screen name='Privacy Policy' component={PrivacyPolicy} />
          <Drawer.Screen name='Faqs' component={Faq} />
          <Drawer.Screen name='Logout' component={Logout} />
        </Drawer.Navigator>
      );
    }
export default function Navigator() {
    return (
      <Stack.Navigator initialRouteName='LoginScreen'>
        <Stack.Screen name='LoginScreen' component={LoginScreen} options={{ headerShown: false, animation: "none" }} />

        <Stack.Screen
          name='SignupScreen'
          component={SignupScreen}
          options={{ headerShown: false, animation: "none" }}
        />
        <Stack.Screen name='HomeScreen' component={MyDrawer} options={{ headerShown: false, animation: "none" }} />
        <Stack.Screen name='MovieList' component={MovieList} options={{ headerShown: false, animation: "none" }} />
        <Stack.Screen
          name='MovieDetailScreen'
          component={MovieDetailScreen}
          options={{ headerShown: false, animation: "none" }}
        />
        <Stack.Screen
          name='SeatSelectionScreen'
          component={SeatSelectionScreen}
          options={{ headerShown: false, animation: "none" }}
        />
        <Stack.Screen
          name='AfterBooking'
          component={AfterBooking}
          options={{ headerShown: false, animation: "none" }}
        />
      </Stack.Navigator>
    );
}

