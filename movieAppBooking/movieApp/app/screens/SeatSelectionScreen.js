import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Alert, Linking } from 'react-native';
import { collection, addDoc, onSnapshot, doc,setDoc, updateDoc } from "firebase/firestore";
import { firebaseDB } from '../services/firebase';
import AsyncStorage from "@react-native-async-storage/async-storage";
const SeatSelection = ({ navigation, route }) => {
    const { movie } = route.params;
    const [selectedSeats, setSelectedSeats] = useState([]);

    useEffect(() => {
        const docRef = collection(firebaseDB, "bookingData");
        const getBookingData = onSnapshot(docRef, (querySnapshot) => {
            let bookingData = [];
            querySnapshot.forEach((item) => {
                bookingData.push({
                    id: item.id,
                    ...item.data(),
                });
            });
            console.log(bookingData[0].title, movie.title);
            if (bookingData.length !== 0) {
                if (bookingData[0].title == movie.title) {   
                    setSelectedSeats(bookingData[0].bookedSeats);
                }
            }
        });

        return () => getBookingData();
    }, []);
    

    const handleSeatPress = (seatNumber) => {
        // Check if seat is already selected
        if (selectedSeats.find((item) => item.seatNumber == seatNumber)) {
          setSelectedSeats(
            selectedSeats.filter((seat) => seat.seatNumber !== seatNumber
            ),
          );
        } else {
          setSelectedSeats([...selectedSeats, { seatNumber, isSelected: true }]);
        }
    };
    const renderSeat = (seatNumber) => {
        const isSelected = selectedSeats?.find((item) => item.seatNumber == seatNumber);
        const isBooked = selectedSeats?.find((item) => item.seatNumber == seatNumber && item.isBooked);
        return (
          <TouchableOpacity
            key={seatNumber}
            style={[styles.seat, isSelected ? styles.selectedSeat :{}, isBooked ? styles.bookedSeat:{}]}
            onPress={() => handleSeatPress(seatNumber)}
            disabled={isBooked}
          >
            <Text style={styles.seatNumber}>{seatNumber}</Text>
          </TouchableOpacity>
        );
    };
     

    const handlBooking = async () => {
         
         if (selectedSeats.length ==0) {
             Alert.alert('Please select atleast one seat')
             return
         } else {
           let userData = await AsyncStorage.getItem("userData");
             const email = JSON.parse(userData).email;
         
      
             let bookedSeats = selectedSeats.map((item) => {
               return { ...item, isBooked: true };
             });

                  const setData = await setDoc(doc(firebaseDB, "bookingData", movie.title), {
                    title: movie.title,
                    id: movie.id,
                    bookedSeats: bookedSeats,
                    date: new Date().toDateString(),
                  });
             navigation.navigate("AfterBooking", {
                      stripeLink:`https://buy.stripe.com/test_aEUdTOdekeKS2pafZ0?prefilled_email=${email}&&client_reference_id=${email}`
                  });
 
           //  Linking.openURL("https://buy.stripe.com/test_aEUdTOdekeKS2pafZ0?prefilled_email={email}");
           //  const data = await setDoc(collection(firebaseDB, "bookingData"), {
           //      title: movie.title,
           //      id: movie.id,
           //      selectedSeats: selectedSeats,
           //      date: new Date().toDateString()

           //  });
           //  Alert.alert("Seat Booked  Succesfully")
           //  navigation.navigate('HomeScreen')
           //  console.log("Document written with ID: ", docRef.id);
         }
     };
     
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ left: 15, margin: 20 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 24 }}>Back</Text>
      </TouchableOpacity>
            <View style={styles.screen}>
                <Text style={styles.screenText}>Screen</Text>
            </View>
            <View style={styles.seatContainer}>
                <View style={styles.row}>
                    {renderSeat(1)}
                    {renderSeat(2)}
                    <View style={styles.spacer} />
                    {renderSeat(3)}
                    {renderSeat(4)}
                </View>
                <View style={styles.row}>
                    {renderSeat(5)}
                    {renderSeat(6)}
                    <View style={styles.spacer} />
                    {renderSeat(7)}
                    {renderSeat(8)}
                </View>
                <View style={styles.row}>
                    {renderSeat(9)}
                    {renderSeat(10)}
                    <View style={styles.spacer} />
                    {renderSeat(11)}
                    {renderSeat(12)}
                </View>
                <View style={styles.row}>
                    {renderSeat(13)}
                    {renderSeat(14)}
                    <View style={styles.spacer} />
                    {renderSeat(15)}
                    {renderSeat(16)}
                </View>
                <View style={styles.row}>
                    {renderSeat(17)}
                    {renderSeat(18)}
                    <View style={styles.spacer} />
                    {renderSeat(19)}
                    {renderSeat(20)}
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => handlBooking()}>
                <Text style={styles.buttonText}>Book Seats</Text>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        paddingTop:30,
        flex: 1,
        backgroundColor: '#fff',
    },
    screen: {
        height: 50,
        alignSelf:'center'
    },
    screenText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    seatContainer: {
        flexDirection: 'column',
        alignSelf: 'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    seat: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    selectedSeat: {
        backgroundColor: '#F9A825',
    },
    bookedSeat: {
        backgroundColor: 'red',
    },
    seatNumber: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    spacer: {
        width: 80,
    },
    button: {

        alignSelf: 'center',
        width: 180,
        height: 50,
        backgroundColor: '#F9A825',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        position: "absolute",
        bottom:"10%"
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
});


export default SeatSelection;