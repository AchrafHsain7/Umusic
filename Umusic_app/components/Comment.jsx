import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth'
import { getDatabase, onValue, ref } from 'firebase/database'

const Comment = ({ item }) => {


    const auth = getAuth()
    const db = getDatabase()

    const [username, setUserName] = useState('');

    const getUser = () => {
        const users = ref(db, `user/${item.userID}/`)
        onValue(users, (snapshot) => {
            const data = snapshot.val();
            setUserName(data?.username);
        })
    }


    useEffect(() => {
        getUser();
    }, [])


  return (
    <View style={styles.container}>
        <Text>User: {username} </Text>
      <Text>{item.text}</Text>
      <Text>{item.date}</Text> 
    </View>
  )
}

export default Comment

const styles = StyleSheet.create({
container: {
    padding: 10,
    margin: 10,
    borderWidth: 1
}

})