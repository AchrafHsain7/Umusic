import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { getDatabase, ref, onValue } from 'firebase/database'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const ProductPost = ({ item }) => {

  const db = getDatabase();
  const navigation = useNavigation()

  const handlePress = ( id ) => {
    navigation.navigate('ProductPage', { id } )
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => handlePress(item.id)}>
        <Text style={styles.text}>{item.name}</Text>
        <Text style={styles.text}>{item.description}</Text>
        <Text style={styles.text}>{item.price}</Text>
        <Text style={styles.text}>{item.brand}</Text>
        <Image source={{uri: item.image}} style={styles.postImage} resizeMode='contain'></Image>
      </TouchableOpacity>
    </View>
  )
}

export default ProductPost

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'black'
  }, 
  postImage: {
    width: 200,
    height: 200,
    borderRadius: 10
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    width: '100%'
  }
})