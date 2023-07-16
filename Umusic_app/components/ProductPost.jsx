import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { getDatabase, ref, onValue } from 'firebase/database'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Dimensions } from 'react-native'

const ProductPost = ({ item }) => {
  const db = getDatabase();
  const navigation = useNavigation()

  const handlePress = (id) => {
    navigation.navigate('ProductPage', { id })
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => handlePress(item.id)}>
        <Text style={styles.text}>{item.name}</Text>
        <Image source={{ uri: item.image }} style={styles.postImage} resizeMode='cover' />
          <Text style={styles.textDescription}>{item.description}</Text>
          <Text style={styles.textPrice}>{item.price} DH</Text>
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
    color: 'black',
    textAlign: 'center',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Arial',
  },
  textDescription: {
    color: 'black',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Arial',
  },
  textPrice: {
    color: 'black',
    textAlign: 'center',
    fontSize: 17,
    fontFamily: 'Arial',
  },
  postImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    width: Dimensions.get("window").width - 80,
    borderColor: 'grey',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 5, height: 13 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 4,
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
})
