import { Image, StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { getDatabase, onValue, ref, update } from 'firebase/database'
import { TouchableOpacity } from 'react-native'
import { auth } from '../firebase'
import { getAuth } from 'firebase/auth'
import { ScrollView } from 'react-native'
import { TextInput } from 'react-native'
import { FlatList } from 'react-native'
import { Comment, BuyingArea } from '../components'

const ProductScreen = () => {

    const [data, setData] = useState({});
    const [Id, setId] = useState(1);
    const [quantity, setQuantity] = useState(0);
    const [comment, setComment] = useState('');
    const [commentData, setCommentData] = useState([]) 

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

    const getComments = () => {
      const comments = ref(db, `product/${id}/comments/`);
      onValue(comments, (snapshot) => {
        const comment_data = snapshot.val();
        try{
          setCommentData(Object.values(comment_data));
        } catch {
          return
        }
        
        console.log('commentDataNow: ', commentData) 
      })
    }  

    const getID = () =>{
      const transactions = ref(db, `transaction/${auth.currentUser.uid}/`)
      onValue(transactions, (snapshot) => {
        const data = snapshot.val();
        //console.log('Here',data)
        if (data === null){
          return
        }
        setId(data.length);
      })
    }



    const buyProduct = () => {
      const transaction = {
        date: new Date().toJSON().slice(0, 10),
        price: data.price * quantity,
        product_id: data.id,
        quantity: quantity
      }


      const updates = {};
      const ID = getID();
      //console.log('ID', ID);
      if (data.quantity - quantity >=0){
        updates[`transaction/${auth.currentUser.uid}/${Id}/`] = transaction
        updates[`product/${id}/quantity`] = data.quantity - quantity;
      }

      setQuantity(0)

      return update(ref(db), updates)
    }



    const addComment = () => {
        const commentData = {
          text: comment,
          date: new Date().toJSON().slice(0, 10),
          userID: auth.currentUser.uid,
          product_id: data.id,
        }

        const updates = {}; 
        if(comment != ''){
          updates[`product/${data.id}/comments/${auth.currentUser.uid}/`] = commentData;
          update(ref(db), updates); 
        }
    }


    useEffect(() => {
        getProduct();
        getID();
        getComments();
    }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Text>{data.name}</Text>
      <Image source={{uri: data.image}} style={styles.image} resizeMode='contain'/>
      <Text>Description: {data.description}</Text>
      <Text>Brand: {data.brand}</Text>
      <Text>Price: {data.price}</Text>
      <Text>Available Quantity: {data.quantity}</Text>


    <ScrollView style={styles.scrollArea}>
      <View style={styles.scrollAreaContent}>

    
      <BuyingArea quantity={quantity} setQuantity={setQuantity} data={data} buyProduct={buyProduct} /> 
      
        <Text>Comments: </Text>
        <TextInput placeholder='Comment:' style={styles.commentInput}
          value={comment}
          onChangeText={(text)=>setComment(text)}
        />
        <TouchableOpacity style={styles.button} onPress={addComment}>
          <Text>Submit</Text>
        </TouchableOpacity>
        </View>
        
    </ScrollView>
        <FlatList
        data={commentData} 
        renderItem={({ item }) => {
          return(
            <Comment item={item}  /> 
          )
        }}
        contentContainerStyle={{columnGap: 10}}
        showsVerticalScrollIndicator={false}
        style={styles.commentList}
        />
    </SafeAreaView>
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
        marginTop: 5,
    },
    commentInput: {
      backgroundColor: 'white',
      borderWidth: 1,
      padding: 15,
      width: '60%'
    },
    scrollArea: {
      width: '100%',
      padding: 10
    },
    scrollAreaContent: {
      justifyContent: 'center', 
      alignItems: 'center'
    },
   

})