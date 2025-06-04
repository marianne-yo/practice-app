import { StyleSheet, Text, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebaseConfig';

import ThemedView from '../../component/ThemedView';
import Spacer from '../../component/Spacer';
import ThemedText from '../../component/ThemedText';
import ThemedButton from '../../component/ThemedButton';
import ThemedTextInput from '../../component/ThemedTextInput';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("User logged in:", userCredential.user.email);
            Alert.alert("Welcome Back", `Logged in as ${userCredential.user.email}`);
            router.replace('/books'); // Or wherever your home screen is
        } catch (error) {
            console.error("Login error:", error.message);
            Alert.alert("Login Failed", error.message);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ThemedView style={styles.container}>
                <Spacer />
                <ThemedText title={true} style={styles.title}>
                    Login to Your Account
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
                    <Text style={styles.buttonText}>Login</Text>
                </ThemedButton>

                <Spacer height={100} />
                <Link href='/Signup'>
                    <ThemedText style={{ textAlign: 'center' }}>
                        Signup instead
                    </ThemedText>
                </Link>
            </ThemedView>
        </TouchableWithoutFeedback>
    );
};

export default Login;

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
