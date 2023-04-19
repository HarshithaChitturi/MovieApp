import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const faqs = [
  {
    question: "What is the return policy?",
    answer: "Our return policy allows for returns within 30 days of purchase with a valid receipt.",
  },
  {
    question: "How do I track my order?",
    answer: "You can track your order by logging in to your account and navigating to the order history section.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, as well as PayPal and Apple Pay.",
  },
  {
    question: "Can I cancel my order?",
    answer: "Orders can be cancelled within 24 hours of purchase. Please contact customer service for assistance.",
  },
  {
    question: "Is my personal information secure?",
    answer: "Yes, we take the security of your personal information seriously and use encryption to protect it.",
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we offer international shipping to select countries. Please check our shipping policy for details.",
  },
  {
    question: "How can I contact customer service?",
    answer: "You can contact customer service by phone, email, or through our website's contact form.",
  },
  {
    question: "How do I reset my password?",
    answer: 'You can reset your password by clicking the "Forgot Password" link on the login page.',
  },
  {
    question: "Can I change my shipping address after placing an order?",
    answer:
      "No, unfortunately, you cannot change your shipping address after placing an order. Please ensure your shipping address is accurate before confirming your order.",
  },
  {
    question: "Do you offer gift cards?",
    answer:
      "Yes, we offer gift cards in various denominations that can be used for purchases on our website or in-store.",
  },
];

const FaqScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {faqs.map((faq, index) => (
          <View key={index} style={styles.faqContainer}>
            <Text style={styles.question}>{faq.question}</Text>
            <Text style={styles.answer}>{faq.answer}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  faqContainer: {
    marginBottom: 16,
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  answer: {
    fontSize: 16,
    color: "gray",
  },
});

export default FaqScreen;
