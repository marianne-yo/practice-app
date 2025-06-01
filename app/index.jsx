import { StyleSheet, Text} from 'react-native'
import { Link } from 'expo-router'
import Logo from '../assets/img/revioicon-white.png'
import React from 'react'
//themed components
import ThemedView from '../component/ThemedView'
import ThemedLogo from '../component/ThemedLogo'
import Spacer from '../component/Spacer'
import ThemedText from '../component/ThemedText'
const Home = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedLogo />
      <Spacer height={20}/>

      <ThemedText style={styles.title}>Revio</ThemedText>

      <Spacer height={10}/>
      <ThemedText style={styles.quote}>"Study, Learn, Revio"</ThemedText>
      <Spacer height={10}/>

      <Link href="/login" styles={styles.link}>
        <ThemedText style={styles.link}>Login Page</ThemedText>
      </Link>
      <Link href="/signup" style={styles.link}>
        <ThemedText style={styles.link}>Signup Page</ThemedText>
      </Link>

      <Link href="/profile" style={styles.link}>
        <ThemedText style={styles.link}>Profile Page</ThemedText>
      </Link>
    </ThemedView>
  )
}

export default Home

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title:{
        fontSize: 32,
        fontWeight: 'bold',
    },
    quote:{
        fontSize: 16,
        fontWeight: 'bold',
        fontStyle: 'italic'
    },
    link:{
        fontWeight: 'bold',
        marginVertical: 10,
        color: 'white'
    }
})