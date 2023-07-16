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
          )
    } else if (searchOption === 'guitar'){
        return (
            <ScrollView horizontal style={styles.optionsContainer} showsHorizontalScrollIndicator={false}>
                <TouchableOpacity style={styles.optionButtons} onPress={() => setSearchOption('piano')}>
                    <Text>Piano</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButtonSelected} onPress={() => setSearchOption('guitar')}>
                    <Text>Guitar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButtons} onPress={() => setSearchOption('trumpet')}>
                    <Text>Trumpet</Text>
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
                <TouchableOpacity style={styles.optionButtons} onPress={() => setSearchOption('guitar')}>
                    <Text>Guitar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButtonSelected} onPress={() => setSearchOption('trumpet')}>
                    <Text>Trumpet</Text>
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
                    <Text>Piano</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButtons} onPress={() => setSearchOption('guitar')}>
                    <Text>Guitar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButtons} onPress={() => setSearchOption('trumpet')}>
                    <Text>Trumpet</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButtonSelected} onPress={() => setSearchOption('')}>
                    <Text>All Items</Text>
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
        marginBottom: 10
    }, 
    optionButtons: {
        margin: 5,
        padding: 10,
        width: 100, 
        height: 60,
        borderRadius: 10, 
        borderWidth: 1
    },
    optionButtonSelected: {
        margin: 5,
        padding: 10,
        width: 100, 
        height: 60,
        borderRadius: 10, 
        borderWidth: 1,
        backgroundColor: 'pink'
    }

})