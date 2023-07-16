import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, child, update, push } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function RegisterScreen() {
  const auth = getAuth();
  const db = getDatabase();
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');

  const handleSignIn = () => {};

  const register = () => {
    if (password === confPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          console.log('Registered with user:', user.email);

          const userData = {
            uid: user.uid,
            username: username,
            fname: fname,
            lname: lname,
            image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
          };

          const newUserKey = auth.currentUser.uid;

          const updates = {};

          updates['user/' + newUserKey] = userData;

          return update(ref(db), updates);
        })
        .catch((error) => alert(error.message));
    } else {
      alert('Wrong Confirmation Password');
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace('Home');
      }
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/auto-group-864w.png')} style={{ position: 'absolute', top: 0, left: 0, width: 240, height: 220 }} />
      <View style={styles.inputContainer}>
        <Text style={styles.text}>Register Now !!!</Text>
        <TextInput placeholder="Username" style={styles.input} value={username} onChangeText={(text) => setUsername(text)} />
        <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={(text) => setEmail(text)} />
        <TextInput placeholder="First Name" style={styles.input} value={fname} onChangeText={(text) => setFname(text)} />
        <TextInput placeholder="Last Name" style={styles.input} value={lname} onChangeText={(text) => setLname(text)} />
        <TextInput placeholder="Password" style={styles.input} secureTextEntry value={password} onChangeText={(text) => setPassword(text)} />
        <TextInput placeholder="Confirm Password" style={styles.input} secureTextEntry value={confPassword} onChangeText={(text) => setConfPassword(text)} />
      </View>
      
        <View style={styles.bottomRightContainer}>
            <Image source={require('../assets/auto-group-864w.png')} style={[styles.bottomRightImage, { right: 0, width: 240, height: 220 }]} />
        </View>
        <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: 'orange' }]} onPress={register}>
            <Icon name="person-add-outline" size={30} color="black" />
          <Text style={styles.iconText}>Register</Text>
        </TouchableOpacity>
      </View>
      </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  inputContainer: {
    width: '80%',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'darkorange',
    textAlign: 'center',
    marginTop: 20,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 10,
    borderRadius: 10,
  },
  buttonContainer: {
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  bottomRightContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  bottomRightImage: {
    width: 240,
    height: 100,
  },
  stackContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  iconContainer: {
    alignItems: 'center',
  },
  iconText: {
    marginTop: 5,
    fontSize: 12,
  },
});
