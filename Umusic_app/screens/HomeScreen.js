import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from 'react-native';
import { TouchableOpacity } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, onValue } from 'firebase/database';
import { ProductPost, SearchOption } from '../components';

const HomeScreen = () => {
  const auth = getAuth();
  const db = getDatabase();
  const navigation = useNavigation();

  const [dataPost, setdataPost] = useState([]);
  const [userData, setUserData] = useState();
  const [searchOption, setSearchOption] = useState('');

  const getKeyFromUID = async () => {
    const snapshot = await db.ref('user').orderByChild('uid').equalTo(auth.currentUser.uid);

    const userObject = snapshot.val();
    const key = Object.keys(userObject)[0]; // Assuming there is only one matching user

    return key;
  };

  const getProductData = () => {
    const products = ref(db, 'product/');
    onValue(products, (snapshot) => {
      const data = snapshot.val();
      if (searchOption === '') {
        setdataPost(data);
      } else {
        const searchData = [];
        data.forEach((item) => {
          if (item.type === searchOption) {
            searchData.push(item);
          }
        });
        setdataPost(searchData);
      }
      console.log(dataPost);
    });
  };

  const getUserData = () => {
    const user = ref(db, `user/${auth.currentUser.uid}/`);
    onValue(user, (snapshot) => {
      const data = snapshot.val();
      setUserData(data);
      console.log(data);
    });
  };

  useEffect(() => {
    getProductData();
    getUserData();
  }, []);

  useEffect(() => {
    getProductData();
    console.log(searchOption);
  }, [searchOption]);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../assets/auto-group-864w.png')}
        style={styles.backgroundImageTopLeft}
      />
      <Image
        source={require('../assets/auto-group-864w.png')}
        style={styles.backgroundImageBottomRight}
      />
      <View style = {{
        flexDirection: "row",
        gap: 10,


      }}>
          <SearchOption searchOption={searchOption} setSearchOption={setSearchOption}/>
          <TouchableOpacity
            style={styles.profileContainer}
            onPress={() => navigation.navigate('MyProfile')}
          >
            <View>
              <Image source={{ uri: userData?.image }} style={styles.profileImage} />
              <View style={styles.profileTextContainer}>
              </View>
            </View>
          </TouchableOpacity>
      </View>

      <FlatList
        data={dataPost}
        renderItem={({ item }) => {
          if (item === undefined) {
            return null;
          }
          return <ProductPost item={item} />;
        }}
        contentContainerStyle={{ columnGap: 10 }}
        showsVerticalScrollIndicator={false}
        style={styles.postList}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: 'orange' }]}
        onPress={getProductData}
      >
        <Text style={styles.buttonText}>Refresh</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImageTopLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 50,
    width: '100%',
    height: '50%',
  },
  backgroundImageBottomRight: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '100%',
    height: '50%',
  },
  button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  postList: {
    marginTop: 0,
  },
  profileBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'orange',
    backgroundColor : 'orange',
    padding: 10,
    borderRadius: 10,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    right : 4,
    alignContent: 'flex-start',
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
    fontWeight: 'bold',
  },
  optionsContainer: {
    flexDirection: 'row',
    height: 150,
    marginBottom: 10,
  },
  optionButtons: {
    margin: 5,
    padding: 10,
    width: 100,
    height: 60,
    borderRadius: 10,
    borderWidth: 1,
  },
});
