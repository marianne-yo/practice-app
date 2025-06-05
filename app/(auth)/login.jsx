import { StyleSheet, Text, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
//icon imports
import { Ionicons } from '@expo/vector-icons';
//firebase imports
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../../lib/firebaseConfig';
import { sendEmailVerification } from 'firebase/auth';
//themed imports
import ThemedView from '../../component/ThemedView';
import Spacer from '../../component/Spacer';
import ThemedText from '../../component/ThemedText';
import ThemedButton from '../../component/ThemedButton';
import ThemedTextInput from '../../component/ThemedTextInput';

const Login = () => {
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [unverifiedUser, setUnverifiedUser] = useState(null);


    const handleSubmit = async () => {
        if (!emailOrUsername || !password) {
            Alert.alert('Missing fields', 'Please enter all fields');
            return;
        }

        let loginEmail = emailOrUsername;

        // If it's not an email, looks up the username
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrUsername);
        if (!isEmail) {
            try {
                const q = query(collection(db, 'users'), where('username', '==', emailOrUsername.toLowerCase()));
                const querySnapshot = await getDocs(q);
                if (querySnapshot.empty) {
                    Alert.alert('Login Failed', 'Username not found');
                    return;
                }
                loginEmail = querySnapshot.docs[0].data().email;
            } catch (err) {
                console.error('Username lookup error:', err);
                Alert.alert('Login Failed', 'Could not find matching user');
                return;
            }
        }

        // Try logging in with the email
        try {
        const userCredential = await signInWithEmailAndPassword(auth, loginEmail, password);

        if (!userCredential.user.emailVerified) {
            setUnverifiedUser(userCredential.user); // save user for resend
            Alert.alert("Email Not Verified", "Please verify your email before logging in.");
            return;
        }
        // Alert.alert('Success', `Welcome ${userCredential.user.email}`);
        router.replace('/profile');
        } catch (err) {
        console.error('Login error:', err.message);
        Alert.alert('Login Failed', err.message);
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
                    placeholder="Email or Username"
                    onChangeText={setEmailOrUsername}
                    value={emailOrUsername}
                />

                <ThemedTextInput 
                style={{ width: '80%', marginBottom: 20 }}
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
                secureTextEntry={!showPassword}
                rightIcon={
                    <Ionicons 
                    name={showPassword ? 'eye-off' : 'eye'} 
                    size={20} 
                    color="gray" 
                    onPress={() => setShowPassword(prev => !prev)} 
                    />
                }
                />

                <ThemedButton onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Login</Text>
                </ThemedButton>

                {unverifiedUser && (
                <ThemedButton
                    onPress={async () => {
                    try {
                        await sendEmailVerification(unverifiedUser);
                        Alert.alert("Verification Email Sent", "Please check your inbox.");
                    } catch (err) {
                        Alert.alert("Error", "Could not send verification email.");
                        console.error("Resend verification error:", err.message);
                    }
                    }}
                    style={{ marginTop: 20 }}
                >
                    <Text style={styles.buttonText}>Resend Verification Email</Text>
                </ThemedButton>
                )}

                <Spacer height={40} />
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
