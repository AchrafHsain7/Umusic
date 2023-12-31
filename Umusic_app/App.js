import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProductScreen, LoginScreen, HomeScreen, RegisterScreen, MyProductsScreen, ProfileScreen, EditProfileScreen } from './screens';


const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
         <Stack.Screen name='Login' options={{headerShown:false}} component={LoginScreen} />
         <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
         <Stack.Screen name='ProductPage' component={ProductScreen} options={{headerShown: true}} />
         <Stack.Screen name='Register' component={RegisterScreen} options={{headerShown: true}} />
         <Stack.Screen name='MyProducts' component={MyProductsScreen} options={{headerShown: true}} />
         <Stack.Screen name='MyProfile' component={ProfileScreen} options={{headerShown: true}}  />
         <Stack.Screen name='EditProfile' component={EditProfileScreen} options={{headerShown: true}}  />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
