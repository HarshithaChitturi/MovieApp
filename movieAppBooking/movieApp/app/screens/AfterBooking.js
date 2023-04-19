import React from "react";
import { View, Text, StyleSheet, Linking } from "react-native";

const PaymentPage = ({ route, navigation }) => {
    const handleStripeLink = () => {
    const stripeLink = route.params.stripeLink;
    Linking.openURL(stripeLink);
    navigation.navigate("HomeScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Please complete your payment using Stripe.</Text>
      <Text style={styles.linkText} onPress={handleStripeLink}>
        Stripe Payment Link
      </Text>
      <Text style={styles.text}>Thanks</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 16,
  },
  linkText: {
    fontSize: 18,
    textAlign: "center",
    color: "blue",
    textDecorationLine: "underline",
    marginBottom: 16,
  },
});

export default PaymentPage;
