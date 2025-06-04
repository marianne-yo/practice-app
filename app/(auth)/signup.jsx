import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebaseConfig';

import ThemedView from '../../component/ThemedView';
import Spacer from '../../component/Spacer';
import ThemedText from '../../component/ThemedText';
import ThemedButton from '../../component/ThemedButton';
import ThemedTextInput from '../../component/ThemedTextInput';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("User signed up:", userCredential.user.email);
            Alert.alert("Success", "Account created!");
            router.replace('/Login'); // Go to login after successful signup
        } catch (error) {
            console.error("Signup error:", error.message);
            Alert.alert("Signup Failed", error.message);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ThemedView style={styles.container}>
                <Spacer />
                <ThemedText title={true} style={styles.title}>
                    Signup for an Account
                </ThemedText>

                <ThemedTextInput 
                    style={{ width: '80%', marginBottom: 20 }}
                    placeholder="Email"
                    keyboardType="email-address"
                    onChangeText={setEmail}
                    value={email}
                />

                <ThemedTextInput 
                    style={{ width: '80%', marginBottom: 20 }}
                    placeholder="Password"
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry
                />

                <ThemedButton onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Signup</Text>
                </ThemedButton>

                <Spacer height={100} />
                <Link href='/Login'>
                    <ThemedText style={{ textAlign: 'center' }}>
                        Login instead
                    </ThemedText>
                </Link>
            </ThemedView>
        </TouchableWithoutFeedback>
    );
};

export default Signup;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 30
    },
    buttonText: {
        color: '#200448',
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '600'
    }
});
