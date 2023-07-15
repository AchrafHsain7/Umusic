import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { auth } from '../firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = getAuth();
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscibe = auth.onAuthStateChanged(user => {
            if(user){
                navigation.replace('Home');
            }
        })

        return unsubscibe;
    }, [])

    const handleSignUp = () => {
       createUserWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Registered with user:',user.email);
        })
        .catch(error => alert(error.message))
    }

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            const user = userCredentials.user;
            console.log('Logged In with user:', user.email)
        })
        .catch(error => alert(error.message));
    }

  return (
    <KeyboardAvoidingView
        style={styles.container}
        
    > 
        <View style={styles.inputContainer}>
            <TextInput 
                placeholder='Email' 
                value={email}
                onChangeText={text => setEmail(text)}
                style={styles.input} 
            />
            <TextInput 
                placeholder='Password' 
                value={password}
                onChangeText={text => setPassword(text)}
                style={styles.input} 
                secureTextEntry
            />
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity 
            onPress={handleSignIn}
            style={styles.button}
            >
                <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.button, styles.buttonOutline]}
                onPress={() => {navigation.navigate('Register')}}
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