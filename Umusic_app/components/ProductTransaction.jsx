import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Image } from 'react-native'

const ProductTransaction = ({ item, productsData }) => {

    const [image, setImage] = useState('');

    useEffect(() => {
        console.log('Item', item);
        console.log('Products', productsData);
    }, [productsData])
     

  return (
    <View>
      <Image source={{uri: productsData.image }} style={{width: 100, height: 100}} />
      <Text>{item.date}</Text>
      <Text>{item.quantity}</Text>
      <Text>{item.price}</Text>
    </View>
  )
}

export default ProductTransaction

const styles = StyleSheet.create({})