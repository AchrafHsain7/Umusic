import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'

const LoginScreen = () => {
  return (
    <KeyboardAvoidingView
        style={styles.container}
        
    > 
        <View style={styles.inputContainer}>
            <TextInput 
                placeholder='Email' 
                //value={}
                //onChangeText={text => { }}
                style={styles.input} 
            />
            <TextInput 
                placeholder='Password' 
                //value={}
                //onChangeText={text => { }}
                style={styles.input} 
                secureTextEntry
            />
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity 
            onPress={() => { }}
            style={styles.button}
            >
                <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.button, styles.buttonOutline]}
                onPress={() => { }}
            >
                <Text style={styles.buttonOutlineText}>Register</Text>
            </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({

    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginTop: 10,
        borderRadius: 10,
    },
    buttonContainer: {
        width: '60%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonOutline: {
        marginTop: 5,
        backgroundColor: 'white',
        borderColor: '#0782F9',
        borderWidth: 1,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
    },
})