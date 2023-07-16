import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const BuyingArea = ({ quantity, setQuantity, data, buyProduct,  }) => {

    const navigation = useNavigation();

    if(data.quantity > 0){
        return (
            <>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => {
                buyProduct();
                navigation.navigate('MyProducts')
                }}
            >
                <Text>Buy</Text>
            </TouchableOpacity>
            <View>
                <TouchableOpacity onPress={() => {
                  if(quantity < data.quantity){
                      setQuantity(quantity+1)
                  }
                  }}
                  style={styles.button}
                  >
                    <Text>+</Text>
                  </TouchableOpacity>
                <Text style={{textAlign:'center', margin:10}}>{quantity}</Text>
                <TouchableOpacity 
                onPress={() => {
                  if(quantity >= 1){
                    setQuantity(quantity-1)
                    }
                  }}
                  style={styles.button}
                  
                  >
                  <Text>-</Text>
                  </TouchableOpacity>
              </View>
            </>
           
          )
    } else {
        return(
            <View style={styles.outStock}>
                <Text>This Product Is out of Stock!</Text>
            </View>
        )
    }
 
}

export default BuyingArea

const styles = StyleSheet.create({
    button: {
        padding: 15,
        width: '60%',
        backgroundColor: 'green',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 5,
    },
    outStock: {
        backgroundColor: 'red',
        margin: 10,
        padding: 15
    },
})