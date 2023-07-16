import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'

const SearchOption = ({ searchOption, setSearchOption}) => {

    //hard coding go brrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr

    if (searchOption === 'piano'){
        return (
            <ScrollView horizontal style={styles.optionsContainer} showsHorizontalScrollIndicator={false}>
                <TouchableOpacity style={styles.optionButtonSelected} onPress={() => setSearchOption('piano')}>
                    <Text>Piano</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButtons} onPress={() => setSearchOption('string')}>
                    <Text>String</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButtons} onPress={() => setSearchOption('brass')}>
                    <Text>Brass</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButtons} onPress={() => setSearchOption('percussion')}>
                    <Text>Percussion</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButtons} onPress={() => setSearchOption('')}>
                    <Text>All Items</Text>
                </TouchableOpacity>
              </ScrollView>
          )
    } else if (searchOption === 'guitar'){
        return (
            <ScrollView horizontal style={styles.optionsContainer} showsHorizontalScrollIndicator={false}>
                <TouchableOpacity style={styles.optionButtons} onPress={() => setSearchOption('piano')}>
                    <Text>Piano</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButtonSelected} onPress={() => setSearchOption('string')}>
                    <Text>String</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButtons} onPress={() => setSearchOption('brass')}>
                    <Text>Brass</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButtons} onPress={() => setSearchOption('percussion')}>
                    <Text>Percussion</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButtons} onPress={() => setSearchOption('')}>
                    <Text>All Items</Text>
                </TouchableOpacity>
              </ScrollView>
          )
    } else if (searchOption === 'trumpet'){
        return (
            <ScrollView horizontal style={styles.optionsContainer} showsHorizontalScrollIndicator={false}>
                <TouchableOpacity style={styles.optionButtons} onPress={() => setSearchOption('piano')}>
                    <Text>Piano</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButtons} onPress={() => setSearchOption('string')}>
                    <Text>String</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButtonSelected} onPress={() => setSearchOption('brass')}>
                    <Text>Brass</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButtons} onPress={() => setSearchOption('percussion')}>
                    <Text>Percussion</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButtons} onPress={() => setSearchOption('')}>
                    <Text>All Items</Text>
                </TouchableOpacity>
              </ScrollView>
          )
    } else {
        return (
            <ScrollView horizontal style={styles.optionsContainer} showsHorizontalScrollIndicator={false}>
                <TouchableOpacity style={styles.optionButtons} onPress={() => setSearchOption('piano')}>
                    <Text style = {styles.whitetext}>Piano</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButtons} onPress={() => setSearchOption('string')}>
                    <Text style = {styles.whitetext}>String</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButtons} onPress={() => setSearchOption('brass')}>
                    <Text style = {styles.whitetext}>Brass</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButtons} onPress={() => setSearchOption('percussion')}>
                    <Text>Percussion</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButtons} onPress={() => setSearchOption('')}>
                    <Text style = {styles.whitetext}>All Items</Text>
                </TouchableOpacity>
              </ScrollView>
          )
    }
}

export default SearchOption

const styles = StyleSheet.create({
    optionsContainer: {
        flexDirection: 'row',
        height: 150,
        marginTop: 20,
        marginBottom: -60
    }, 
    optionButtons: {
        margin: 5,
        padding: 10,
        width: 100, 
        height: 60,
        borderRadius: 10, 
        borderWidth: 1,
        borderColor:"orange",
        backgroundColor: "orange",
        justifyContent: "center",
        alignItems:"center",
    },
    optionButtonSelected: {
        margin: 5,
        padding: 10,
        width: 100, 
        height: 60,
        borderRadius: 10, 
        borderWidth: 1,
        backgroundColor: 'orange',
        justifyContent: "center",
        alignItems:"center",
        
    },
    whitetext:{
        color: "white",
        textAlign: "center",
        fontSize: 15,
        fontWeight:"bold"
    }

})