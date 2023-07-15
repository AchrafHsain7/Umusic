import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { getDatabase, onValue, ref, update } from 'firebase/database'
import { TouchableOpacity } from 'react-native'
import { auth } from '../firebase'
import { getAuth } from 'firebase/auth'

const ProductScreen = () => {

    const [data, setData] = useState({});
    const [Id, setId] = useState(1);

    const route = useRoute()
    const { id } = route.params;
    const db = getDatabase();
    const auth = getAuth();
    const navigation = useNavigation();

    const getProduct = () => {
        const product = ref(db, `product/${id}/`);
        onValue(product, (snapshot) => {
            const product_data = snapshot.val();
            setData(product_data); 
            //console.log(data);
        })
    }

    const getID = () =>{
      const transactions = ref(db, `transaction/${auth.currentUser.uid}/`)
      onValue(transactions, (snapshot) => {
        const data = snapshot.val();
        console.log('Here',data)
        if (data === null){
          return
        }
        setId(data.length);
      })
    }

    const buyProduct = () => {
      const transaction = {
        date: new Date().toJSON().slice(0, 10),
        price: data.price,
        product_id: data.id,
        quantity: 1 
      }

      const updates = {};
      const ID = getID();
      console.log('ID', ID);
      updates[`transaction/${auth.currentUser.uid}/${Id}/`] = transaction

      return update(ref(db), updates)
    }

    useEffect(() => {
        getProduct();
        getID();
    }, [])

  return (
    <View style={styles.container}>
      <Text>{data.name}</Text>
      <Image source={{uri: data.image}} style={styles.image} resizeMode='contain'/>
      <Text>Description: {data.description}</Text>
      <Text>Brand: {data.brand}</Text>
      <Text>Price: {data.price}</Text>
      <Text>Available Quantity: {data.quantity}</Text>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => {
          buyProduct();
          navigation.navigate('MyProducts')
        }}
      >
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