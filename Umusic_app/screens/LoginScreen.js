import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { auth } from '../firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';


const LoginScreen = (z) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscibe = auth.onAuthStateChanged(user => {
      if(user){
        navigation.replace('Home');
      }
    })

    return unsubscibe;
  }, [])

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registered with user:',user.email);
      })
      .catch(error => alert(error.message))
  }

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log('Logged In with user:', user.email)
      })
      .catch(error => alert(error.message));
  }

  return (
    
    <KeyboardAvoidingView style={styles.container}> 
  <Image
    source={require('../assets/auto-group-864w.png')}
    style={{ position: 'absolute', top: 0, left: 0, width: 310, height: 280 }}
  />
  <View style={styles.inputContainer}>
    <View style={styles.centeredContainer}>
      <Image
        source={require('../assets/logo.png')}
        style={{ left:85 ,width: 150, height: 180 }}
      /> 
    </View>
    <TextInput 
      placeholder='Email' 
      value={email}
      onChangeText={text => setEmail(text)}
      style={styles.input} 
    />
    <TextInput 
      placeholder='Password' 
      value={password}
      onChangeText={text => setPassword(text)}
      style={styles.input} 
      secureTextEntry
    />
  </View>
  <View style={styles.buttonContainer}>
    <TouchableOpacity 
      onPress={handleSignIn}
      style={[styles.button, { backgroundColor: 'orange' }]}
    >
      <Text style={styles.buttonText}>Log In</Text>
    </TouchableOpacity>
    <TouchableOpacity 
      style={[styles.button, styles.buttonOutline]}
      onPress={() => {navigation.navigate('Register')}}
    >
      <Text style={styles.buttonOutlineText}>Register</Text>
    </TouchableOpacity>
  </View>
  <View style={styles.imageContainer}>
  <Image
    source={require('../assets/auto-group-864w.png')}
    style={{ width: 310, height: 280 }}
  />
</View>
</KeyboardAvoidingView>

  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
    marginTop : 200,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 30, // Modify this value to adjust the vertical position of the image
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
    alignItems: 'center'
  },
  buttonOutline: {
    marginTop: 5,
    backgroundColor: 'white',
    borderColor: 'orange',
    borderWidth: 1,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: 'orange',
    fontWeight: '700',
    fontSize: 16,
  },
})

const b_styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#ffffff',
  },
  columnContainer: {
    alignItems: 'center',
  },
  stackContainer: {
    position: 'relative',
  },
  circle: {
    width: 270,
    height: 270,
    borderRadius: 135,
    backgroundColor: 'rgba(238, 195, 149, 0.5)',
  },
  welcomeText: {
    width: 341,
    height: 39,
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 39,
    color: '#eec395',
  },
  imageContainer: {
    position: 'absolute',
  },
  image: {
    borderRadius: 10,
    resizeMode: 'cover',
  },
  buttonContainer: {
    width: '100%',
    height: 44,
    borderWidth: 1,
    borderColor: '#eec395',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 44,
    color: '#eec395',
  },
});
