import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getDatabase, onValue, ref } from 'firebase/database'
import { getAuth } from 'firebase/auth'
import { ProductPost, ProductTransaction } from '../components'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const MyProductsScreen = () => {

    const db = getDatabase()
    const auth = getAuth()
    const navigation = useNavigation()
    const [transactionData, setTransactionData] = useState([])
    const [productsData, setProductsData] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0)

    const getMyTransactions = async () => {
        const products = ref(db, `transaction/${auth.currentUser.uid}/`);
        onValue(products, (snapshot) => {
            const data_p = snapshot.val();
            setTransactionData(data_p);
            //console.log(data_p); 
        })
    }

    const getMyProducts = async () => {
        const products = []
        if(transactionData === null){
            return null;
        }
        transactionData.forEach((item) => {
            console.log('Item:', item)
            const product = ref(db, `product/${item.product_id}/`);
            onValue(product, (snapshot) => {
                const data = snapshot.val();
                products.push(data)
            })
        })
        setProductsData(products);
        calculateTotalPrice();
        console.log('Data: ', productsData)
        }

    const calculateTotalPrice = () => {
        let total = 0
        transactionData.forEach((item) => {
            total += item.price
        })
        setTotalPrice(total)
    }


    const buyProduct = () => {
    }
    


    useEffect(() => {
        const fetchData = async () => {
            await getMyTransactions();
            await getMyProducts()
            .then(() => {calculateTotalPrice()});
        }
        fetchData();
    }, [])  




  return (
    <SafeAreaView style={styles.container} >
      <Text style={{marginTop: 50}}>MyProductsScreen</Text>
      <FlatList
        data={transactionData}
        style={styles.postList}
        renderItem={({ item }) => {
            if(item === undefined){
                return null;
            }
            let productToSend = {}
            try{
                productsData.forEach((product) => {
                    if(product.id === item.product_id){
                        productToSend = product;
                        //console.log('----------------------match-----------'); 
                    }
                })
                return(
                    <ProductTransaction  item={item} productsData={productToSend} />
                )
            } catch(error) {
                return <Text>Sorry, you didnt buy any products yet!</Text>
            }
            
        }}
        
        contentContainerStyle={{columnGap: 10}}
        showsVerticalScrollIndicator={false}
        />
        <TouchableOpacity 
            style={styles.button}
            onPress={() => {
                calculateTotalPrice()
            }}
            >
            <Text>Generate Total Price</Text> 
        </TouchableOpacity>
        <Text>Total Price: {totalPrice} DH</Text>
        
    </SafeAreaView>
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
        marginTop: 50,
        flex: 0.5,
        marginBottom: 20
    },
    button : {
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
        width: "60%",
        backgroundColor: 'red'
    }

})