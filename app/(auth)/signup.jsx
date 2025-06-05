import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
//icon imports
import { Ionicons } from '@expo/vector-icons';
//firebase imports
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../lib/firebaseConfig';
import { collection, query, where, getDocs, doc, setDoc } from 'firebase/firestore';
import { sendEmailVerification } from 'firebase/auth';
//themed imports
import ThemedView from '../../component/ThemedView';
import Spacer from '../../component/Spacer';
import ThemedText from '../../component/ThemedText';
import ThemedButton from '../../component/ThemedButton';
import ThemedTextInput from '../../component/ThemedTextInput';


const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const router = useRouter();

    // Basic regex for email
    const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // Username must be at least 3 chars, only letters/numbers/underscores
    const isValidUsername = (username) =>
    /^[a-zA-Z0-9_]{3,}$/.test(username);

    // Password must be at least 6 characters
    const isValidPassword = (password) =>
    password.length >= 6;

    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async () => {
        if (!username || !email || !password) {
            Alert.alert("Missing Info", "All fields are required.");
            return;
        }

        if (!isValidEmail(email)) {
            Alert.alert("Invalid Email", "Please enter a valid email address.");
            return;
        }

        if (!isValidUsername(username)) {
            Alert.alert(
            "Invalid Username",
            "Username must be at least 3 characters and only include letters, numbers, or underscores."
            );
            return;
        }

        if (!isValidPassword(password)) {
            Alert.alert("Weak Password", "Password must be at least 6 characters.");
            return;
        }

        try {
            // 🔎 Check if username already exists
            const qUsername = query(collection(db, 'users'), where('username', '==', username.toLowerCase()));
            const qEmail = query(collection(db, 'users'), where('email', '==', email.toLowerCase()));

            const [usernameSnap, emailSnap] = await Promise.all([
            getDocs(qUsername),
            getDocs(qEmail)
            ]);

            if (!usernameSnap.empty) {
            Alert.alert("Username Taken", "Please choose another username.");
            return;
            }

            if (!emailSnap.empty) {
            Alert.alert("Email Already In Use", "Try logging in instead.");
            return;
            }

            // ✅ Create user and save extra info
            const userCredential = await createUserWithEmailAndPassword(auth, email.toLowerCase(), password);
            const uid = userCredential.user.uid;

            await setDoc(doc(db, 'users', uid), {
            username: username.toLowerCase(),
            email: email.toLowerCase()
            });

            await sendEmailVerification(userCredential.user);
            Alert.alert(
            "Verify Your Email",
            "A verification link has been sent to your email. Please verify before logging in."
            );
            router.replace('/Login');
        } catch (err) {
            console.error("Signup Error:", err.message);
            Alert.alert("Signup Failed", err.message);
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
                    placeholder="Username"
                    onChangeText={setUsername}
                    value={username}
                />

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
