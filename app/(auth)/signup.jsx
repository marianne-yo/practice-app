import { Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback } from 'react-native'
import { Link } from 'expo-router'
import { Colors } from '../../constants/Colors'

//themed components
import ThemedView from '../../component/ThemedView'
import Spacer from '../../component/Spacer'
import ThemedText from '../../component/ThemedText'
import ThemedButton from '../../component/ThemedButton'
import ThemedTextInput from '../../component/ThemedTextInput'
import { useState } from 'react'

const signup = () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = () => {
        console.log("register form is submitted", email, password)
    }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ThemedView style={styles.container}>

            <Spacer />
            <ThemedText title={true} style={styles.title}>
                Signup for an Account
            </ThemedText>

            <ThemedTextInput 
                style={{ width: '80%', marginBottom: 20}}
                placeholder="Username"
                keyboardType="default"
                onChangeText={setUsername}
                value={username}
            />

            <ThemedTextInput 
                style={{ width: '80%', marginBottom: 20}}
                placeholder="Email"
                keyboardType="email-address"
                onChangeText={setEmail}
                value={email}
            />


            <ThemedTextInput 
                style={{ width: '80%', marginBottom: 20}}
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
                secureTextEntry
            />
            
            <ThemedButton onPress={handleSubmit}>
                <Text style={{
                color: '#200448', 
                textAlign: 'center',
                fontSize: 14,
                fontWeight: 'semibold'
            }}>
                Signup
            </Text>
            </ThemedButton>

            <Spacer height={100} />
            <Link href='/login'>
                <ThemedText style={{ textAlign: 'center' }}>
                    Login instead
                </ThemedText>
            </Link>
        </ThemedView>
    </TouchableWithoutFeedback>
    )
}

export default signup

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title:{
        textAlign:'center',
        fontSize: 18,
        marginBottom: 30
    },
})