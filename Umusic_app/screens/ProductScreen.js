import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { getDatabase, onValue, ref } from 'firebase/database'
import { TouchableOpacity } from 'react-native'

const ProductScreen = () => {

    const [data, setData] = useState({});

    const route = useRoute()
    const { id } = route.params;
    const db = getDatabase();
    const getProduct = () => {
        const product = ref(db, `product/${id}/`);
        onValue(product, (snapshot) => {
            const product_data = snapshot.val();
            setData(product_data); 
            console.log(data);
        })
    }

    useEffect(() => {
        getProduct();
    }, [])

  return (
    <View style={styles.container}>
      <Text>{data.name}</Text>
      <Image source={{uri: data.image}} style={styles.image} resizeMode='contain'/>
      <Text>Description: {data.description}</Text>
      <Text>Brand: {data.brand}</Text>
      <Text>Price: {data.price}</Text>
      <Text>Available Quantity: {data.quantity}</Text>

      <TouchableOpacity style={styles.button}>
        <Text>Buy</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ProductScreen

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    image: {
        width: '90%',
        height: '50%'
    },
    button: {
        padding: 15,
        width: '60%',
        backgroundColor: 'green',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 40,
    }

})