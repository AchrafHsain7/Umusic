import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Image } from 'react-native'
import { getDatabase, onValue, ref } from 'firebase/database'
import { getAuth } from 'firebase/auth'

const ProductTransaction = ({ item, productsData }) => {


    const db = getDatabase();
    const auth = getAuth();
    const [image, setImage] = useState('');

    useEffect(() => {
        const tran_image = ref(db, `product/${item.product_id}/`)
        onValue(tran_image, (snapshot) => {
            const data = snapshot.val();
            setImage(data.image);
        })
        console.log('Item', item);
        console.log('Products', productsData);
    }, [])
     

  return (
    <View style={styles.transactionContainer}>
      <Image source={{uri: image }} style={styles.image} resizeMode='contain' />
      <View>
        <Text>Transaction Details</Text>
        <Text>Date: {item.date}</Text>
        <Text>Quantity: {item.quantity}</Text>
        <Text>Price: {item.price}</Text>
      </View>
    </View>
  )
}

export default ProductTransaction

const styles = StyleSheet.create({

    transactionContainer: {
        borderWidth: 1,
        padding: 10,
        width: 300,
        height: 180,
        borderRadius: 10,
        flexDirection: 'row',
        margin: 10
    },
    image : {
        width: 160,
        height: 160,
        marginRight: 5,
        borderRadius: 10
    }
})