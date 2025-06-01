import { StyleSheet} from 'react-native'
import { Link } from 'expo-router'
import React from 'react'
import ThemedView from '../component/ThemedView'
import Spacer from '../component/Spacer'
import ThemedText from '../component/ThemedText'

const about = () => {
    return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>About Page</ThemedText>
      
      <Link href="/" style={styles.link}>
        <ThemedText>Back Home</ThemedText>
      </Link>
    </ThemedView>
  )
}

export default about

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold',
    },
    quote:{
        fontSize: 16,
        fontWeight: 'medium',
        fontStyle: 'italic'
    },
    images:{
        marginVertical: 10,
    },
    link:{
        fontWeight: 'bold',
        marginVertical: 10,
        color: 'blue'
    }
})