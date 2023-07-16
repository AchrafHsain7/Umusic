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
        <Image
            source={require('../assets/auto-group-864w.png')}
            style={{ position: 'absolute', top: 0, left: -120, width: 470, height: 420 }}
        />
        <Image source={{uri: userData.image}} style={styles.profileImage} />
        <View style = {{flexDirection: "row", alignItems:"center", gap:3}}> 
            <Text style={styles.textHello}>Hello, </Text>
            <Text style={styles.textn}>{userData.username}</Text>
        </View>
        <View style = {{flexDirection: "row", alignItems:"center", gap:3}}>
            <Text style={styles.text}>First Name:</Text>
            <Text style={styles.textn}>{userData.fname}</Text>
        </View>
        <View style = {{flexDirection: "row", alignItems:"center", gap:3}} >
            <Text style={styles.text}>Last Name:</Text>
            <Text style = {styles.textn}>{userData.lname}</Text>
        </View>
        <TouchableOpacity
            style={styles.button}
            onPress={() => {navigation.navigate('MyProducts')}} 
        >
            <Text style={styles.buttonText}>My Products</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('EditProfile')} 
      >
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
        <TouchableOpacity
        style={styles.buttonout}
        onPress={handleSignOut}
      >
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
      
      <Image
    source={require('../assets/auto-group-864w.png')}
    style={{ left: 120, width: 570, height: 450 }}
  />
    </SafeAreaView> 
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 300,
        borderWidth: 2, 
        borderColor: 'black', 
    },
    text: {
        color: 'black',
        textAlign: 'center',
        fontSize: 19,
        fontWeight: 'bold',
        marginBottom: 3,
      },
    textn: {
        color: 'black',
        textAlign: 'center',
        fontSize: 17,
        marginBottom: 3,
    },
    textHello: {
        color: 'black',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 3,
    },
    button: {
      backgroundColor: 'orange', 
      width: '60%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 10
    },
    buttonout: {
        backgroundColor: 'red', 
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10
      },
    buttonText: {
      color: 'white',
      fontWeight: 'bold', 
      fontSize: 16,
    },
  });