import React from "react";
import { Text, View, SafeAreaView, TouchableOpacity, FlatList, TextInput, ScrollView } from 'react-native'
import { Stack, useRouter } from "expo-router";


const App = () => {
    const router = useRouter()
    return (
        <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
             <Stack.Screen
                options={{
                    headerStyle: {backgroundColor: 'green'},
                    headerShadowVisible: false,
                    headerTitle: "U Music",
                    headerTitleStyle: { AlignItems:'center', justifyContent: 'center'},
                    headerLeft: () => {
                        return(
                            <TouchableOpacity onPress={() => {
                                //drop down a menu navbar
                            }}>
                                <Text>Menu</Text>
                            </TouchableOpacity>
                        ) 
                    },
                    headerRight: () => {
                        return(
                            <TextInput style={{backgroundColor: 'white', width:200}}>
                            </TextInput>
                        )
                    }
                }}
            />
            <View style={{borderColor:'black', borderWidth:2, height:'100%'}}>
                <Text>Hello Mom!</Text>
                <View style={{height:"70%", borderColor:'red', height:'80%', borderWidth:1}}>
                    <ScrollView>

                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default App;

