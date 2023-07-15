import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getDatabase, onValue, ref } from 'firebase/database'
import { getAuth } from 'firebase/auth'
import { ProductPost, ProductTransaction } from '../components'

const MyProductsScreen = () => {

    const db = getDatabase()
    const auth = getAuth()
    const [transactionData, setTransactionData] = useState([])
    const [productsData, setProductsData] = useState([]);

    const getMyTransactions = () => {
        const products = ref(db, `transaction/${auth.currentUser.uid}/`);
        onValue(products, (snapshot) => {
            const data_p = snapshot.val();
            setTransactionData(data_p);
            //console.log(data_p); 
        })
    }

    const getMyProducts = () => {
        const products = []
        transactionData.forEach((item) => {
            console.log('Item:', item)
            const product = ref(db, `product/${item.product_id}/`);
            onValue(product, (snapshot) => {
                const data = snapshot.val();
                products.push(data)
            })
        })
        setProductsData(products);
        console.log('Data: ', productsData)
        }
    


    useEffect(() => {
        getMyTransactions();
        getMyProducts();
    }, [2])


  return (
    <View style={styles.container} >
      <Text style={{marginTop: 50}}>MyProductsScreen</Text>
      <FlatList
        data={transactionData}
        style={styles.postList}
        renderItem={({ item }) => {
            if(item === undefined){
                return null;
            }
            if(productsData === undefined){
                return null;
            }
            let productToSend = {}
            productsData.forEach((product) => {
                if(product.id === item.product_id){
                    productToSend = product;
                    console.log('----------------------match-----------');
                }
            })
            return(
                <ProductTransaction  item={item} productsData={productToSend} />
            )
        }}
        
        contentContainerStyle={{columnGap: 10}}
        showsVerticalScrollIndicator={false}
        />
    </View>
  )
}

export default MyProductsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    postList: {
        marginTop: 50
    },

})