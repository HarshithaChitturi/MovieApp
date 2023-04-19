import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { StripeProvider, initStripe } from '@stripe/stripe-react-native';

// PaymentScreen.ts
import { CardField, useStripe } from '@stripe/stripe-react-native';


function PaymentScreen() {

    return (
        <CardField
            postalCodeEnabled={true}
            placeholders={{
                number: '4242 4242 4242 4242',
            }}
            cardStyle={{
                backgroundColor: '#FFFFFF',
                textColor: '#000000',
            }}
            style={{
                width: '100%',
                height: 50,
                marginVertical: 30,
            }}
            onCardChange={(cardDetails) => {
                console.log('cardDetails', cardDetails);
            }}
            onFocus={(focusedField) => {
                console.log('focusField', focusedField);
            }}
        />
    );
}
export default function Payment() {
    const publishableKey = "pk_test_51Mtf0hHVvWmXyBA4VQ8Y3Gki47uRCsOyi24qu8Z3dUD7QLky8c3mv1NAyzG7hC1Qc8bBviXlJltdgllNtvwVOZrO00eW2FB7CR"
    useEffect(() => {
        async function initialize() {
            await initStripe({
                publishableKey,
                // merchantIdentifier: 'merchant.com.stripe.react.native',
                urlScheme: 'stripe-example',
                setReturnUrlSchemeOnAndroid: true,
            });
            // setLoading(false);

        }
        initialize();
    }, []);
    const makePayment = async () => {
        return Linking.openURL("https://buy.stripe.com/test_bIYbLGgqw9qy4xieUU?prefilled_email=jenny%40example.com&client_reference_id=id_1234&locale=en")
        // const stripe = new Stripe('sk_test_51Mtf0hHVvWmXyBA4wB6QhQJhi7X1Uu3ZMkmClXcVkFiOg37Y7G6EjcL0S6w5OlBsi8sSLtXGiu2cZX3Jy186Fir500eJZUmLw9');

        // const price = await stripe.prices.create({
        //     currency: 'usd',
        //     unit_amount: 1000,
        //     product: '{{PRODUCT_ID}}',
        // });
        // console.log('price==', price)
    }
    const { confirmPayment } = useStripe();
    return (
        <StripeProvider
            publishableKey={publishableKey}
            // merchantIdentifier="merchant.identifier" // required for Apple Pay
            urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
        >
            <PaymentScreen />
            <TouchableOpacity onPress={() => makePayment()

            }>
                <Text>Make Payment</Text>
            </TouchableOpacity>
        </StripeProvider>
    );
}


const styles = StyleSheet.create({})