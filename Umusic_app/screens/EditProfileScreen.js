import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { getDatabase, ref, onValue, update } from 'firebase/database'
import { getAuth, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth'

const EditProfileScreen = () => {

    const auth = getAuth();
    const db = getDatabase()
    const navigation = useNavigation();

    const [username, setUsername] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [password, setPassword] = useState('');
    const [profileImage, setProfileImage] = useState('');

    const [userData, setUserData] = useState({})


    const getUserData = () =>{
        const user = ref(db, `user/${auth.currentUser.uid}/`)
        onValue(user, (snapshot) => {
            const data = snapshot.val();
            setUserData(data);

        })
    }


    const updateProfile = () => {
    
        const updates = {}
        updates[`user/${auth.currentUser.uid}/username`] = username
        updates[`user/${auth.currentUser.uid}/fname`] = fname
        updates[`user/${auth.currentUser.uid}/lname`] = lname
        if(profileImage != ''){
            updates[`user/${auth.currentUser.uid}/image`] = profileImage
        }
        const email = auth.currentUser.email
        const credentials = EmailAuthProvider.credential(
            email,
            password
        );
        reauthenticateWithCredential(auth.currentUser, credentials)
        .then((result) => {
            update(ref(db), updates);
            navigation.navigate('MyProfile');
        })
        .catch((error) => alert(error.message))
    }


    useEffect(() => {
        getUserData();
    }, [])


  return (
    <SafeAreaView style={styles.container}>
        <Text>Hello, {userData.fname} {userData.lname}</Text>
        <Text>Edit Your profile here:</Text>
        <View style={styles.inputContainer}>
            <TextInput placeholder='Username' style={styles.input} value={username} onChangeText={text => setUsername(text)} />
            <TextInput placeholder='Image URL' style={styles.input} value={profileImage} onChangeText={text => setProfileImage(text)} />
            <TextInput placeholder='First Name' style={styles.input} value={fname} onChangeText={text => setFname(text)} />
            <TextInput placeholder='Last Name' style={styles.input} value={lname} onChangeText={text => setLname(text)} />
            <TextInput placeholder='Confirm by Password' style={styles.input} secureTextEntry value={password} onChangeText={text => setPassword(text)} />
        </View>
        <TouchableOpacity style={styles.button} onPress={updateProfile}> 
            <Text>Edit Profile</Text>
        </TouchableOpacity>

    </SafeAreaView> 
  )
}

export default EditProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
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
    button: {
        backgroundColor: '#0782F9',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20
    }
})