import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { getAuth, signOut } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
import { getDatabase, ref, onValue } from 'firebase/database';
import { ProductPost } from '../components';

const HomeScreen = () => {

    const auth = getAuth()
    const db = getDatabase()
    const navigation = useNavigation()

    const [dataPost, setdataPost] = useState([]);


    const getData = () => {
        const products = ref(db, 'product/');
        onValue(products, (snapshot) => {
        const data = snapshot.val();
        setdataPost(data);
        console.log(dataPost);
        })}

    const handleSignOut = () => {
        signOut(auth)
        .then(() => {
            navigation.replace('Login');
        })
        .catch(error => alert(error.message))
    }


useEffect(()=>{
    getData();
}, [])
   


  return (
    <View style={styles.container}>

        <FlatList
            data={dataPost}
            renderItem={({ item }) => {
                if(item === undefined){
                    return null;
                }
                return(
                    <ProductPost  item={item} />
                )
            }}
            
            contentContainerStyle={{columnGap: 10}}
            showsVerticalScrollIndicator={false}
            style={styles.postList}
        />


      <Text>Email: {auth.currentUser?.email}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={getData}
      >
        <Text style={styles.buttonText}>Refresh</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSignOut}
      >
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View> 
  )
}

export default HomeScreen

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#0782F9',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    postList: {
        marginTop: 100
    }
})