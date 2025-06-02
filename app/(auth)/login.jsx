import { StyleSheet, Pressable, Text, TextInput } from 'react-native'
import { Link } from 'expo-router'
import { Colors } from '../../constants/Colors'

//themed components
import ThemedView from '../../component/ThemedView'
import Spacer from '../../component/Spacer'
import ThemedText from '../../component/ThemedText'
import ThemedButton from '../../component/ThemedButton'
import ThemedTextInput from '../../component/ThemedTextInput'
import { useState } from 'react'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = () => {
        console.log("login form is submitted", email, password)
    }

  return (
    <ThemedView style={styles.container}>

        <Spacer />
        <ThemedText title={true} style={styles.title}>
            Login to Your Account
        </ThemedText>

        <ThemedTextInput 
            style={{ width: '80%', marginBottom: 20}}
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={setEmail}
            value={email}
            placeholderColor='#fff'
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
                Login
            </Text>
        </ThemedButton>

        <Spacer height={100} />
        <Link href='/signup'>
            <ThemedText style={{ textAlign: 'center' }}>
                Signup instead
            </ThemedText>
        </Link>

    </ThemedView>
  )
}

export default Login

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