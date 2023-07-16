import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { getDatabase, ref, child, update, push } from 'firebase/database'
import { useNavigation } from '@react-navigation/native'

export default function RegisterScreen() {

    const auth = getAuth()
    const db = getDatabase()
    const navigation = useNavigation()
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');


    const handleSignIn = () => {
        
    }

    const rgister = () =>{
        if(password === confPassword){
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                console.log('Registered with user:', user.email)

                const userData = {
                        uid: user.uid,
                        username: username,
                        fname: fname,
                        lname: lname,
                        image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    
                }

                const newUserKey = auth.currentUser.uid

                const updates = {};

                updates['user/' + newUserKey] = userData;

                return update(ref(db), updates);

            })
            .catch(error => alert(error.message));
        } else {
            alert('Wrong Confirmation Password')
        }
        
    }


    useEffect(() => {
        const unsubscibe = auth.onAuthStateChanged(user => {
            if(user){
                navigation.replace('Home');
            }
        })

        return unsubscibe;
    }, [])

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.inputContainer}>
            <TextInput placeholder='Username' style={styles.input} value={username} onChangeText={text => setUsername(text)} />
            <TextInput placeholder='Email' style={styles.input} value={email} onChangeText={text => setEmail(text)} />
            <TextInput placeholder='First Name' style={styles.input} value={fname} onChangeText={text => setFname(text)} />
            <TextInput placeholder='Last Name' style={styles.input} value={lname} onChangeText={text => setLname(text)} />
            <TextInput placeholder='Password' style={styles.input} secureTextEntry value={password} onChangeText={text => setPassword(text)} />
            <TextInput placeholder='Confirm Password' style={styles.input} secureTextEntry value={confPassword} onChangeText={text => setConfPassword(text)} />
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={rgister}>
                <Text style={styles.buttonText}> Register </Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100
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
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
})