import { StatusBar } from 'expo-status-bar';
import * as React from "react";
import "react-native-gesture-handler";
import { StyleSheet, Text, View } from 'react-native';
import Stack from './app/navigator';
import { NavigationContainer } from '@react-navigation/native';

import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack/>
    </NavigationContainer>
  );
}
