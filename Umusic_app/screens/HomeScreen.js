import { FlatList, Image, ScrollView, StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { getAuth, signOut } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
import { getDatabase, ref, onValue } from 'firebase/database';
import { ProductPost } from '../components';


const HomeScreen = () => {

    const auth = getAuth()
    const db = getDatabase()
    const navigation = useNavigation()

    const [dataPost, setdataPost] = useState([]);
    const [userData, setUserData] = useState();
    const [searchOption, setSearchOption] = useState('');



    const getKeyFromUID = async () => {
        const snapshot = await db
          .ref('user')
          .orderByChild('uid')
          .equalTo(auth.currentUser.uid) 
          
      
        const userObject = snapshot.val();
        const key = Object.keys(userObject)[0]; // Assuming there is only one matching user
      
        return key;
      };


    const getProductData = () => {
        const products = ref(db, 'product/');
        onValue(products, (snapshot) => {
        const data = snapshot.val();
        if(searchOption === ''){
            setdataPost(data);
        } else {
            const searchData = []
            data.forEach((item) => {
                if(item.type === searchOption){
                    searchData.push(item)
                }
            })
            setdataPost(searchData);
        }
        console.log(dataPost);
        })}

    const getUserData = () => {
        const user = ref(db, `user/${auth.currentUser.uid}/`)
        onValue(user, (snapshot) => {
            const data = snapshot.val();
            setUserData(data);
            console.log(data);
        })
        
    }

    const handleSignOut = () => {
        signOut(auth)
        .then(() => {
            navigation.replace('Login');
        })
        .catch(error => alert(error.message))
    }


useEffect(()=>{
    getProductData();
    getUserData();
}, [])

useEffect(() => {
    getProductData();
    console.log(searchOption)
}, [searchOption])
   


  return (
    <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.profileContainer} onPress={() => navigation.navigate('MyProfile')}>
            <Image source={{uri: userData?.image}} style={styles.profileImage} ></Image>
            <View style={styles.profileTextContainer}>
                <Text style={styles.profileText}>{userData?.username}</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.button}
        onPress={handleSignOut}
      >
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>

      <ScrollView horizontal style={styles.optionsContainer} showsHorizontalScrollIndicator={false}>
        <TouchableOpacity style={styles.optionButtons} onPress={() => setSearchOption('piano')}>
            <Text>Piano</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButtons} onPress={() => setSearchOption('guitar')}>
            <Text>Guitar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButtons} onPress={() => setSearchOption('trumpet')}>
            <Text>Trumpet</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButtons} onPress={() => setSearchOption('')}>
            <Text>All Items</Text>
        </TouchableOpacity>
      </ScrollView>


        <FlatList
            data={dataPost}
            renderItem={({ item }) => {
                if(item === undefined){
                    return null;
                }
                return(
                    <ProductPost  item={item} />
                )  
            }}
            
            contentContainerStyle={{columnGap: 10}}
            showsVerticalScrollIndicator={false}
            style={styles.postList}
        />

      <TouchableOpacity
        style={styles.button}
        onPress={getProductData}
      >
        <Text style={styles.buttonText}>Refresh</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {navigation.navigate('MyProducts')}} 
      >
        <Text style={styles.buttonText}>My Products</Text>
      </TouchableOpacity>
    </SafeAreaView> 
  )
}

export default HomeScreen

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#0782F9',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    postList: {
        marginTop: 50
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 10,
        alignContent: 'flex-start'
    },
    profileTextContainer: {
        fontSize: 16,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    profileContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center', 
    }, 
    profileText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    optionsContainer: {
        flexDirection: 'row',
        height: 150,
        marginBottom: 10
    }, 
    optionButtons: {
        margin: 5,
        padding: 10,
        width: 100, 
        height: 60,
        borderRadius: 10, 
        borderWidth: 1
    }
})