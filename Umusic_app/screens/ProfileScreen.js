import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAuth, signOut } from 'firebase/auth'
import { getDatabase, onValue, ref } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {

    const auth = getAuth();
    const db = getDatabase();
    const navigation = useNavigation();
    const [userData, setUserData] = useState({});

    const getUserData = () =>{
        const user = ref(db, `user/${auth.currentUser.uid}/`)
        onValue(user, (snapshot) => {
            const data = snapshot.val();
            setUserData(data);

        })
    }

    const handleSignOut = () => {
        signOut(auth)
        .then(() => {
            navigation.replace('Login');
        })
        .catch(error => alert(error.message))
    }

    useEffect(() => {
        getUserData();
    }, [])


  return (
    <SafeAreaView style={styles.container}>
        <Image source={{uri: userData.image}} style={styles.profileImage} />
        <Text>Hello, {userData.username}</Text>
        <Text>First Name: {userData.fname}</Text>
        <Text>Last Name: {userData.lname}</Text>
        <TouchableOpacity
            style={styles.button}
            onPress={() => {navigation.navigate('MyProducts')}} 
        >
            <Text style={styles.buttonText}>My Products</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.button}
        onPress={handleSignOut}
      >
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('EditProfile')} 
      >
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
    </SafeAreaView> 
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 10
    },
    button: {
        backgroundColor: '#0782F9',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },

})