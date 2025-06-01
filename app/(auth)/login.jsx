import { StyleSheet, Pressable, Text } from 'react-native'
import { Link } from 'expo-router'
import { Colors } from '../../constants/Colors'

//themed components
import ThemedView from '../../component/ThemedView'
import Spacer from '../../component/Spacer'
import ThemedText from '../../component/ThemedText'
import ThemedButton from '../../component/ThemedButton'

const Login = () => {
    const handleSubmit = () => {
        console.log("login form is submitted")
    }

  return (
    <ThemedView style={styles.container}>

        <Spacer />
        <ThemedText title={true} style={styles.title}>
            Login to Your Account
        </ThemedText>

        <ThemedButton onPress={handleSubmit}>
            <Text style={{color: '#f2f2f2'}}>Login</Text>
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